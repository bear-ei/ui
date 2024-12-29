import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {ListType} from '../List.interface'
import {
        ListItemContainerProps,
        ListItemContentProps,
        ListItemLeadingProps,
        ListItemMainInnerProps,
        ListItemMainProps,
        ListItemTrailingProps
} from './List-item.interface'

export const Container = styled(Shape)<ListItemContainerProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;

        ${({theme, type = 'standard'}) => {
                const containerType = {
                        menu: css`
                                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                        `,
                        standard: css`
                                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                        `
                } as Record<ListType, RuleSet<object> | undefined>

                return containerType[type]
        }}
`

export const Content = styled.View<ListItemContentProps>`
        position: absolute;
        width: 100%;
        z-index: 4;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};

        ${({theme, type = 'standard'}) => {
                const contentType = {
                        menu: css`
                                background-color: ${theme.token.scheme.surfaceContainer};
                        `,
                        standard: css`
                                background-color: ${theme.token.scheme.surface};
                        `
                } as Record<ListType, RuleSet<object> | undefined>

                return contentType[type]
        }}
`

export const Main = styled(Shape)<ListItemMainProps>`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        z-index: 4;

        ${({theme, type = 'standard'}) => {
                const mainType = {
                        menu: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(
                                                theme.token.spacing.medium - theme.token.spacing.extraSmall
                                        )}px;
                        `,
                        standard: css`
                                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `
                } as Record<ListType, RuleSet<object> | undefined>

                return mainType[type]
        }}

        ${({theme, supportingTextShow}) =>
                supportingTextShow &&
                css`
                        padding-bottom: ${theme.adaptSize(theme.token.spacing.small)}px;
                        padding-top: ${theme.adaptSize(theme.token.spacing.small)}px;
                `}


        ${({theme, supportingTextNumberOfLines = 0}) =>
                supportingTextNumberOfLines > 1 &&
                css`
                        padding-bottom: ${theme.adaptSize(
                                theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
                        )}px;

                        padding-top: ${theme.adaptSize(
                                theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
                        )}px;
                `}
`

export const Leading = styled.View<ListItemLeadingProps>`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                justify-content: center;
        `};

        ${({supportingTextNumberOfLines = 0, theme}) =>
                supportingTextNumberOfLines > 1 &&
                css`
                        justify-content: flex-start;
                        height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                `}
`

export const MainInner = styled.View<ListItemMainInnerProps>`
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;

        ${({theme, supportingTextShow}) =>
                supportingTextShow &&
                css`
                        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                `}

        ${({theme, type = 'standard', leadingShow}) => {
                const mainInnerType = {
                        menu: css`
                                padding-left: ${theme.adaptSize(
                                        theme.token.spacing.medium - theme.token.spacing.extraSmall
                                )}px;
                        `,
                        standard: css`
                                padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `
                } as Record<ListType, RuleSet<object> | undefined>

                if (leadingShow) {
                        return mainInnerType[type]
                }
        }}


        ${({theme, type = 'standard', trailingShow}) => {
                const mainInnerType = {
                        menu: css`
                                padding-right: ${theme.adaptSize(theme.token.spacing.small)}px;
                        `,
                        standard: css`
                                padding-right: ${theme.adaptSize(
                                        theme.token.spacing.medium - theme.token.spacing.extraSmall
                                )}px;
                        `
                } as Record<ListType, RuleSet<object> | undefined>

                if (trailingShow) {
                        return mainInnerType[type]
                }
        }}
`

export const Trailing = styled(LayoutAnimated)<ListItemTrailingProps>`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                justify-content: center;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `};

        ${({supportingTextNumberOfLines = 0, theme}) =>
                supportingTextNumberOfLines > 1 &&
                css`
                        height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                        justify-content: flex-start;
                `}

        ${({theme, trailingShow, type = 'standard'}) =>
                trailingShow &&
                ['menu'].includes(type) &&
                css`
                        margin-right: ${-theme.adaptSize(
                                theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
                        )}px;
                `}
`

export const HeadlineText = styled(Typography)``
export const SupportingText = styled(Typography)`
        height: auto;

        ${({theme}) => css`
                color: ${theme.token.scheme.onSurfaceVariant};
        `}
`

export const BeforeAffordanceContainer = styled.View`
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
`

export const AfterAffordanceContainer = styled(BeforeAffordanceContainer)`
        align-self: flex-end;
`

export const DividerContainer = styled.View`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                height: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                z-index: 8;
        `};
`
