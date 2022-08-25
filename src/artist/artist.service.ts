import { ArtistDto } from './../dto/artist/artist.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  // Create an artist
  async createArtist(dto: ArtistDto): Promise<Artist> {
    const artistExists = await this.prisma.artist.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (artistExists)
      throw new HttpException('Already Exist', HttpStatus.CONFLICT);

    const newArtist = await this.prisma.artist.create({
      data: {
        name: dto.name,
      },
    });

    return newArtist;
  }

  // find an artist by id and return an object if the artist is found or not
  async artistFoundById(
    id: number,
  ): Promise<{ artist: Artist; isFound: boolean }> {
    let isFound: boolean;
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
      include: {
        album: true,
      },
    });

    if (!artist) {
      isFound = false;
    } else {
      isFound = true;
    }

    return {
      artist,
      isFound,
    };
  }

  // Get an artist
  async getArtists(): Promise<Artist[]> {
    const artists = await this.prisma.artist.findMany({
      include: {
        album: true,
      },
    });

    return artists;
  }

  // Get an artist by id
  async getArtistById(id: number): Promise<Artist> {
    const isFound = (await this.artistFoundById(id)).isFound;
    const artist = (await this.artistFoundById(id)).artist;
    if (!isFound) throw new NotFoundException(`The artist ${id} is not found`);

    return artist;
  }

  // Update an artist
  async updateArtist(id: number, dto: ArtistDto): Promise<Artist> {
    const isFound = (await this.artistFoundById(id)).isFound;
    if (!isFound) throw new NotFoundException(`The artist ${id} is not found`);

    const updatedArtist = await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
      },
    });

    return updatedArtist;
  }

  // Delete an artist
  async deleteArtist(id: number) {
    const isFound = (await this.artistFoundById(id)).isFound;
    if (!isFound) throw new NotFoundException(`The artist ${id} is not found`);

    await this.prisma.artist.delete({
      where: {
        id,
      },
    });

    return `Artist ${id} is deleted`;
  }
}
