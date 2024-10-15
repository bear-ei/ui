import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {ChipContainerProps, ChipContentProps, ChipMainProps, ChipType} from './Chip.interface'

export const Container = styled.View<ChipContainerProps>`
    align-self: flex-start;
    cursor: pointer;

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
        )}px;

        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 8)}px;
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 15)}px;
    `}

    ${({horizontalStretch}) =>
        horizontalStretch &&
        css`
            align-self: stretch;
        `}
`

export const Content = styled(Shape)<ChipContentProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;
    z-index: 1;

    ${({theme}) => css`
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 15)}px;
    `}

    ${({theme, densityScale = 0}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 8 + densityScale * theme.token.spacing.extraSmall
        )}px;
    `}
`

export const ContentUnderlay = styled(Shape)`
    position: absolute;
    z-index: -1;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `}
`

export const Main = styled.View<ChipMainProps>`
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
    z-index: 1;

    ${({theme}) => css`
        padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
    `}

    ${({theme}) => css`
        gap: ${theme.adaptSize(theme.token.spacing.small)}px;
    `}

    ${({theme, type = 'assist'}) => {
        const contentType = {
            input: css`
                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                    ${theme.adaptSize(theme.token.spacing.extraSmall * 3)}px;
            `
        } as Record<ChipType, RuleSet<object> | undefined>

        return contentType[type]
    }}

    

    ${({leadingIconShow, theme}) =>
        leadingIconShow &&
        css`
            padding-left: ${theme.adaptSize(theme.token.spacing.small)}px;
        `}

    ${({trailingIconShow, theme}) =>
        trailingIconShow &&
        css`
            padding-right: ${theme.adaptSize(theme.token.spacing.small)}px;
        `}

    ${({avatarShow, theme}) =>
        avatarShow &&
        css`
            padding-left: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}
`

export const LabelText = styled(Typography)`
    text-align: center;
    user-select: none;
`

export const IconContainer = styled.View`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;

    ${({theme}) => css`
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 6 + -1.5 * theme.adaptSize(theme.token.spacing.extraSmall)
        )}px;
    `}
`

export const AvatarContainer = styled.View`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    ${({theme}) => css`
        height: ${theme.adaptSize(theme.token.spacing.large)}px;
        width: ${theme.adaptSize(theme.token.spacing.large)}px;
    `}
`

export const FilterIcon = styled.View`
    overflow: hidden;
    position: absolute;

    ${({theme}) => css`
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 6 + -1.5 * theme.adaptSize(theme.token.spacing.extraSmall)
        )}px;
    `}
`
