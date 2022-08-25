import { IsNotEmpty, IsNumber } from 'class-validator';

export class FavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  trackId: number;
}
