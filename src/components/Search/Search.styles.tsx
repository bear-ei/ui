import {css} from 'styled-components'
import styled from 'styled-components/native'
import {Shape} from '../Common'
import {SearchContentProps} from './Search.interface'

export const Container = styled.View`
        align-self: stretch;
        position: relative;
        z-index: 4096;

        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
        `};
`

export const Touchable = styled.Pressable`
        cursor: text;
        outline-style: none;
`

export const Content = styled(Shape)<SearchContentProps>`
        align-items: center;
        align-self: stretch;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        z-index: 4;

        ${({theme}) => css`
                background-color: ${theme.token.scheme.surfaceContainerHigh};
                gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                height: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                padding: ${theme.adaptSize(theme.token.spacing.none)}px
                        ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `};

        ${({theme, trailingShow}) =>
                !trailingShow &&
                css`
                        padding-right: ${theme.adaptSize(theme.token.spacing.extraSmall * 14)}px;
                `};
`

export const Main = styled.View`
        align-self: stretch;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        z-index: 4;
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

export const TextInputLayout = styled.View`
        ${({theme}) => css`
                height: ${theme.adaptSize(theme.token.typography.body.large.lineHeight)}px;
                padding-top: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
        `};
`

export const TextInput = styled.TextInput`
        align-self: stretch;
        flex: 1;

        ${({theme}) => css`
                color: ${theme.token.scheme.onSurface};
        `};

        ${({theme, secureTextEntry}) =>
                /**
                 * Using secureTextEntry props in macOS with text-related styles on the
                 * input box will cause the enableFocusRing setting to be invalidated.
                 * It is uncertain whether this is a bug in react-native-macos or a
                 * native bug. As a temporary workaround, if you use secureTextEntry in
                 * macos, it does not provide text styles.
                 */
                !secureTextEntry &&
                css`
                        font-size: ${theme.adaptFontSize(theme.token.typography.body.large.size)}px;
                        font-style: ${theme.token.typography.body.large.style};
                        font-weight: ${theme.token.typography.body.large.weight};
                        letter-spacing: ${theme.adaptSize(theme.token.typography.body.large.letterSpacing)}px;
                        padding: ${theme.token.spacing.none}px;
                `}
`

export const Trailing = styled(Leading)``
