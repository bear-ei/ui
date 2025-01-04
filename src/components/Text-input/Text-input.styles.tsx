import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'
import {
        TextInputControlProps,
        TextInputHeaderProps,
        TextInputLabelProps,
        TextInputMainProps,
        TextInputTouchableHeaderProps
} from './Text-input.interface'

export const Container = styled.View``
export const Content = styled.View`
        display: flex;
        flex-direction: column;

        ${({theme}) => css`
                gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}
`

export const TouchableHeader = styled.Pressable<TextInputTouchableHeaderProps>`
        cursor: text;
        outline-style: none;
`

export const Header = styled(Shape)<TextInputHeaderProps>`
        align-items: center;
        display: flex;
        flex-direction: row;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
                        ${theme.adaptSize(theme.token.spacing.none)}px;

                gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `}

        ${({theme, leadingShow}) =>
                !leadingShow &&
                css`
                        padding-left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                `}

    ${({theme, trailingShow}) =>
                !trailingShow &&
                css`
                        padding-right: ${theme.adaptSize(theme.token.spacing.medium)}px;
                `}
`

export const Label = styled.View<TextInputLabelProps>`
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 8;

        ${({theme}) => css`
                left: ${theme.adaptSize(theme.token.spacing.medium)}px;
                top: ${theme.adaptSize(theme.token.spacing.medium)}px;
        `}

        ${({theme, leadingShow}) =>
                leadingShow &&
                css`
                        left: ${theme.adaptSize(
                                theme.token.spacing.extraSmall * 12 + 1 * theme.token.spacing.extraSmall
                        )}px;
                `}
`

export const LabelText = styled(Typography)`
        min-height: auto;
`

export const Leading = styled.View`
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}
`

export const Trailing = styled(Leading)``
export const Main = styled.View<TextInputMainProps>`
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: flex-end;
        z-index: 4;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
                padding: ${theme.adaptSize(theme.token.spacing.large + -1 * theme.token.spacing.extraSmall)}px
                        ${theme.adaptSize(theme.token.spacing.none)}px
                        ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `};

        ${({theme, contentShow}) =>
                contentShow &&
                css`
                        flex-direction: row;
                        flex-wrap: wrap;
                        gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
                                ${theme.adaptSize(theme.token.spacing.small)}px;

                        justify-content: flex-start;
                        padding: ${theme.adaptSize(theme.token.spacing.large + -1 * theme.token.spacing.extraSmall)}px
                                ${theme.adaptSize(theme.token.spacing.none)}px
                                ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                `};
`

export const Control = styled.View<TextInputControlProps>`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;

        ${({theme}) => css`
                max-height: ${theme.adaptSize(theme.token.spacing.large)}px;
                min-height: ${theme.adaptSize(theme.token.typography.body.large.lineHeight)}px;
                min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 15)}px;
                padding-top: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `};

        ${({multiline, height = 0}) =>
                multiline &&
                css`
                        min-height: ${height}px;
                `};
`

/**
 * Using secureTextEntry props in macOS with text-related styles on the input box will cause the
 * enableFocusRing setting to be invalidated. It is uncertain whether this is a bug in
 * react-native-macos or a native bug. As a temporary workaround, if you use secureTextEntry
 * in macos, it does not provide text styles.
 */
export const Input = styled.TextInput`
        outline-style: none;
        text-align: left;

        ${({theme, secureTextEntry}) =>
                !secureTextEntry &&
                css`
                        align-self: stretch;
                        flex: 1;
                        font-size: ${theme.adaptFontSize(theme.token.typography.body.large.size)}px;
                        font-style: ${theme.token.typography.body.large.style};
                        font-weight: ${theme.token.typography.body.large.weight};
                        height: ${theme.adaptFontSize(theme.token.typography.body.large.lineHeight)}px;
                        letter-spacing: ${theme.adaptSize(theme.token.typography.body.large.letterSpacing)}px;
                        padding: ${theme.adaptSize(theme.token.spacing.none)}px;
                `};
`

export const Supporting = styled(LayoutAnimated)`
        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.medium)}px;
        `}
`

export const SupportingText = styled(Typography)`
        ${({theme}) => css`
                padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
        `}
`

export const ActiveIndicator = styled.View`
        position: absolute;
        transform-origin: 'bottom';
        z-index: 8;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                height: ${theme.adaptSize(theme.token.spacing.extraSmall - 1)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};
`
