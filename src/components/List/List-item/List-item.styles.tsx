import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {DensityScale, Shape, Typography} from '../../Common'
import {LayoutAnimated} from '../../Layout-animated'
import {ListType} from '../List.enum'
import {
        ListItemContainerProps,
        ListItemLeadingProps,
        ListItemMainInnerProps,
        ListItemMainProps,
        ListItemTrailingProps
} from './List-item.interface'

export const Container = styled(Shape)<ListItemContainerProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
        position: relative;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Content = styled.View<ListItemContainerProps>`
        position: absolute;
        width: 100%;
        z-index: 4;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};

        ${({theme, type = ListType.STANDARD}) => {
                const contentType = {
                        [ListType.MENU]: css`
                                background-color: ${theme.token.scheme.surfaceContainer};
                        `,
                        [ListType.STANDARD]: css`
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

        ${({theme, type = ListType.STANDARD, density}) => {
                const densityScale = DensityScale[density ?? theme.density] * theme.token.spacing.extraSmall
                const mainType = {
                        [ListType.MENU]: css`
                                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)}px;
                                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                                        ${theme.adaptSize(
                                                theme.token.spacing.medium - theme.token.spacing.extraSmall
                                        )}px;
                        `,
                        [ListType.STANDARD]: css`
                                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}px;
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

        ${({theme, type = ListType.STANDARD, leadingShow}) => {
                const mainInnerType = {
                        [ListType.MENU]: css`
                                padding-left: ${theme.adaptSize(
                                        theme.token.spacing.medium - theme.token.spacing.extraSmall
                                )}px;
                        `,
                        [ListType.STANDARD]: css`
                                padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `
                } as Record<ListType, RuleSet<object> | undefined>

                if (leadingShow) {
                        return mainInnerType[type]
                }
        }}


        ${({theme, type = ListType.STANDARD, trailingShow}) => {
                const mainInnerType = {
                        [ListType.MENU]: css`
                                padding-right: ${theme.adaptSize(theme.token.spacing.small)}px;
                        `,
                        [ListType.STANDARD]: css`
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

export const TrailingLayoutAnimated = styled(LayoutAnimated)<ListItemTrailingProps>`
        display: flex;
        flex-direction: column;

        ${({supportingTextNumberOfLines = 0}) =>
                supportingTextNumberOfLines > 1 &&
                css`
                        justify-content: flex-start;
                `}

        ${({theme, trailingShow, type = ListType.STANDARD}) =>
                trailingShow &&
                [ListType.MENU].includes(type) &&
                css`
                        margin-right: ${-theme.adaptSize(
                                theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall
                        )}px;
                `}
                
        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const HeadlineText = styled(Typography)``
export const SupportingText = styled(Typography)`
        height: auto;

        ${({theme}) => css`
                color: ${theme.token.scheme.onSurfaceVariant};
        `}
`

export const BeforeAffordanceLayout = styled.View`
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
`

export const AfterAffordanceLayout = styled(BeforeAffordanceLayout)`
        align-self: flex-end;
`

export const DividerLayout = styled.View`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                height: ${theme.adaptSize(theme.token.spacing.extraSmall / 4)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                z-index: 8;
        `};
`
