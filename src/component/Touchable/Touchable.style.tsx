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
    overflow: hidden;
    position: relative;
    z-index: 3;

    ${({horizontalStretch}) =>
        horizontalStretch &&
        css`
            align-self: stretch;
        `}
`
