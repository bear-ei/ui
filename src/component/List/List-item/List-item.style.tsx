import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common/Common.style'
import {LayoutAnimated} from '../../Layout-animated'
import {
    ListItemBeforeAffordanceContainerProps,
    ListItemContainerProps,
    ListItemLeadingProps,
    ListItemMainInnerProps,
    ListItemMainProps,
    ListItemTrailingProps
} from './List-item.interface'

export const Container = styled(Shape)<ListItemContainerProps>`
    position: relative;
    overflow: hidden;

    ${({theme, densityScale = 0}) => css`
        min-height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `};
`

export const Content = styled.View`
    position: absolute;
    width: 100%;
    z-index: 1;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `};

    ${({theme}) => css`
        background-color: ${theme.token.scheme.surface};
    `};
`

export const Main = styled.View<ListItemMainProps>`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    ${({theme, densityScale = 0}) => css`
        min-height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
        )}px;

        padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
            ${theme.adaptSize(theme.token.spacing.extraSmall)}px ${theme.adaptSize(theme.token.spacing.extraSmall)}px
            ${theme.adaptSize(theme.token.spacing.medium)}px;
    `}

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
    ${({theme, densityScale = 0}) => css`
        max-height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `};

    ${({supportingTextNumberOfLines = 0, theme, densityScale = 0}) =>
        supportingTextNumberOfLines > 1 &&
        css`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            min-height: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
            )}px;
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

    ${({theme}) => css`
        padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.extraSmall)}px
            ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
    `};
`

export const Trailing = styled(LayoutAnimated)<ListItemTrailingProps>`
    position: relative;

    ${({theme, densityScale = 0}) => css`
        min-height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `};

    ${({supportingTextNumberOfLines = 0, theme, densityScale = 0}) =>
        supportingTextNumberOfLines > 1 &&
        css`
            display: flex;
            justify-content: flex-start;
            min-height: ${theme.adaptSize(
                theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
            )}px;
        `}
`

export const HeadlineText = styled(Typography)`
    ${({theme}) => css`
        color: ${theme.token.scheme.onSurface};
    `}
`

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
