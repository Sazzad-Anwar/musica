import { TrackDto, UpdateTrackDto } from './../dto/track/track.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Track } from '@prisma/client';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  // create track
  async createTrack(dto: TrackDto): Promise<Track> {
    const trackExist = await this.prisma.track.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (trackExist)
      throw new HttpException('Already Exist', HttpStatus.CONFLICT);

    const track = await this.prisma.track.create({
      data: {
        name: dto.name,
        albumId: dto.albumId,
        artistId: dto.artistId,
      },
    });

    return track;
  }

  // get all tracks
  async getAllTracks(): Promise<Track[]> {
    const tracks = await this.prisma.track.findMany({
      include: {
        album: true,
      },
    });

    return tracks;
  }

  // find a track by id and return an object if the track is found or not
  async trackFoundById(
    id: number,
  ): Promise<{ track: Track; isFound: boolean }> {
    let isFound: boolean;
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
      include: {
        album: true,
      },
    });

    if (!track) {
      isFound = false;
    } else {
      isFound = true;
    }

    return {
      track,
      isFound,
    };
  }

  // Get a track by Id
  async getTrackById(id: number): Promise<Track> {
    const isFound = (await this.trackFoundById(id)).isFound;
    const track = (await this.trackFoundById(id)).track;
    if (!isFound) throw new NotFoundException(`The track ${id} is not found`);
    return track;
  }

  // Update a track
  async updateTrack(id: number, dto: UpdateTrackDto): Promise<Track> {
    const isFound = (await this.trackFoundById(id)).isFound;
    if (!isFound) throw new NotFoundException(`The track ${id} is not found`);
    const updatedTrack = await this.prisma.track.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        artistId: dto.artistId,
        albumId: dto.albumId,
      },
      include: {
        album: true,
      },
    });

    return updatedTrack;
  }

  // Delete a track
  async deleteTrack(id: number) {
    const isFound = (await this.trackFoundById(id)).isFound;
    if (!isFound) throw new NotFoundException(`The track ${id} is not found`);
    console.log(isFound);
    await this.prisma.track.delete({
      where: {
        id,
      },
    });

    return `Track ${id} is deleted`;
  }
}
