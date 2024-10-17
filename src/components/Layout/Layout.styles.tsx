import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {WindowSize} from '../../hooks'
import {LayoutContainerProps} from './Layout.interface'

export const Container = styled.View<LayoutContainerProps>`
    align-self: stretch;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;

    ${({theme, windowSize = 'compact'}) => {
        const containerSize = {
            compact: css`
                gap: ${theme.adaptSize(theme.token.spacing.medium)}px;
                margin: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
            `,
            medium: css`
                gap: ${theme.adaptSize(theme.token.spacing.large)}px;
                margin: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.large)}px;
            `,
            expanded: css`
                gap: ${theme.adaptSize(theme.token.spacing.medium)}px;
                margin: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.large)}px;
            `,
            large: css`
                gap: ${theme.adaptSize(theme.token.spacing.large)}px;
                margin: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.large)}px;
            `,
            extraLarge: css`
                gap: ${theme.adaptSize(theme.token.spacing.large)}px;
                margin: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.large)}px;
            `
        } as Record<WindowSize, RuleSet<object> | undefined>

        return containerSize[windowSize]
    }}

    ${({theme, navigationArea}) =>
        navigationArea &&
        css`
            margin-left: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}


    ${({theme}) => css`
        background-color: ${theme.token.scheme.surface};
    `}
`
