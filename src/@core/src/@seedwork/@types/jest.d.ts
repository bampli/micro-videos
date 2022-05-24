import { FieldsErrors } from "../domain/validators/validator-fields-interface";

declare global {
    namespace jest {
        interface Matchers<R, T = {}> {
            containsErrorMessages: (expected: FieldsErrors) => R;
        }
    }
}

export { };