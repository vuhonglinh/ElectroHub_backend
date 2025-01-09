import {
    IsArray,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    ValidateNested,
    ArrayNotEmpty,
    ArrayUnique,
    IsObject,
    IsDefined,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariantAttributeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}

class VariantDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity?: number;

    @IsNumber()
    @Min(1)
    height: number;

    @IsNumber()
    @Min(1)
    length: number;

    @IsNumber()
    @Min(1)
    weight: number;

    @IsNumber()
    @Min(1)
    width: number;

    @IsString()
    @MinLength(10)
    sub_description: string;

    @IsIn([true, false])
    status: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantAttributeDto)
    attributes: VariantAttributeDto[];
}

class AttributeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    values: { value: string }[];
}

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsArray()
    images?: Array<Express.Multer.File>;


    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    category_id: number;

    @IsIn([true, false])
    status: boolean;

    @IsIn([true, false])
    is_simple: boolean;


    @IsOptional()
    @IsNumber()
    @Min(1)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    height?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    length?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    weight?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    width?: number;

    @IsOptional()
    @IsString()
    @MinLength(10)
    sub_description?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantDto)
    variants?: VariantDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttributeDto)
    attributes?: AttributeDto[];
}
