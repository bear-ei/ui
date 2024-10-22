import styled, {css} from 'styled-components/native'
import {DestinationProps} from './Navigation-rail.interface'

export const Container = styled.View`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    flex: 1;

    ${({theme}) => css`
        width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        padding: ${theme.adaptSize(theme.token.spacing.extraSmall * 11)}px
            ${theme.adaptSize(theme.token.spacing.none)}px
            ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
    `}
`

export const Destination = styled.View<DestinationProps>`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    flex: 1;

    ${({theme}) => css`
        gap: ${theme.adaptSize(
            theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
        )}px;
    `}

    ${({destinationPosition = 'top'}) => {
        const position = {
            top: css`
                justify-content: flex-start;
            `,
            middle: css`
                justify-content: center;
            `,
            bottom: css`
                justify-content: flex-end;
            `
        }

        return position[destinationPosition]
    }}
`
export const Menu = styled.View`
    overflow: hidden;

    ${({theme}) => css`
        height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        margin-bottom: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
    `};
`

export const Fab = styled.View`
    overflow: hidden;

    ${({theme}) => css`
        height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
        width: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
        margin-bottom: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 10
        )}px;
    `};
`
