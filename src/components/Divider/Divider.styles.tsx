import {Size} from '@bearei/material-token'
import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {LayoutType, Typography} from '../Common'
import {DividerLayoutProps} from './Divider.interface'

export const Container = styled.View<DividerLayoutProps>`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}

        ${({layout = LayoutType.HORIZONTAL, theme}) => {
                const containerLayout = {
                        [LayoutType.HORIZONTAL]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
                                width: 100%;
                        `,

                        [LayoutType.VERTICAL]: css`
                                height: 100%;
                                width: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
                        `
                } as Record<LayoutType, RuleSet<object> | undefined>

                return containerLayout[layout]
        }}
    
    ${({layout = LayoutType.HORIZONTAL, size = Size.MEDIUM, theme}) => {
                const containerSize = {
                        [Size.MEDIUM]:
                                layout === LayoutType.HORIZONTAL ?
                                        css`
                                                padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                                        `
                                :       css`
                                                padding-top: ${theme.adaptSize(theme.token.spacing.medium)}px;
                                        `,
                        [Size.SMALL]:
                                layout === LayoutType.HORIZONTAL ?
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
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
        `}
`

export const Subheader = styled(Typography)`
        ${({theme}) => css`
                color: ${theme.token.scheme.onSurfaceVariant};
        `}
`
