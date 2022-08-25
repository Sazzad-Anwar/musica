import { Album } from '@prisma/client';
import { AlbumUpdateDto, AlbumDto } from './../dto/album/album.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  // Get all album list
  async getAlbums(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany({
      include: {
        track: true,
        artist: true,
      },
    });

    return albums;
  }

  // find a album by id and return an object if the album is found or not
  async albumFoundById(
    id: number,
  ): Promise<{ album: Album; isFound: boolean }> {
    let isFound: boolean;
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        track: true,
      },
    });

    if (!album) {
      isFound = false;
    } else {
      isFound = true;
    }

    return {
      album,
      isFound,
    };
  }

  // Get an album by Id
  async getAlbumById(id: number): Promise<Album> {
    const isFound = (await this.albumFoundById(id)).isFound;
    const album = (await this.albumFoundById(id)).album;
    if (!isFound) throw new NotFoundException(`The album ${id} is not found`);

    return album;
  }

  // Create an album
  async createAlbum(dto: AlbumDto): Promise<Album> {
    const albumExists = await this.prisma.album.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (albumExists)
      throw new HttpException('Already Exist', HttpStatus.CONFLICT);
    const album = await this.prisma.album.create({
      data: {
        name: dto.name,
        coverPhoto: dto.coverPhoto,
        artistId: dto.artistId,
      },
    });

    return album;
  }

  // Update an album
  async updateAlbum(id: number, dto: AlbumUpdateDto): Promise<Album> {
    const isFound = (await this.albumFoundById(id)).isFound;
    if (!isFound) throw new NotFoundException(`The album ${id} is not found`);
    const updatedAlbum = await this.prisma.album.update({
      data: {
        name: dto.name,
        coverPhoto: dto.coverPhoto,
      },
      where: {
        id,
      },
      include: {
        artist: true,
        track: true,
      },
    });

    return updatedAlbum;
  }

  // Delete an album
  async deleteAlbum(id: number) {
    const isFound = (await this.albumFoundById(id)).isFound;
    if (!isFound) throw new NotFoundException(`The album ${id} is not found`);

    return `Album ${id} is deleted`;
  }
}
