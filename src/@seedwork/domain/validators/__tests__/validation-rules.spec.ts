import { Omit } from "lodash";
import { ValidationError } from "../../errors/validation-error";
import ValidatorRules from "../validator-rules";

type Values = {
    value: any;
    property: string;
};

type ExpectedRule = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error: ValidationError;
    params?: any[];
}

function assertIsInvalid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected);
    }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
    expect(() => {
        runRule(expected);
    }).not.toThrow(expected.error);
}

function runRule({
    value,
    property,
    rule,
    params = []
}: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property);
    // Cast the function to accept any argument and normalize all validation rules
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, params);
}

// https://forum.code.education/forum/topico/validator-rules-no-typescript-1456/
// I changed constructor in @seedwork/domain/validators/validation-rules.ts to:
//  private constructor( public value: any,  private property: string) { }
// Using 'public value' instead of 'private value' fixed the compiler error
// This was not the solution but why compiler stopped complaining about line below?
//  const method = validator[rule];

describe('ValidatorRules Unit Tests', () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field');
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });

    test('required validation rule', () => {
        const error = new ValidationError("The field is required");

        // invalid cases
        let arrange: Values[] = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: "", property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "required",
                error
            });
        });

        // valid cases
        arrange = [
            { value: 'test', property: 'field' },
            { value: 0, property: 'field' },
            { value: 5, property: 'field' },
            { value: false, property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "required",
                error
            });
        });
    });

    test('string validation rule', () => {
        const error = new ValidationError("The field must be a string");
        // invalid cases
        let arrange: Values[] = [
            { value: 5, property: 'field' },
            { value: {}, property: 'field' },
            { value: false, property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "string",
                error
            });
        });

        // valid cases
        arrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: 'test', property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "string",
                error
            });
        });
    });

    test('maxLength validation rule', () => {
        const error = new ValidationError("The field must have maximum 4 characters");
        // invalid cases
        let arrange: Values[] = [
            { value: "aaaaa", property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "maxLength",
                error,
                params: [4]
            });
        });

        // valid cases
        arrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: 'test', property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "maxLength",
                error,
                params: [4]
            });
        });
    });

    test('boolean validation rule', () => {
        const error = new ValidationError("The field must be a boolean");
        // invalid cases
        let arrange: Values[] = [
            { value: 5, property: 'field' },
            { value: "true", property: 'field' },
            { value: "false", property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: "boolean",
                error
            });
        });

        // valid cases
        arrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: true, property: 'field' },
            { value: false, property: 'field' },
        ];
        arrange.forEach((item) => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: "boolean",
                error
            });
        });
    });

    it('should throw validation error on nested validation rules', () => {
        let validator = ValidatorRules.values(null, 'field');
        expect(() =>
            validator.required().string().maxLength(4)
        ).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(5, 'field');
        expect(() =>
            validator.required().string().maxLength(4)
        ).toThrow(new ValidationError("The field must be a string"));

        validator = ValidatorRules.values("aaaaa", 'field');
        expect(() =>
            validator.required().string().maxLength(4)
        ).toThrow(new ValidationError("The field must have maximum 4 characters"));

        validator = ValidatorRules.values(null, 'field');
        expect(() =>
            validator.required().boolean()
        ).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values("test", 'field');
        expect(() =>
            validator.required().boolean()
        ).toThrow(new ValidationError("The field must be a boolean"));
    });

    it('should combine validation rules', () => {
        expect.assertions(0);
        ValidatorRules.values("test", "field").required().string();
        ValidatorRules.values("test", "field").required().string().maxLength(4);

        ValidatorRules.values(true, "field").required().boolean();
        ValidatorRules.values(false, "field").required().boolean();
    });
})