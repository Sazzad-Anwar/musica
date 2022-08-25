import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;

  @IsNumber()
  @IsNotEmpty()
  albumId: number;
}

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  artistId?: number;

  @IsNumber()
  @IsNotEmpty()
  albumId?: number;
}
