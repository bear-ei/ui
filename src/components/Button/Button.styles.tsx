import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import {ButtonType} from './Button.enum'
import {ButtonContainerProps, ButtonContentProps, ButtonMainProps} from './Button.interface'

export const Container = styled.View<ButtonContainerProps>`
        cursor: pointer;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        `}

        ${({theme, type = ButtonType.FILLED}) => {
                const containerType = {
                        [ButtonType.TEXT]: css`
                                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                        `,
                        [ButtonType.LINK]: css`
                                height: auto;
                                min-height: ${theme.adaptSize(theme.token.spacing.medium)}px;
                                min-width: ${theme.adaptSize(theme.token.spacing.large)}px;
                        `
                } as Record<ButtonType, RuleSet<object> | undefined>

                return containerType[type]
        }}
`

export const Content = styled(Shape)<ButtonContentProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        `}

        ${({theme, densityScale}) => {
                const density = densityScale ?? theme.densityScale

                return css`
                        height: ${theme.adaptSize(
                                theme.token.spacing.extraSmall * 10 + density * theme.token.spacing.extraSmall
                        )}px;
                `
        }}

    ${({theme, type = ButtonType.FILLED}) => {
                const contentType = {
                        [ButtonType.TEXT]: css`
                                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                        `,
                        [ButtonType.LINK]: css`
                                height: ${theme.adaptSize(theme.token.spacing.medium)}px;
                                min-width: ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `
                } as Record<ButtonType, RuleSet<object> | undefined>

                return contentType[type]
        }}
`

export const BackgroundUnderlay = styled(Shape)`
        position: absolute;
        z-index: -4;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`

export const Main = styled.View<ButtonMainProps>`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        z-index: 4;

        ${({theme}) => css`
                padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.large)}px;
        `}

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.small)}px;
        `}

    ${({theme, type = ButtonType.FILLED}) => {
                const mainType = {
                        [ButtonType.TEXT]: css`
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(
                                                theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
                                        )}px;
                        `,
                        [ButtonType.LINK]: css`
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                        `
                } as Record<ButtonType, RuleSet<object> | undefined>

                return mainType[type]
        }}

    ${({iconShow, theme, type = ButtonType.FILLED}) =>
                iconShow &&
                (type === ButtonType.TEXT ?
                        css`
                                padding-left: ${theme.adaptSize(
                                        theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
                                )}px;

                                padding-right: ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `
                :       css`
                                padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `)}
`

export const LabelText = styled(Typography)`
        text-align: center;
        user-select: none;
`

export const IconLayout = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
`

export const ActiveIndicatorLayoutAnimated = styled(LayoutAnimated)`
        position: absolute;
        z-index: 8;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.primary};
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};
`
