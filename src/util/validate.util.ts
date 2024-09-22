import {validate as classValidator} from 'class-validator'
import {ValidationRule} from './util.interface'

export const validate = (Rule: ValidationRule) => (name: string) => (value: unknown) =>
    classValidator(Object.assign(new Rule(), {[name]: value}), {
        forbidNonWhitelisted: true,
        skipMissingProperties: true,
        whitelist: true
    })
