import { FieldsErrors } from '#seedwork/domain';

export class LoadEntityError extends Error{
    constructor(public error: FieldsErrors, message?: string) {
        super(message ?? 'Entity was not loaded');
        this.name = 'LoadEntityError';
    }
}

//export default LoadEntityError;