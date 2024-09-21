import Schema, {ValidateError} from 'async-validator'
import {ProcessValidateErrorOptions, ValidateOptions, ValidateRuleError} from './util.interface'

const validateRule =
    ({validateFirst, rules}: ValidateOptions) =>
    (name: string) =>
    (value: unknown) =>
        new Schema({[name]: rules}).validate({[name]: value}, {first: validateFirst, suppressWarning: true})

export const validate = (options: ValidateOptions) => {
    const processValidateError =
        ({fields, name, rules}: ProcessValidateErrorOptions) =>
        (errors: ValidateError[] | null) =>
        (value: unknown) =>
            fields[name] !== value ? {errors: errors || [], rules} : undefined

    return (name: string) => async (value: unknown) =>
        validateRule(options)(name)(value)
            .then(() => undefined)
            .catch((error: ValidateRuleError) => {
                if (!error.errors) {
                    throw error
                }

                const {errors, fields} = error

                return processValidateError({fields, name, rules: options.rules})(errors)(value)
            })
}
