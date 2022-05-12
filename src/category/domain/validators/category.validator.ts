import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import ClassValidatorFields from "../../../@seedwork/validators/class-validator-fields";
import { CategoryProperties } from "../entities/category";
//import ValidatorFieldsInterface from "../../../@seedwork/validators/validator-fields-interface";

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

// Unsafe code for domain because more properties could be passed here
// constructor(data: CategoryProperties){
//     Object.assign(this, data);
// }

// any reason for comment 'implements' out from CategoryValidator?
