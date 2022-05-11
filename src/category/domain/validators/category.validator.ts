import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { create } from "lodash";
import { ClassValidatorFields } from "../../../@seedwork/validators/class-validator-fields";
import ValidatorFieldsInterface from "../../../@seedwork/validators/validator-fields-interface";
import { CategoryProperties } from "../entities/category";

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({
        name,
        description,
        is_active,
        created_at,
    }: CategoryProperties) {
        Object.assign(this, { name, description, is_active, created_at });
    }
    // Unsafe code for domain: more properties could be passed here
    // constructor(data: CategoryProperties){
    //     Object.assign(this, data);
    // }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules>
//implements ValidatorFieldsInterface<CategoryRules>
{
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRules(data));
    }
}

export default class CategoryValidatorFactory{
    static create(){
        return new CategoryValidator();
    }
}