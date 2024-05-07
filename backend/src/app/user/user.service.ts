// apps/api/src/app/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '@backend/app/user/user.schema';
import { IUser } from '../../../../index';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async updateUser(userId: string, user: IUser): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(userId, user);
  }

  async findUserProfile(userId: string): Promise<IUser> {
    return await this.userModel.findById(userId, { password: 0 });
  }
}
