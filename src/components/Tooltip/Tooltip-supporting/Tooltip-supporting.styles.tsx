import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {TooltipType} from '../'
import {Shape, Typography} from '../../Common'
import {
    SupportingPosition,
    TooltipSupportingContentProps,
    TooltipSupportingMainProps
} from './Tooltip-supporting.interface'

export const Container = styled.View<TooltipSupportingContentProps>`
    ${({width = 0, zIndex = 8208}) => css`
        width: ${width}px;
        z-index: ${zIndex};
    `}

    ${({closed, theme}) =>
        closed &&
        css`
            height: ${theme.adaptSize(theme.token.spacing.none)}px;
            overflow: hidden;
        `}

    ${({
        containerHeight = 0,
        containerPageX = 0,
        containerPageY = 0,
        containerWidth = 0,
        height = 0,
        supportingPosition: position = 'verticalStart',
        theme,
        type = 'plain',
        width = 0
    }) => {
        const supportingPosition = {
            plain: {
                verticalStart: css`
                    left: ${containerPageX + containerWidth / 2}px;
                    top: ${containerPageY - height - theme.adaptSize(theme.token.spacing.extraSmall)}px;
                `,
                verticalEnd: css`
                    left: ${containerPageX + containerWidth / 2}px;
                    top: ${containerPageY + containerHeight + theme.adaptSize(theme.token.spacing.extraSmall)}px;
                `,
                horizontalStart: css`
                    left: ${containerPageX - width - theme.adaptSize(theme.token.spacing.extraSmall)}px;
                    top: ${containerPageY + containerHeight / 2}px;
                `,
                horizontalEnd: css`
                    left: ${containerPageX + containerWidth + theme.adaptSize(theme.token.spacing.extraSmall)}px;
                    top: ${containerPageY + containerHeight / 2}px;
                `
            },
            menu: {
                verticalStart: css`
                    /* left: ${containerPageX + containerWidth}px;
                    top: ${containerPageY - height - theme.adaptSize(theme.token.spacing.extraSmall)}px; */
                `,
                verticalEnd: css`
                    left: ${containerPageX}px;
                    top: ${containerPageY + containerHeight + theme.adaptSize(theme.token.spacing.extraSmall)}px;
                `,
                horizontalStart: css`
                    /* left: ${containerPageX - width - theme.adaptSize(theme.token.spacing.extraSmall)}px;
                    top: ${containerPageY + containerHeight}px; */
                `,
                horizontalEnd: css`
                    /* left: ${containerPageX + containerWidth + theme.adaptSize(theme.token.spacing.extraSmall)}px;
                    top: ${containerPageY + containerHeight}px; */
                `
            }
        } as Record<TooltipType, Record<SupportingPosition, RuleSet<object> | undefined>>

        return supportingPosition[type]?.[position]
    }}
    
    ${({theme}) => {
        const containerOS = {
            ios: css`
                position: absolute;
            `,
            web: css`
                position: fixed;
            `,
            macos: css`
                position: absolute;
            `,
            android: css`
                position: absolute;
            `,
            windows: css`
                position: absolute;
            `
        }

        return containerOS[theme.OS]
    }}
`

export const TouchableContent = styled.Pressable`
    flex: 1;
    align-self: stretch;
    outline-style: none;
`

export const Content = styled.View`
    flex: 1;
    align-self: stretch;
`

export const Main = styled(Shape)<TooltipSupportingMainProps>`
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;

    ${({theme, type = 'plain'}) => {
        const contentType = {
            plain: css`
                background-color: ${theme.token.scheme.inverseSurface};
                min-height: ${theme.adaptSize(theme.token.spacing.large)}px;
                padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
                    ${theme.adaptSize(theme.token.spacing.small)}px;
            `,
            menu: css``,
            rich: css``
        }

        return contentType[type]
    }}

    ${({supportingPosition: position = 'verticalStart'}) => {
        const supportingPosition = {
            verticalStart: css`
                transform-origin: bottom;
            `,
            verticalEnd: css`
                transform-origin: top;
            `,
            horizontalStart: css`
                transform-origin: right;
            `,
            horizontalEnd: css`
                transform-origin: left;
            `
        }

        return supportingPosition[position]
    }}
`

export const Supporting = styled.View``
export const TooltipSupportingText = styled(Typography)`
    text-align: center;
    user-select: none;

    ${({theme}) => css`
        color: ${theme.token.scheme.inverseOnSurface};
    `}
`
