import { IsNotEmpty, Max, Min } from "class-validator"

export class CreateCatDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @Min(1)
    @Max(30)
    age: number

    @IsNotEmpty()
    description: string
}
