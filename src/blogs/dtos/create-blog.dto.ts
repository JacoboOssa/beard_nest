import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export class CreateBlogDTO {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @Length(3, 50, { message: 'El título debe tener entre 3 y 50 caracteres.' })
  public readonly title: string;

  @IsString({ message: 'El contenido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El contenido es obligatorio.' })
  public readonly content: string;

  @IsString({ message: 'El slug debe ser una cadena de texto.' })
  @Length(3, 50, { message: 'El slug debe tener entre 3 y 50 caracteres.' })
  @IsOptional()
  public readonly slug?: string;
}
