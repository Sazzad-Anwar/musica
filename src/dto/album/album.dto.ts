import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  coverPhoto?: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}

export class AlbumUpdateDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  coverPhoto?: string;

  @IsNumber()
  @IsNotEmpty()
  artistId: number;
}
