import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {ContentProps, MainProps} from './Touchable.interface'

export const Container = styled.View`
    align-self: stretch;
    flex: 1;
`

export const Content = styled.Pressable<ContentProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({theme, hotZone = true}) =>
        hotZone &&
        css`
            min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
            min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Main = styled(Shape)<MainProps>`
    position: relative;
    z-index: 3;

    ${({horizontalStretch}) =>
        horizontalStretch &&
        css`
            align-self: stretch;
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
