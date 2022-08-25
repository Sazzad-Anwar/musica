import { ArtistService } from './artist.service';
import { ArtistDto } from './../dto/artist/artist.dto';
import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: number) {
    return this.artistService.getArtistById(+id);
  }

  @Post()
  createArtist(@Body() dto: ArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put(':id')
  updateArtist(@Param('id') id: number, @Body() dto: ArtistDto) {
    return this.artistService.updateArtist(+id, dto);
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: number) {
    return this.artistService.deleteArtist(+id);
  }
}
