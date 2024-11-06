import styled, {css} from 'styled-components/native'
import {Typography} from '../../Common'
import {NavigationDrawerItemIconProps, NavigationDrawerItemLabelTextProps} from './Navigation-drawer-item.interface'

export const Container = styled.View`
        align-self: stretch;
`

export const TouchableContent = styled.Pressable`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        outline-style: none;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
        `}
`

export const Content = styled.View`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                padding: ${theme.adaptSize(theme.token.spacing.medium)}px
                        ${theme.adaptSize(theme.token.spacing.large)}px ${theme.adaptSize(theme.token.spacing.medium)}px
                        ${theme.adaptSize(theme.token.spacing.medium)}px;
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

export const Icon = styled.View<NavigationDrawerItemIconProps>`
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
        position: relative;
        overflow: hidden;
        flex: 1;
`

export const LabelText = styled(Typography)<NavigationDrawerItemLabelTextProps>`
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
