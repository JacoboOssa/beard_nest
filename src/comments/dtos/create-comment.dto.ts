import { IsString, IsUUID, Length, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateCommentDTO {
    @IsString({ message: 'El contenido debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El contenido es obligatorio.' })
    content: string;

    @IsInt({ message: 'Las estrellas deben ser un número entero.' })
    @Min(0, { message: 'Las estrellas deben ser al menos 0.' })
    @Max(5, { message: 'Las estrellas no pueden ser más de 5.' })
    @IsNotEmpty({ message: 'Las estrellas son obligatorias.' })
    stars: number;

    @IsUUID('all', { message: 'El customerId debe ser un UUID válido.' })
    @IsString({ message: 'El customerId debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El customerId es obligatorio.' })
    customerId: string;

    @IsUUID('all', { message: 'El productId debe ser un UUID válido.' })
    @IsString({ message: 'El productId debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El productId es obligatorio.' })
    productId: string;
}
