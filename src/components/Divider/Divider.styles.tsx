import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {LayoutType, Size, Typography} from '../Common'
import {DividerContainerProps} from './Divider.interface'

export const Container = styled.View<DividerContainerProps>`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}

        ${({layout = 'horizontal', theme}) => {
                const containerLayout = {
                        horizontal: css`
                                height: ${theme.adaptSize(1)}px;
                                width: 100%;
                        `,

                        vertical: css`
                                height: 100%;
                                width: ${theme.adaptSize(1)}px;
                        `
                } as Record<LayoutType, RuleSet<object> | undefined>

                return containerLayout[layout]
        }}
    
    ${({layout = 'horizontal', size = 'medium', theme}) => {
                const containerSize = {
                        medium:
                                layout === 'horizontal' ?
                                        css`
                                                padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                                        `
                                :       css`
                                                padding-top: ${theme.adaptSize(theme.token.spacing.medium)}px;
                                        `,
                        small:
                                layout === 'horizontal' ?
                                        css`
                                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                                        ${theme.adaptSize(theme.token.spacing.medium)}px;
                                        `
                                :       css`
                                                padding: ${theme.adaptSize(theme.token.spacing.medium)}px
                                                        ${theme.adaptSize(theme.token.spacing.none)}px;
                                        `
                } as Record<Size, RuleSet<object> | undefined>

                return containerSize[size]
        }};
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
