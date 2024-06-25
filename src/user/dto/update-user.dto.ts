import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Gender, UserType } from 'src/auth/interfaces';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nationalityId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  ageRange?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  phoneNo?: string;

  @IsOptional()
  @IsString()
  website?: string;
}