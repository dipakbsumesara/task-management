// apps/api/src/app/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sendApiResponse } from '@lib/utils/util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: { name: string; email: string; password: string }
  ) {
    return sendApiResponse(
      'registered successfully!',
      await this.authService.register(body)
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const loginResponse = await this.authService.login(
      body.email,
      body.password
    );
    if (!loginResponse) {
      return {
        message: 'User not found or password incorrect',
        statusCode: HttpStatus.UNAUTHORIZED,
      };
    }
    return sendApiResponse('logged in successfully', loginResponse);
  }
}
