import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { User_Login_Request_DTO } from './dto/user_login_request.dto';
import { Password_Service } from './password.service';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { User_Login_Response_DTO } from './dto/user_login_response.dto';
import { JwtService } from '@nestjs/jwt';
import { User_Register_Request_DTO } from './dto/user_register_request.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { jwt_constants } from 'src/Constants';
import { Edit_Password_Request_DTO } from './dto/edit_password_request.dto';
import { users } from '@prisma/client';
import { Property_To_String } from 'src/util/types';
import { Forget_Password_Request_DTO } from './dto/forget_password_request.dto';
import { Util_Service } from 'src/util/util.service';
import { UserRoleService } from 'src/user_role/user_role.service';
import { We_Chat_Login_Request_DTO } from './dto/we_chat_login_request_dto';
import { Search_User_Request_DTO } from './dto/search_user_request.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private prisma: Prisma_Service,
    private password_service: Password_Service,
    private jwt_service: JwtService,
    private util_service: Util_Service,
    private user_role_service: UserRoleService,
    @Inject(CACHE_MANAGER) private cache_mangager: Cache,
  ) {}

  // private Date_Format = 'yyyy-MM-dd HH:mm:ss.SSS'; // It is already this format so, no need to do it explicityly

  async login(user_login_request_dto: User_Login_Request_DTO) {
    // Keeping track of password error count using reddis
    // But skip this step or implement it differently
    /**
     *  
        String errKey = ERR_LOGIN_KEY + userLoginVo.getAccount();
        String errNums = redisTemplate.opsForValue().get(errKey);
        Integer errorCount = userLoginConfig.getPwdErrorCount() == null ? MAX_ERR_NUM
                : userLoginConfig.getPwdErrorCount();
        if (!StringUtils.isEmpty(errNums) && Integer.parseInt(errNums) >= errorCount) {
            // You have exceeded the number of incorrect password entries and your account
            // has been locked. Please contact the administrator!
            throw new BusinessException("您已超出密码输入错误次数，已锁定账户，请联系管理员!");
        }
     */
    const user = await this.prisma.users.findFirst({
      where: {
        account: user_login_request_dto.account, // account and email is same
      },
    });

    if (!user)
      throw new NotFoundException({
        message: 'User not found!',
      });
    else if (
      !this.password_service.checkPasswordCorrect(
        user_login_request_dto.password,
        user.password,
      )
    )
      throw new UnauthorizedException({ message: 'Incorrect password' });
    else if (user.status !== 1)
      throw new ForbiddenException({
        message: 'The account has been suspended or cancelled',
      });

    const user_login_response = new User_Login_Response_DTO();

    const user_roles = await this.user_role_service.find_user_roles_by_user_id(
      user.id,
    );

    if (user_roles.length > 0) {
      user_login_response.rids = user_roles.map((role) => role.id).join(',');

      const fun_apis =
        await this.user_role_service.find_roles_fun_api(user_roles);
      user_login_response.url = fun_apis.map((api) => api.url).join(',');
    }

    user_login_response.UserId = user.id.toString();
    user_login_response.account = user.account;
    user_login_response.userStatus = user.status;
    user_login_response.token = await this.jwt_service.signAsync(
      {
        ...user,
        id: user.id.toString(),
        rids: user_login_response.rids,
        urls: user_login_response.url,
      },
      {
        secret: jwt_constants.secret,
        expiresIn: '30h',
      },
    );

    return user_login_response;
  }

  async register(user_register_request_dto: User_Register_Request_DTO) {
    const cached_code = await this.cache_mangager.get(
      user_register_request_dto.account,
    );

    if (cached_code !== user_register_request_dto.code)
      throw new UnauthorizedException({ message: 'Code is not correct!' });

    const existing_user = await this.prisma.users.findFirst({
      where: {
        account: user_register_request_dto.account,
      },
    });

    if (existing_user)
      throw new ConflictException({
        message: 'The current account has been registered',
      });

    const user = await this.prisma.users.create({
      data: {
        account: user_register_request_dto.account,
        password: this.password_service.hashPassword(
          user_register_request_dto.password,
        ),
        ...(user_register_request_dto.account.includes('@')
          ? { email: user_register_request_dto.account }
          : {
              tel_num: user_register_request_dto.account,
            }),
        status: 1,
      },
    });

    return this.util_service.convertUserIdToString(user);
  }

  async edit_password(
    edit_password_request_dto: Edit_Password_Request_DTO,
    user: Property_To_String<users, 'id'>,
  ) {
    // Modification: Getting Current User From the request instead of the thread
    if (
      !this.password_service.checkPasswordCorrect(
        edit_password_request_dto.oldPassword,
        user.password,
      )
    )
      throw new ForbiddenException({
        message: 'The original password is wrong!',
      });

    const new_password_hash = this.password_service.hashPassword(
      edit_password_request_dto.newPassword,
    );

    if (new_password_hash === user.password)
      throw new BadRequestException({
        message: 'The new password cannot be the same as the original password',
      });

    const updated_user = await this.prisma.users.update({
      where: {
        id: BigInt(user.id),
      },
      data: {
        password: new_password_hash,
      },
    });

    return this.util_service.convertUserIdToString(updated_user);
  }

  async forget_password(
    forget_password_request_dto: Forget_Password_Request_DTO,
  ) {
    const user = await this.prisma.users.findFirst({
      where: {
        account: forget_password_request_dto.account,
      },
    });

    if (!user)
      throw new NotFoundException({ message: 'Account does not exist' });

    const new_password_hash = this.password_service.hashPassword(
      forget_password_request_dto.newPassword,
    );

    const updated_user = await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: new_password_hash,
      },
    });

    return this.util_service.convertUserIdToString(updated_user);
  }

  // Todo:
  async we_chat_login(we_chat_login_request_dto: We_Chat_Login_Request_DTO) {
    const { code, openId } = we_chat_login_request_dto;
    if (!code)
      throw new BadRequestException({ message: 'WeChat code is empty' });

    if (openId) return {}; // Todo: it is returning a user instance

    const access_token_map = /* Todo: getPcWXAccessToken(code) */ {
      errcode: undefined,
      errmsg: '',
      opeinid: 'openid_dummmy',
      access_token: 'access_token_dummy',
    };

    if (access_token_map.errcode)
      throw new UnauthorizedException({ message: access_token_map.errmsg });

    const { opeinid, access_token } = access_token_map;

    const wxUserMap = /*getPcWeiXinUserInfo(openId, accessToken) */ {
      errcode: undefined,
      errmsg: '',
      nickName: 'nickName_dummy',
      opeinid,
      access_token,
    };

    if (wxUserMap.errcode)
      throw new UnauthorizedException({ message: wxUserMap.errmsg });

    return {}; //Todo: It is returning a user instance
  }

  async email_verification(
    email_verification_dto: Forget_Password_Request_DTO,
  ) {
    if (!email_verification_dto.code)
      throw new BadRequestException({
        message: 'Verification code cannot be empty!',
      });

    const cached_code = await this.cache_mangager.get(
      email_verification_dto.account,
    );

    if (email_verification_dto.code !== cached_code)
      throw new UnauthorizedException({ message: 'Verification code error' });

    return {
      message: 'Verification passed',
    };
  }

  async search_user(search_user_request_dto: Search_User_Request_DTO) {
    const { account, email, telNum, nickName } = search_user_request_dto;

    // Todo:
    // Ask: This is kind of stupid we can just find in all the field
    // Instead of passing differnt field
    return this.prisma.users.findMany({
      where: {
        OR: [
          {
            email: {
              contains: email,
            },
          },
          {
            account: {
              contains: account,
            },
          },
          {
            nick_name: {
              contains: nickName,
            },
          },
          {
            tel_num: {
              contains: telNum,
            },
          },
        ],
      },
      select: {
        id: true,
        create_time: true,
        account: true,
        email: true,
        tel_num: true,
        true_name: true,
        nick_name: true,
        status: true,
      },
    });
  }

  async get_user_by_id(user_id: bigint) {
    return this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
    });
  }

  /**********************USELESS START**************************************** */

  // TODO:
  // Below two services are bad, no need

  async jwt_token_to_payload(token: string, request: Request) {
    if (!token) token = request.headers.Authorization as string;

    if (!token)
      throw new BadRequestException({
        message: 'User authentication token is required!',
      });

    token = token.split(' ')[1];

    const payload = await this.jwt_service.verifyAsync(token, {
      secret: jwt_constants.secret,
    });

    return payload;
  }

  async check_token(token: string, request: Request) {
    if (!token) token = request.headers.Authorization as string;

    if (!token)
      throw new BadRequestException({
        message: 'User authentication token is required!',
      });

    token = token.split(' ')[1];

    const payload = await this.jwt_service.verifyAsync(token, {
      secret: jwt_constants.secret,
    });

    if (payload) return 'Token is correct!';
    else
      throw new UnauthorizedException({
        message: 'The user token is incorrect ',
      });
  }

  /**********************USELESS END**************************************** */
}
