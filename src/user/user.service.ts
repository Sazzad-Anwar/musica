import { ProfileDto } from './../dto/profile/profile.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get a user details
  async getUserDetails(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException(`User ${id} is not found!`);

    return user;
  }

  // Update my profile
  async updateMyProfile(user: User, dto: ProfileDto): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: dto.name,
        avatar: dto.avatar,
        email: dto.email,
      },
    });
    delete updatedUser.password;
    return updatedUser;
  }

  // Get all users
  async getAllUsers(): Promise<ProfileDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
    return users;
  }

  async getAUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException(`User ${id} is not found`);

    delete user.password;
    return user;
  }
}
