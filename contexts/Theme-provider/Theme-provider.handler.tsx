import {Token} from '@bearei/theme-token'
import {vars} from 'nativewind'

export const processCssVariables = (token: Token) => {
        const toKebabCase = (str: string) =>
                Array.from(str)
                        .map(char =>
                                char === char.toUpperCase() && char !== char.toLowerCase() ?
                                        '-' + char.toLowerCase()
                                :       char
                        )
                        .join('')

        return vars({
                ...Object.entries(token.scheme).reduce(
                        (accumulator, [key, value]) => ({...accumulator, [`--color-${toKebabCase(key)}`]: value}),
                        {}
                )
        })
}
