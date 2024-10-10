import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class EthBaseClass {
  @IsString()
  @IsNotEmpty()
  address?: string;
}