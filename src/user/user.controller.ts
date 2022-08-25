import { UserService } from './user.service';
import { JwtGuard } from './../auth/guard/jwt_guard';
import { Controller, Param, Body, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/decorators/user';
import { ProfileDto } from 'src/dto/profile/profile.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @UseGuards(JwtGuard)
  @Get('myProfile')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getAUser(+id);
  }

  @UseGuards(JwtGuard)
  @Put('myProfile')
  updateProfile(@Body() dto: ProfileDto, @GetUser() user: User) {
    return this.userService.updateMyProfile(user, dto);
  }
}
