export type FieldsErrors = {
    [field: string]: string[]
}

// name: [required, string, max_length, etc]

export default interface ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors;
    validatedData: PropsValidated;
    validate(data: any): boolean;
}
// if(validator.validate(data))
//  then validator.validatedData
//  else validator.errors

// objectives:
//  - create a validation abstraction for entities, powered by a lib
//  - do not depend on this lib

// api rest:
//  post /categories {name: 5, description: 5, is_active: 5}
//      name must be a string
//      description must be a string
//      is_active must be a boolean
//
//  return only one (first) error is not efficient
//  entity validation should check all errors at once

// validations: parameters, 2 or more, entity, domain service
// types:
//  null or empty
//  parameter length
//  special: email, cpf, cnpj, credit card

