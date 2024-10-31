import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../../Common'
import {SheetType} from '../Side-sheet.interface'
import {SheetContainerProps, SheetHeaderProps, SheetViewContentProps} from './Side-sheet-content.interface'

export const Container = styled.View<SheetContainerProps>`
        align-self: stretch;
        display: flex;
        flex-direction: row;
        flex: 1;
        overflow: hidden;

        ${({sheetPosition = 'horizontalEnd', type}) => {
                const contentPosition = {
                        horizontalStart: css`
                                justify-content: flex-start;
                        `,
                        horizontalEnd: css`
                                justify-content: flex-end;
                        `
                }

                return type === 'modal' && contentPosition[sheetPosition]
        }}
`

export const Content = styled(Shape)<SheetViewContentProps>`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 160)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 80)}px;
        `}

        ${({theme, type = 'standard'}) => {
                const contentType = {
                        standard: css`
                                background-color: ${theme.token.scheme.surface};
                        `,
                        modal: css`
                                background-color: ${theme.token.scheme.surfaceContainerLow};
                        `,
                        standardContainer: css`
                                background-color: ${theme.token.scheme.surfaceContainerLow};
                        `
                } as Record<SheetType, RuleSet<object> | undefined>

                return contentType[type]
        }}
`

export const Header = styled.View<SheetHeaderProps>`
        align-self: stretch;
        display: flex;
        flex-direction: row;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 18)}px;
                padding: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px
                        ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px
                        ${theme.adaptSize(theme.token.spacing.medium)}px
                        ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}

        ${({theme, leadingShow}) =>
                !leadingShow &&
                css`
                        padding-left: ${theme.adaptSize(theme.token.spacing.large)}px;
                `}


        ${({theme, trailingShow}) =>
                !trailingShow &&
                css`
                        padding-right: ${theme.adaptSize(theme.token.spacing.large)}px;
                `}
`

export const HeadlineContainer = styled.View`
        flex: 1;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
                padding-top: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px;
        `}
`

export const HeaderText = styled(Typography)`
        ${({theme}) => css`
                color: ${theme.token.scheme.onSurfaceVariant};
        `}
`

export const Leading = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Trailing = styled(Leading)``
export const Main = styled.View`
        align-self: stretch;
        flex: 1;
`

export const PrimaryButton = styled.View`
        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 23)}px;
        `}
`

export const SecondaryButton = styled.View`
        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 26)}px;
        `}
`

export const FooterContainer = styled.View`
        overflow: hidden;
`

export const Footer = styled.View`
        align-self: stretch;
        display: flex;
        flex-direction: row;

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.small)}px;
                padding: ${theme.adaptSize(theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall)}px
                        ${theme.adaptSize(theme.token.spacing.large)}px
                        ${theme.adaptSize(theme.token.spacing.large + -1 * theme.token.spacing.extraSmall)}px;
        `}
`
