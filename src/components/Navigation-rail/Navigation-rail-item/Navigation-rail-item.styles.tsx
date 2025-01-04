import styled, {css} from 'styled-components/native'
import {Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {
        NavigationRailItemHeaderProps,
        NavigationRailItemIconProps,
        NavigationRailItemLabelTextProps
} from './Navigation-rail-item.interface'

export const Container = styled.View``
export const TouchableContent = styled.Pressable`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        outline-style: none;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        `}
`

export const Header = styled.View<NavigationRailItemHeaderProps>`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraLarge)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
        `};

        ${({theme, type}) =>
                type === 'block' &&
                css`
                        height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
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

export const Icon = styled(LayoutAnimated)<NavigationRailItemIconProps>`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`

export const Label = styled.View`
        overflow: hidden;
        position: relative;
        transform-origin: top;
`

export const LabelText = styled(Typography)<NavigationRailItemLabelTextProps>`
        user-select: none;

        ${({theme, active}) => css`
                font-weight: ${active ? theme.token.font.weight.bold : theme.token.font.weight.medium};
                height: ${theme.adaptSize(theme.token.spacing.large)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                line-height: ${theme.adaptSize(theme.token.spacing.large)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`
