import { IsNotEmpty, IsNumber, IsInt, IsString } from 'class-validator';

export class CreateCartItemsDTO {
  
  @IsNumber()
  @IsNotEmpty()
  public readonly total: number;

  @IsInt()
  @IsNotEmpty()
  public readonly quantity: number;

  @IsNotEmpty()
  public readonly productId: string;

  @IsNotEmpty()
  public readonly cartId: string;
}
