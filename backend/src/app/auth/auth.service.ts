// apps/api/src/app/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '@index';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      return null;
    }
    const payload = { username: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload);
    const { password: _, ...userInfo } = user.toObject(); // Remove password from the result
    return {
      userInfo,
      access_token,
    };
  }

  async register(
    createUserDto: any
  ): Promise<{ userInfo: any; access_token: string }> {
    // prevent duplicate user
    const existingUser =
      (await this.userModel.countDocuments({ email: createUserDto.email })) > 0;

    if (existingUser) {
      throw new ConflictException('user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password, ...userInfo } = savedUser.toObject(); // Exclude the password from the result

    const payload = { username: userInfo.email, sub: userInfo._id };
    const access_token = this.jwtService.sign(payload);

    return {
      userInfo,
      access_token,
    };
  }
}
