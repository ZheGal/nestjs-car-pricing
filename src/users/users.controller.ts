import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
    return session.color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(parseInt(id));
  }

  @Get()
  async findAllUsers(@Query() query: FindUserDto): Promise<User[]> {
    return await this.usersService.find(query);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(parseInt(id), body);
  }
}
