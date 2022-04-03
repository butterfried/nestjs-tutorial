import { IsNotEmpty } from "class-validator"

export class AddCatDto {
    @IsNotEmpty()
    catId: number
}
