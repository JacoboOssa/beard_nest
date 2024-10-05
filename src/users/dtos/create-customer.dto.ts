import { CreateUserDTO } from "./create-user.dto";

export class CreateCustomerDTO extends CreateUserDTO {
    public readonly billingAddress: string;
    public readonly shippingAddress: string;
    public readonly phone: string;
    public readonly country: string;
    public readonly city: string;
}