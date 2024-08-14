import {RuleItem, ValidateError, ValidateFieldsError, Values} from 'async-validator'

export interface ValidateOptions {
    rules: RuleItem[]
    validateFirst?: boolean
}

export interface ValidateRuleError {
    errors?: ValidateError[] | null
    fields: ValidateFieldsError | Values
}

export type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void
export type NamePath<T = Record<string, unknown>> = keyof T | (keyof T)[]
export interface AdaptWindowOptions {
    screenHeight?: number
    screenWidth?: number
}

export interface AdaptDesignOptions {
    designDensity?: number
    designHeight?: number
    designWidth?: number
}
