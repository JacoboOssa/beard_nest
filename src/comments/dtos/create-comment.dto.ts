import 'class-validator'
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDTO {
    @IsString()
    content: string;
    @Length(0,5)
    stars: number;
    @IsUUID()
    @IsString()
    customerId: string;
    @IsUUID()
    @IsString()
    productId: string;
}