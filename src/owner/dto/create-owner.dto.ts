import { IsNotEmpty } from "class-validator"

export class CreateOwnerDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    address: string
}
