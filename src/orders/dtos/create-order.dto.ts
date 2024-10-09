import { IsString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateOrderDTO {
    @IsString({ message: 'La dirección de envío debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La dirección de envío es obligatoria.' })
    shipping_address: string;

    @IsString({ message: 'La dirección de la orden debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La dirección de la orden es obligatoria.' })
    order_address: string;

    @IsNumber({}, { message: 'El monto debe ser un número.' })
    @IsNotEmpty({ message: 'El monto es obligatorio.' })
    @Min(0, { message: 'El monto debe ser al menos 0.' })
    amount: number;

    @IsUUID('all', { message: 'El customer_id debe ser un UUID válido.' })
    @IsString({ message: 'El customer_id debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El customer_id es obligatorio.' })
    customer_id: string;
}
