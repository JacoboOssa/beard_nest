import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrderDetailsDTO {
    @IsUUID('all', { message: 'El orderId debe ser un UUID válido.' })
    @IsString({ message: 'El orderId debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El orderId es obligatorio.' })
    readonly orderId: string;

    @IsUUID('all', { message: 'El productId debe ser un UUID válido.' })
    @IsString({ message: 'El productId debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El productId es obligatorio.' })
    readonly productId: string;

    @IsNumber({}, { message: 'La cantidad debe ser un número.' })
    @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
    @Min(1, { message: 'La cantidad debe ser al menos 1.' })
    readonly quantity: number;

    @IsNumber({}, { message: 'El precio debe ser un número.' })
    @IsNotEmpty({ message: 'El precio es obligatorio.' })
    @Min(1, { message: 'El precio debe ser al menos 0.' })
    readonly price: number;
}
