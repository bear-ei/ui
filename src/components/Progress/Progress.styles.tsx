import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ProgressContainerProps, ProgressType} from './Progress.interface'

export const Container = styled(Shape)<ProgressContainerProps>`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: row;
        justify-content: center;
        overflow: hidden;
        position: relative;

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

export const Track = styled(Shape)`
        align-self: stretch;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.primaryContainer};
                flex: 1;
                height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}
`

export const Stop = styled(Shape)`
        position: absolute;
        z-index: 4;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.primary};
                height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `};
`
