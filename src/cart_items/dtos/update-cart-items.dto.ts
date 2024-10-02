import { PartialType } from "@nestjs/mapped-types";
import { CreateCartItemsDTO } from "./create-cart-items.dto";

export class UpdateCartItemsDTO extends PartialType (CreateCartItemsDTO) {
    public readonly id?: string;
}