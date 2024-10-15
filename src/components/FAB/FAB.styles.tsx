import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {FABContainerProps, FABContentProps, FABMainProps} from './FAB.interface'

export const Container = styled.View<FABContainerProps>`
    align-self: flex-start;
    cursor: pointer;

    ${({theme, size = 'medium', densityScale = 0}) => {
        const contentSize = {
            small: css`
                height: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
                )}px;

                min-width: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
                )}px;
            `,
            medium: css`
                height: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
                )}px;

                min-width: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
                )}px;
            `,
            large: css`
                height: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 24 + densityScale * theme.token.spacing.extraSmall
                )}px;

                min-width: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 24 + densityScale * theme.token.spacing.extraSmall
                )}px;
            `
        }

        return contentSize[size]
    }}

    ${({theme, densityScale = 0, extendedFAB}) =>
        extendedFAB &&
        css`
            min-width: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
            )}px;
        `}

    ${({theme}) => css`
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
    `}
`

export const Content = styled(Shape)<FABContentProps>`
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    z-index: 1;

    ${({theme, size = 'medium', densityScale = 0}) => {
        const contentSize = {
            small: css`
                height: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
                )}px;

                width: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
                )}px;
            `,
            medium: css`
                height: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
                )}px;

                width: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
                )}px;
            `,
            large: css`
                height: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 24 + densityScale * theme.token.spacing.extraSmall
                )}px;

                width: ${theme.adaptSize(
                    theme.token.spacing.extraSmall * 24 + densityScale * theme.token.spacing.extraSmall
                )}px;
            `
        }

        return contentSize[size]
    }}

    ${({theme, densityScale = 0, extendedFAB}) =>
        extendedFAB &&
        css`
            height: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
            )}px;

            width: auto;
        `}
`

export const ContentUnderlay = styled(Shape)`
    position: absolute;
    z-index: -1;

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
    z-index: 1;

    ${({theme, size = 'medium'}) => {
        const contentSize = {
            small: css`
                padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.small)}px;
            `,
            medium: css`
                padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
            `,
            large: css`
                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                    ${theme.adaptSize(theme.token.spacing.extraLarge + -0.5 * theme.token.spacing.extraSmall)}px;
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
                ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
        `}
`

export const LabelText = styled(Typography)`
    text-align: center;
    user-select: none;
`

export const IconContainer = styled.View`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
`
