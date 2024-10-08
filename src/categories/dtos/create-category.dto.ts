import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDTO{
    
    @IsString()
    @Length(3,50)
    public readonly name: string;

    @IsString()
    @Length(3, 50)
    @IsOptional()
    public readonly slug?: string;
}