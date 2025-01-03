import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {ProgressContainerProps, ProgressType} from './Progress.interface'

export const Container = styled.View<ProgressContainerProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;

        ${({theme, type = 'linear', height, width}) => {
                const containerType = {
                        linear: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                        `,
                        circular: css`
                                height: ${height ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                                width: ${width ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                        `
                } as Record<ProgressType, RuleSet<object> | undefined>

                return containerType[type]
        }}

        ${({theme, progressing, type}) =>
                progressing &&
                type === 'linear' &&
                css`
                        gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                `};
`
