import { IsNotEmpty, IsNumber, IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CreateCartItemsDTO {

  @IsNumber({}, { message: 'El total debe ser un número.' })
  @IsNotEmpty({ message: 'El total es obligatorio.' })
  @Min(0, { message: 'El total debe ser mayor que 0.' })
  public readonly total: number;

  @IsInt({ message: 'La cantidad debe ser un número entero.' })
  @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
  @Min(1, { message: 'La cantidad debe ser mayor que 0.' })
  public readonly quantity: number;

  @IsUUID('all', { message: 'El ID del producto debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
  public readonly productId: string;

  @IsUUID('all', { message: 'El ID del carrito debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del carrito es obligatorio.' })
  public readonly cartId: string;
}
