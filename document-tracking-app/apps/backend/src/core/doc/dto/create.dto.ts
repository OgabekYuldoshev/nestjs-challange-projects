import { IsNotEmpty, Min } from "class-validator";

export class CreateDocDto{
    @IsNotEmpty()
    @Min(4)
    title: string
}