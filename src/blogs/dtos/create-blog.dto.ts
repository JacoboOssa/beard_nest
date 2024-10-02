import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Type } from "class-transformer";
export class CreateBlogDTO{
    @IsString()
    @IsNotEmpty()
    @Length(3,50)
    public readonly title: string;
    @IsString()
    @IsNotEmpty()
    public readonly content: string;

    @IsString()
    @Length(3, 50)
    @IsOptional()
    public readonly slug?: string;

}