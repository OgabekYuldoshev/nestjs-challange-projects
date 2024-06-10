import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserModel } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {
  }

  getUsers() {
    return this.userModel.find()
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }
}
