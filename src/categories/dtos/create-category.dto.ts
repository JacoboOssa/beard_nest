import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDTO {
    
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    public readonly name: string;

    @IsString({ message: 'El slug debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El slug debe tener entre 3 y 50 caracteres.' })
    @IsOptional()
    public readonly slug?: string;
}
