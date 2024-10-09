import { IsString, IsNotEmpty, IsNumber, IsUUID, IsInt, MaxLength, Length, IsOptional, Min } from 'class-validator';

export class CreateProductDTO {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres.' })
  public readonly name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  public readonly description: string;

  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsNotEmpty({ message: 'El precio es obligatorio.' })
  @Min(1, { message: 'El precio debe ser mayor que 0.' })
  public readonly price: number;

  @IsInt({ message: 'El stock debe ser un número entero.' })
  @IsNotEmpty({ message: 'El stock es obligatorio.' })
  public readonly stock: number;

  @IsUUID('all', { message: 'El categoryId debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El categoryId es obligatorio.' })
  public readonly categoryId: string;

  @IsString({ message: 'El slug debe ser una cadena de texto.' })
  @Length(3, 50, { message: 'El slug debe tener entre 3 y 50 caracteres.' })
  @IsOptional()
  public readonly slug?: string;
}
