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
  HttpStatus
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
import { User } from 'src/common/decorator/user.decorator';
import { user_with_role_and_urls_with_id_as_bigInt } from 'src/types';

@Controller('user')
export class UserController {
  constructor(
    private user_service: UserService,
    private util_service: Util_Service,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() request_dto: User_Login_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.login(request_dto),
    )();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() request_dto: User_Register_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.register(request_dto),
    )();
  }

  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  @Post('/we_chat_login')
  async we_chat_login(request_dto: We_Chat_Login_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.we_chat_login(request_dto),
    )();
  }

  @UseGuards(Jwt_Auth_Gurad)
  @Patch('/edit_password')
  async edit_password(
    @Body() request_dto: Edit_Password_Request_DTO,
    @User() user: user_with_role_and_urls_with_id_as_bigInt,
  ) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.edit_password(
        request_dto,
        user,
      ),
    )();
  }

  @Patch('/forget_password')
  async forget_password(@Body() request_dto: Forget_Password_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.forget_password(request_dto),
    )();
  }

  // Email Verification
  @HttpCode(200)
  @Post('/email_verification')
  async email_verification(@Body() request_dto: Forget_Password_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.email_verification(request_dto),
    )();
  }

  // search user
  @UseInterceptors(Trasnform_BigInt_To_String)
  @HttpCode(200)
  @Post('/search_key')
  async search_key(@Body() request_dto: Search_User_Request_DTO) {
    return this.util_service.tryCatchWrapper(() =>
      this.user_service.search_user(request_dto),
    )();
  }

  @UseInterceptors(Trasnform_BigInt_To_String)
  @Get('/get_by_id')
  async get_by_id(@Query('id', Parse_BigInt_Pipe) id: bigint) {
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

  @Get('/check_token')
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
