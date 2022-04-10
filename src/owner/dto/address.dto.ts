import { IsNotEmpty } from "class-validator"

export class AddressDto {
    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    subDistrict: string

    @IsNotEmpty()
    district: string

    @IsNotEmpty()
    province: string

    fun
}