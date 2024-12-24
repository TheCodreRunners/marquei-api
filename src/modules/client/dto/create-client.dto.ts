import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateCourtDto)
  // courts?: CreateCourtDto[];
}
