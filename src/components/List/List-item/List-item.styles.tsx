import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {ListType} from '../List.interface'
import {
    ListItemBeforeAffordanceContainerProps,
    ListItemContainerProps,
    ListItemContentProps,
    ListItemLeadingProps,
    ListItemMainInnerProps,
    ListItemMainProps,
    ListItemTrailingProps
} from './List-item.interface'

export const Container = styled(Shape)<ListItemContainerProps>`
    position: relative;
    overflow: hidden;

    ${({theme, type = 'standard'}) => {
        const containerType = {
            menu: css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
            `
        } as Record<ListType, RuleSet<object> | undefined>

        return (
            containerType[type] ??
            css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
            `
        )
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

export const Main = styled.View<ListItemMainProps>`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    z-index: 4;

    ${({theme, type = 'standard'}) => {
        const mainType = {
            menu: css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                padding: ${theme.adaptSize(theme.token.spacing.medium - theme.token.spacing.extraSmall)}px;
            `,
            standard: css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
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
            padding-bottom: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
            padding-top: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
        `}
`

export const Leading = styled.View<ListItemLeadingProps>`
    display: flex;
    flex-direction: column;

    ${({theme}) => css`
        max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
    `};

    ${({supportingTextNumberOfLines = 0, theme}) =>
        supportingTextNumberOfLines > 1 &&
        css`
            justify-content: flex-start;
            min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
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
                padding-left: ${theme.adaptSize(theme.token.spacing.medium - theme.token.spacing.extraSmall)}px;
            `
        } as Record<ListType, RuleSet<object> | undefined>

        if (leadingShow) {
            return (
                mainInnerType[type] ??
                css`
                    padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                `
            )
        }
    }}


    ${({theme, type = 'standard', trailingShow}) => {
        const mainInnerType = {
            menu: css`
                padding-right: ${theme.adaptSize(theme.token.spacing.medium - theme.token.spacing.extraSmall)}px;
            `
        } as Record<ListType, RuleSet<object> | undefined>

        if (trailingShow) {
            return (
                mainInnerType[type] ??
                css`
                    padding-right: ${theme.adaptSize(theme.token.spacing.medium - theme.token.spacing.extraSmall)}px;
                `
            )
        }
    }}
`

export const Trailing = styled(LayoutAnimated)<ListItemTrailingProps>`
    display: flex;
    flex-direction: column;

    ${({theme}) => css`
        justify-content: center;
        max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
    `};

    ${({supportingTextNumberOfLines = 0, theme}) =>
        supportingTextNumberOfLines > 1 &&
        css`
            justify-content: flex-start;
            max-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const HeadlineText = styled(Typography)``

export const SupportingText = styled(Typography)`
    height: auto;

    ${({theme}) => css`
        color: ${theme.token.scheme.onSurfaceVariant};
    `}
`

export const BeforeAffordanceContainer = styled.View<ListItemBeforeAffordanceContainerProps>`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `};
`

export const ListAfterAffordanceContainer = styled(BeforeAffordanceContainer)<ListItemBeforeAffordanceContainerProps>`
    left: auto;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `};
`
