// apps/api/src/app/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { sendApiResponse } from '@lib/utils/util';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: any): Promise<any> {
    return sendApiResponse(
      'user updated successfully',
      this.userService.updateUser(id, user)
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return sendApiResponse('user profile fetched', await this.userService.findUserProfile(req.user.userId));
  }
}
