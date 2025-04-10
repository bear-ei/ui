import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {ListAffordanceButtonContainerProps} from './List-affordance-button.interface'

export const Container = styled.View<ListAffordanceButtonContainerProps>`
        cursor: pointer;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 17)}px;
        `}
`

export const Content = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 17)}px;
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

export const LabelText = styled(Typography)`
        text-align: center;
        user-select: none;

        ${({theme}) => css`
                color: ${theme.token.scheme.onPrimary};
        `}
`
