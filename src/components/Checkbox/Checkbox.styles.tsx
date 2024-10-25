import styled, {css} from 'styled-components/native'
import {Shape} from '../Common'
import {CheckboxIconContainerProps} from './Checkbox.interface'

export const Container = styled.View`
        cursor: pointer;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Content = styled(Shape)`
        align-items: center;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
        `};
`

export const Main = styled(Shape)`
        overflow: hidden;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)}px;

                width: ${theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)}px;
        `}
`

export const IconContainer = styled.View<CheckboxIconContainerProps>`
        overflow: hidden;
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}

        ${({zIndex = 0}) => css`
                z-index: ${zIndex};
        `}

    ${({visible}) =>
                !visible &&
                css`
                        opacity: 0;
                `}
`
