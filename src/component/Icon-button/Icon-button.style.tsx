import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {IconButtonContainerProps, IconButtonContentProps} from './Icon-button.interface'

export const Container = styled.View<IconButtonContainerProps>`
    cursor: pointer;

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
        )}px;

        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        width: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `}
`

export const Content = styled(Shape)<IconButtonContentProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;
    z-index: 1;

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
        )}px;

        width: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10 + densityScale * theme.token.spacing.extraSmall
        )}px;
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

export const Main = styled.View`
    z-index: 1;
`
