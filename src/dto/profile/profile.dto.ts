import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  avatar?: string;
}
