import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDetailsDTO } from "./create-order-details.dto";

export class UpdateOrderDetailsDTO extends PartialType(CreateOrderDetailsDTO) {
    public readonly id?: string;
    
}