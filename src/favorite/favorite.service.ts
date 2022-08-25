import { PrismaService } from './../prisma/prisma.service';
import { Favorite, User } from '@prisma/client';
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  // Find a favorite track by id userId trackId
  async favoriteFoundById(
    user: User,
    trackId?: number,
    id?: number,
  ): Promise<{ favorite: Favorite; isFound: boolean }> {
    let isFound: boolean;
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId: user.id,
        trackId: trackId,
        id,
      },
      include: {
        track: true,
        user: true,
      },
    });

    if (!favorite) {
      isFound = false;
    } else {
      isFound = true;
    }

    return {
      favorite,
      isFound,
    };
  }

  //Create favorite track lista
  async createFavorite(user: User, trackId: number): Promise<Favorite> {
    console.log(trackId);
    const isFound = (await this.favoriteFoundById(user, trackId)).isFound;

    if (isFound) throw new HttpException('Already exists', HttpStatus.CONFLICT);

    const favoriteTrack = await this.prisma.favorite.create({
      data: {
        userId: user.id,
        trackId: trackId,
      },
      include: {
        user: true,
        track: true,
      },
    });

    return favoriteTrack;
  }

  //Get all favorite track of a user
  async getFavorites(user: User): Promise<Favorite[]> {
    const favorites = await this.prisma.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        track: true,
        user: true,
      },
    });

    return favorites;
  }

  // Get a favorite track by Id
  async getFavoritesById(user: User, id: number): Promise<Favorite> {
    const favorites = await this.prisma.favorite.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        track: true,
        user: true,
      },
    });

    if (!favorites)
      throw new NotFoundException(`Favorite track ${id} is not found!`);

    return favorites;
  }

  //Update favorite track list
  async updateFavorite(
    id: number,
    user: User,
    trackId: number,
  ): Promise<Favorite> {
    const isFound = (await this.favoriteFoundById(user, trackId, id)).isFound;

    if (!isFound)
      throw new NotFoundException(`Favorite track ${id} is not found!`);

    const updatedFavorite = await this.prisma.favorite.update({
      where: {
        id,
      },
      data: {
        trackId: trackId,
        userId: user.id,
      },
    });

    return updatedFavorite;
  }

  //Delete favorite track
  async deleteFavorite(id: number, user: User) {
    const isFound = await this.prisma.favorite.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!isFound)
      throw new NotFoundException(`Favorite track ${id} is not found!`);

    await this.prisma.favorite.delete({
      where: {
        id,
      },
    });

    return `Favorite track ${id} is deleted`;
  }
}
