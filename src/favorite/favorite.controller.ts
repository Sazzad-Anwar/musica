import { JwtGuard } from './../auth/guard/jwt_guard';
import { FavoriteDto } from './../dto/favorite/favorite.dto';
import { FavoriteService } from './favorite.service';
import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/user';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  getFavorites(@GetUser() user: User) {
    return this.favoriteService.getFavorites(user);
  }

  @Get(':id')
  getFavoritesById(@GetUser() user: User, @Param('id') id: number) {
    return this.favoriteService.getFavoritesById(user, +id);
  }

  @Post()
  createFavorites(@GetUser() user: User, @Body() dto: FavoriteDto) {
    const trackId: number = +dto.trackId;
    return this.favoriteService.createFavorite(user, trackId);
  }

  @Put(':id')
  updateFavorite(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() dto: FavoriteDto,
  ) {
    const trackId: number = +dto.trackId;
    return this.favoriteService.updateFavorite(+id, user, trackId);
  }

  @Delete(':id')
  deleteFavorite(@Param('id') id: number, @GetUser() user: User) {
    return this.favoriteService.deleteFavorite(+id, user);
  }
}
