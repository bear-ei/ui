import Schema, {ValidateError, ValidateFieldsError, Values} from 'async-validator'
import {ValidateOptions, ValidateRuleError} from './util.interface'

const validateRule =
    ({validateFirst, rules}: ValidateOptions) =>
    (name: string) =>
    (value: unknown) =>
        new Schema({[name]: rules}).validate({[name]: value}, {first: validateFirst, suppressWarning: true})

export const validate = (options: ValidateOptions) => (name: string) => async (value: unknown) => {
    const {rules} = options
    const handleErrors = (fields: ValidateFieldsError | Values) => (errors: ValidateError[] | null) =>
        fields[name] !== value ? {errors: errors || [], rules} : undefined

    return validateRule(options)(name)(value)
        .then(() => undefined)
        .catch((error: ValidateRuleError) => {
            if (!error.errors) {
                throw error
            }

            const {errors, fields} = error

            return handleErrors(fields)(errors)
        })
}
