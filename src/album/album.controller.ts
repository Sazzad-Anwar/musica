import { AlbumService } from './album.service';
import { AlbumDto, AlbumUpdateDto } from './../dto/album/album.dto';
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: number) {
    return this.albumService.getAlbumById(+id);
  }

  @Post()
  createAlbum(@Body() dto: AlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: number, @Body() dto: AlbumUpdateDto) {
    return this.albumService.updateAlbum(+id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteAlbum(@Param('id') id: number) {
    return this.albumService.deleteAlbum(+id);
  }
}
