import { IsNotEmpty } from 'class-validator';

export class UpdateCatDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    age: number

    @IsNotEmpty()
    description: string
}
