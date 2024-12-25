import {
  IsInt,
  IsBoolean,
  IsOptional,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateRecordDto {
  @IsInt()
  courtId: number;

  @IsNotEmpty({ message: 'Data não pode ser vazia' })
  data: Date;

  @IsBoolean()
  @IsOptional()
  isDone?: boolean;

  @IsOptional()
  url: string;

  @IsOptional()
  key: string;
}
