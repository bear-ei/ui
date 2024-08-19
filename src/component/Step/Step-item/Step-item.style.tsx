import styled, {css} from 'styled-components/native'
import {Typography} from '../../Common/Common.style'
import {
    StepItemContentProps,
    StepItemHeaderProps,
    StepItemIconProps,
    StepItemLabelTextProps
} from './Step-item.interface'

export const Container = styled.View``
export const Content = styled.Pressable<StepItemContentProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({theme}) => css`
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
    `}

    ${({theme, type, densityScale = 0}) =>
        type === 'block' &&
        css`
            width: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
            )}px;
        `};
`

export const Header = styled.View<StepItemHeaderProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(theme.token.spacing.extraLarge)}px;
        width: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `};

    ${({theme, type, densityScale = 0}) =>
        type === 'block' &&
        css`
            height: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
            )}px;

            width: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
            )}px;
        `};
`

export const IconContainer = styled.View`
    overflow: hidden;
    position: relative;

    ${({theme}) => css`
        height: ${theme.adaptSize(theme.token.spacing.large)}px;
        width: ${theme.adaptSize(theme.token.spacing.large)}px;
    `}
`

export const Icon = styled.View<StepItemIconProps>`
    position: absolute;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `}

    ${({visible}) =>
        !visible &&
        css`
            opacity: 0;
        `}
`

export const Label = styled.View`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
`

export const LabelText = styled(Typography)<StepItemLabelTextProps>`
    user-select: none;

    ${({theme, active}) => css`
        font-weight: ${active ? theme.token.font.weight.bold : theme.token.font.weight.medium};
        height: ${theme.adaptSize(
            theme.token.typography.label.medium.lineHeight + 2 * theme.token.spacing.extraSmall
        )}px;

        padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px ${theme.adaptSize(theme.token.spacing.none)}px;
    `}
`
