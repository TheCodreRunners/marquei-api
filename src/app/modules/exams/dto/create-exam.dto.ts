import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateExamDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  logoUrl: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
