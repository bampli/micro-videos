import { FieldsErrors } from "../validators/validator-fields-interface";

export class ValidationError extends Error{
    constructor(message?: string) {
        super('Validation Error');
        this.name = 'ValidationError';
    }
}

export class EntityValidationError extends Error{
    constructor(public error: FieldsErrors) {
        super('Entity Validation Error');
        this.name = 'EntityValidationError';
    }
}
