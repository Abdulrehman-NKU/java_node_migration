import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  HttpCode,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User_Login_Request_DTO } from './dto/user_login_request.dto';
import { Util_Service } from 'src/util/util.service';
import { User_Register_Request_DTO } from './dto/user_register_request.dto';
import { Jwt_Auth_Gurad } from 'src/auth/jwt_auth.guard';
import { Edit_Password_Request_DTO } from './dto/edit_password_request.dto';
import { Request as RequestType } from 'express';
import { Property_To_String } from 'src/util/types';
import { users } from '@prisma/client';
import { Forget_Password_Request_DTO } from './dto/forget_password_request.dto';
import { We_Chat_Login_Request_DTO } from './dto/we_chat_login_request_dto';
import { Search_User_Request_DTO } from './dto/search_user_request.dto';
import { Parse_BigInt_Pipe } from 'src/common/custom_pipes/transform_to_big_int.pipe';
import { Trasnform_BigInt_To_String } from 'src/common/interceptors/transform_big_int_to_string.interceptor';

@Controller('Account')
export class UserController {
  constructor(
    private user_service: UserService,
    private util_service: Util_Service,
  ) {}

  @HttpCode(200)
  @Post('/Login')
  async Login(@Body() request_dto: User_Login_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.login(request_dto),
    )();
  }

  @HttpCode(201)
  @Post('/Register')
  async register(@Body() request_dto: User_Register_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.register(request_dto),
    )();
  }

  @Post('/wechatLogin')
  async wechatLogin(request_dto: We_Chat_Login_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.we_chat_login(request_dto),
    )();
  }

  @UseGuards(Jwt_Auth_Gurad)
  @Patch('/editPassword')
  async editPassword(
    @Body() request_dto: Edit_Password_Request_DTO,
    @Request() req: RequestType,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.edit_password(
        request_dto,
        req.user as Property_To_String<users, 'id'>,
      ),
    )();
  }

  @Patch('/ForgePassword')
  async ForgePassword(@Body() request_dto: Forget_Password_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.forget_password(request_dto),
    )();
  }

  // Email Verification
  @HttpCode(200)
  @Post('/emailRation')
  async emailRation(@Body() request_dto: Forget_Password_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.email_verification(request_dto),
    )();
  }

  // search user
  @UseInterceptors(Trasnform_BigInt_To_String)
  @HttpCode(200)
  @Post('/searchKey')
  async searchKey(@Body() request_dto: Search_User_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.search_user(request_dto),
    )();
  }

  @UseInterceptors(Trasnform_BigInt_To_String)
  @Get('/getById')
  async getById(@Query('id', Parse_BigInt_Pipe) id: bigint) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.get_user_by_id(id),
    )();
  }

  /**********************USELESS START**************************************** */

  // Modification: Below two are bad endpoints, no need
  @Get('/token')
  async token(@Query('token') token: string, @Request() request: RequestType) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.jwt_token_to_payload(token, request),
    )();
  }

  @Get('/checkToken')
  async checkToken(
    @Query('token') token: string,
    @Request() request: RequestType,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.jwt_token_to_payload(token, request),
    )();
  }

  /**********************USELESS END**************************************** */
}
