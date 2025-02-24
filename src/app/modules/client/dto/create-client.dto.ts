export class CreateClientDto {
  name: string;
  cnpj: string;
  address: string;
  logoUrl?: string | null;
  client: any; // Adjust the type as necessary

  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateCourtDto)
  // courts?: CreateCourtDto[];
}
