import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";
export class UpdateAdminDTO extends PartialType(CreateUserDTO){
    public readonly id?: string;
}