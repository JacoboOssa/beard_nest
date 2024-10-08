import { IsString, IsNotEmpty, IsNumber, IsUUID, IsInt, MaxLength, Length, IsOptional } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3,50)
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly price: number;

  @IsInt()
  @IsNotEmpty()
  public readonly stock: number;

  @IsNotEmpty()
  public readonly categoryId: string;

  @IsString()
  @Length(3,50)
  @IsOptional()
  public readonly slug?: string;




}
