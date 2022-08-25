import { TrackDto, UpdateTrackDto } from './../dto/track/track.dto';
import { TracksService } from './tracks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  getTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: number) {
    return this.trackService.getTrackById(+id);
  }

  @Post()
  createTrack(@Body() dto: TrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  updateTrack(@Param('id') id: number, @Body() dto: UpdateTrackDto) {
    return this.trackService.updateTrack(+id, dto);
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: number) {
    return this.trackService.deleteTrack(+id);
  }
}
