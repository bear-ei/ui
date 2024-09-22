import {validate as classValidator} from 'class-validator'
import {ValidationRule} from './util.interface'

export const validate = (rule: ValidationRule) => (name: string) => (value: unknown) =>
    classValidator(Object.assign(new rule(), {[name]: value}), {
        forbidNonWhitelisted: true,
        skipMissingProperties: true,
        whitelist: true
    }).then(errors => (errors.length ? errors : undefined))
