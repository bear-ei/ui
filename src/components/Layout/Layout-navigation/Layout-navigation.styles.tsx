import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {WindowSize} from '../../../hooks'
import {Shape} from '../../Common'
import {LayoutNavigationContainerProps} from './Layout-navigation.interface'

export const Container = styled(Shape)<LayoutNavigationContainerProps>`
    overflow: hidden;

    ${({theme}) => css`
        max-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 80)}px;
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
        width: ${theme.adaptSize(theme.token.spacing.extraSmall * 20)}px;
    `}

    ${({theme, windowSize = 'compact'}) => {
        const containerSize = {
            compact: css`
                margin-right: ${-theme.adaptSize(theme.token.spacing.medium)}px;
            `,
            medium: css`
                margin-right: ${-theme.adaptSize(theme.token.spacing.large)}px;
            `,
            expanded: css`
                margin-right: ${-theme.adaptSize(theme.token.spacing.large)}px;
            `,
            large: css`
                margin-right: ${-theme.adaptSize(theme.token.spacing.large)}px;
            `,
            extraLarge: css`
                margin-right: ${-theme.adaptSize(theme.token.spacing.large)}px;
            `
        } as Record<WindowSize, RuleSet<object> | undefined>

        return containerSize[windowSize]
    }}
`
