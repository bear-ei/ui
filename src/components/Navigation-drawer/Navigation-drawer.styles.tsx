import styled, {css} from 'styled-components/native'
import {Typography} from '../Common'

export const Container = styled.View`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;

        ${({theme}) => css`
                padding: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 90)}px;
        `}
`

export const Headline = styled.View`
        align-items: flex-start;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        justify-content: center;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                padding: ${theme.adaptSize(theme.token.spacing.medium)}px;
        `};
`

export const HeadlineText = styled(Typography)`
        ${({theme}) => css`
                color: ${theme.token.scheme.onSurfaceVariant};
        `};
`

export const Destination = styled.View`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
`
