import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { API_PROPERTY } from '@common/constants';

export class RegisterDto {
  @ApiProperty(API_PROPERTY.NAME)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty(API_PROPERTY.EMAIL)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty(API_PROPERTY.PASSWORD)
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
