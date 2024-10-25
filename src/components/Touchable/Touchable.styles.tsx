import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {TouchableContentProps, TouchableMainProps} from './Touchable.interface'

export const Container = styled.View`
        align-self: stretch;
        flex: 1;
`

export const TouchableContent = styled.Pressable<TouchableContentProps>`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        outline-style: none;

        ${({theme, hotZone = true}) =>
                hotZone &&
                css`
                        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                `}
`

export const Main = styled(Shape)<TouchableMainProps>`
        position: relative;
        z-index: 12;

        ${({alignSelf = 'stretch'}) => css`
                align-self: ${alignSelf};
        `}
`

export const RippleContainer = styled(Shape)`
        overflow: hidden;
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`
