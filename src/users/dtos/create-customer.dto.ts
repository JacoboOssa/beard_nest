import { CreateUserDTO } from "./create-user.dto";
import { IsString, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDTO extends CreateUserDTO {
    @IsString({ message: 'La dirección de facturación debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La dirección de facturación es obligatoria.' })
    public readonly billingAddress: string;

    @IsString({ message: 'La dirección de envío debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La dirección de envío es obligatoria.' })
    public readonly shippingAddress: string;

    @IsString({ message: 'El número de teléfono debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
    @IsPhoneNumber(null, { message: 'El número de teléfono no es válido.' }) // null para aceptar cualquier país
    public readonly phone: string;

    @IsString({ message: 'El país debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El país es obligatorio.' })
    public readonly country: string;

    @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
    public readonly city: string;
}
