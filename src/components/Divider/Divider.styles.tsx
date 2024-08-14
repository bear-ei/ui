import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Size, Typography} from '../Common'
import {DividerContainerProps} from './Divider.interface'

export const Container = styled.View<DividerContainerProps>`
    display: flex;
    flex-direction: column;
    align-self: flex-start;

    ${({theme}) => css`
        gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `}

    ${({layout = 'horizontal', theme}) => {
        const containerLayout = {
            horizontal: css`
                height: ${theme.adaptSize(1)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
            `,

            vertical: css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
                width: ${theme.adaptSize(1)}px;
            `
        }

        return containerLayout[layout]
    }}
    
    ${({layout = 'horizontal', size = 'medium', theme}) => {
        const containerSize = {
            medium:
                layout === 'horizontal' ?
                    css`
                        padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                    `
                :   css`
                        padding-top: ${theme.adaptSize(theme.token.spacing.medium)}px;
                    `,
            small:
                layout === 'horizontal' ?
                    css`
                        padding: ${theme.adaptSize(theme.token.spacing.none)}px
                            ${theme.adaptSize(theme.token.spacing.medium)}px;
                    `
                :   css`
                        padding: ${theme.adaptSize(theme.token.spacing.medium)}px
                            ${theme.adaptSize(theme.token.spacing.none)}px;
                    `
        } as Record<Size, RuleSet<object> | undefined>

        return containerSize[size]
    }};

    ${({verticalStretch}) =>
        verticalStretch &&
        css`
            flex: 1;
        `}

    ${({horizontalStretch}) =>
        horizontalStretch &&
        css`
            align-self: stretch;
        `}
`

export const Content = styled.View`
    flex: 1;

    ${({theme}) => css`
        background-color: ${theme.token.scheme.outlineVariant};
        min-height: ${theme.adaptSize(1)}px;
    `}
`

export const Subheader = styled(Typography)`
    ${({theme}) => css`
        color: ${theme.token.scheme.onSurfaceVariant};
    `}
`
