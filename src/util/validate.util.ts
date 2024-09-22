import {validate as classValidator} from 'class-validator'
import {ValidateRule} from './util.interface'

export const validate = (Rule: ValidateRule) => (name: string) => (value: unknown) =>
    classValidator(Object.assign(new Rule(), {[name]: value}), {
        forbidNonWhitelisted: true,
        skipMissingProperties: true,
        whitelist: true
    })
