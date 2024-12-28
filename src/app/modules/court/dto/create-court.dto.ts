import { IsString } from 'class-validator';

export class CreateCourtDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  cameraName: string;
}
