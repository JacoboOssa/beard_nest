import { IsString, IsNotEmpty, IsEmail, Length, Matches } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @Length(3, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres.' })
  public readonly name: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @Length(2, 50, { message: 'El apellido debe tener entre 2 y 50 caracteres.' })
  public readonly lastname: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  public readonly email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @Length(6, 100, { message: 'La contraseña debe tener entre 6 y 100 caracteres.' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/, {
    message: "Password too weak"})
  public readonly password: string;
}
