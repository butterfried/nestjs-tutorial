import { IsNotEmpty } from "class-validator"
import { AddressDto } from "./address.dto"

export class CreateOwnerDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    phone: string

    address: AddressDto
}
