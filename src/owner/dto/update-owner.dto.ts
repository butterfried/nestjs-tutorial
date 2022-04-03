import { IsNotEmpty } from 'class-validator';

export class UpdateOwnerDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    address: string
}
