import styled, {css} from 'styled-components/native'
import {Shape, Typography} from '../Common'
import {
    TextFieldControlProps,
    TextFieldHeaderProps,
    TextFieldLabelProps,
    TextFieldMainProps
} from './Text-field.interface'

export const Container = styled.View``
export const Content = styled.View`
    display: flex;
    flex-direction: column;

    ${({theme}) => css`
        gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `}
`

export const TouchableHeader = styled.Pressable`
    cursor: text;
`

export const Header = styled(Shape)<TextFieldHeaderProps>`
    align-items: center;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 1;

    ${({theme, densityScale = 0}) => css`
        min-height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 14 + densityScale * theme.token.spacing.extraSmall
        )}px;

        padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px ${theme.adaptSize(theme.token.spacing.none)}px;
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

export const Label = styled.View<TextFieldLabelProps>`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 2;

    ${({theme}) => css`
        left: ${theme.adaptSize(theme.token.spacing.medium)}px;
        top: ${theme.adaptSize(theme.token.spacing.medium)}px;
    `}

    ${({theme, leadingShow}) =>
        leadingShow &&
        css`
            left: ${theme.adaptSize(theme.token.spacing.extraSmall * 12 + 1 * theme.token.spacing.extraSmall)}px;
        `}
`

export const LabelText = styled(Typography)``
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
export const Main = styled.View<TextFieldMainProps>`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-end;
    z-index: 1;

    ${({theme, densityScale = 0}) => css`
        min-height: ${theme.adaptSize(
            theme.token.spacing.extraSmall * 12 + densityScale * theme.token.spacing.extraSmall
        )}px;

        padding: ${theme.adaptSize(theme.token.spacing.large + -1 * theme.token.spacing.extraSmall)}px
            ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};

    ${({theme, contentShow}) =>
        contentShow &&
        css`
            padding-bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        `};
`

export const Control = styled.View<TextFieldControlProps>`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;

    ${({theme}) => css`
        min-height: ${theme.adaptSize(theme.token.typography.body.large.lineHeight)}px;
        padding-top: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
    `};

    ${({multiline, theme, height = 0}) =>
        multiline &&
        css`
            min-height: ${theme.adaptSize(theme.token.typography.body.large.lineHeight)}px;
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
    ${({theme, secureTextEntry}) =>
        !secureTextEntry &&
        css`
            align-self: stretch;
            flex: 1;
            font-size: ${theme.adaptFontSize(theme.token.typography.body.large.size)}px;
            font-style: ${theme.token.typography.body.large.style};
            font-weight: ${theme.token.typography.body.large.weight};
            letter-spacing: ${theme.adaptSize(theme.token.typography.body.large.letterSpacing)}px;
            padding: ${theme.adaptSize(theme.token.spacing.none)}px;
            text-align: left;
        `};
`

export const SupportingText = styled(Typography)`
    ${({theme}) => css`
        padding: ${theme.adaptSize(theme.token.spacing.none)}px ${theme.adaptSize(theme.token.spacing.medium)}px;
    `}
`

export const ActiveIndicator = styled.View`
    position: absolute;
    z-index: 2;

    ${({theme}) => css`
        bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
    `}
`
