import { IsNotEmpty } from 'class-validator';
import { AddressDto } from './address.dto';

export class UpdateOwnerDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    phone: string

    address: AddressDto
}
