import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto) {
    const find = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (find) {
      throw new ConflictException('User already exist');
    }

    const user = this.usersRepository.create(body);
    return this.usersRepository.save(user);
  }

  findOneBy(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  find(email: string) {
    return this.usersRepository.find({ where: { email } });
  }
}
