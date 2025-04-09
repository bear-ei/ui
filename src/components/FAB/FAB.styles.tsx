import {Size} from '@bearei/material-token'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {FABContainerProps, FABContentProps, FABMainProps} from './FAB.interface'

export const Container = styled.View<FABContainerProps>`
        align-self: flex-start;
        cursor: pointer;

        ${({theme, size = Size.MEDIUM, densityScale}) => {
                const density = densityScale ?? theme.densityScale
                const designDensity = density * theme.token.spacing.extraSmall
                const contentSize = {
                        [Size.SMALL]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + designDensity)}px;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + designDensity)}px;
                        `,
                        [Size.MEDIUM]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + designDensity)}px;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + designDensity)}px;
                        `,
                        [Size.LARGE]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + designDensity)}px;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + designDensity)}px;
                        `
                }

                return contentSize[size]
        }}

        ${({theme, extendedFAB}) =>
                extendedFAB &&
                css`
                        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                `}

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Content = styled(Shape)<FABContentProps>`
        align-items: center;
        display: flex;
        justify-content: center;
        overflow: hidden;
        position: relative;
        z-index: 4;

        ${({theme, size = Size.MEDIUM, densityScale}) => {
                const density = densityScale ?? theme.densityScale
                const designDensity = density * theme.token.spacing.extraSmall
                const contentSize = {
                        [Size.SMALL]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + designDensity)}px;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10 + designDensity)}px;
                        `,
                        [Size.MEDIUM]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + designDensity)}px;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + designDensity)}px;
                        `,
                        [Size.LARGE]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + designDensity)}px;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 24 + designDensity)}px;
                        `
                }

                return contentSize[size]
        }}

        ${({theme, extendedFAB}) =>
                extendedFAB &&
                css`
                        height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                        width: auto;
                `}
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

export const Main = styled.View<FABMainProps>`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;
        justify-content: center;
        z-index: 4;

        ${({theme, size = Size.MEDIUM}) => {
                const contentSize = {
                        [Size.SMALL]: css`
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(theme.token.spacing.small)}px;
                        `,
                        [Size.MEDIUM]: css`
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `,
                        [Size.LARGE]: css`
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(
                                                theme.token.spacing.extraLarge + -0.5 * theme.token.spacing.extraSmall
                                        )}px;
                        `
                }

                return contentSize[size]
        }}

        ${({theme, extendedFAB}) =>
                extendedFAB &&
                css`
                        gap: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
                        padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                ${theme.adaptSize(theme.token.spacing.large + -1 * theme.token.spacing.extraSmall)}px
                                ${theme.adaptSize(theme.token.spacing.none)}px
                                ${theme.adaptSize(theme.token.spacing.medium)}px;
                `}
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
