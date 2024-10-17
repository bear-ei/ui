import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {TooltipType} from '../'
import {Shape, Typography} from '../../Common'
import {
    SupportingPosition,
    TooltipSupportingContainerProps,
    TooltipSupportingContentProps
} from './Tooltip-supporting.interface'

export const Container = styled.View<TooltipSupportingContainerProps>`
    z-index: 16384;

    ${({width = 0, height = 0}) => css`
        height: ${height}px;
        width: ${width}px;
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

        console.info(containerPageX, containerPageY)

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
    position: absolute;

    ${({theme}) => css`
        left: ${theme.adaptSize(theme.token.spacing.none)}px;
        right: ${theme.adaptSize(theme.token.spacing.none)}px;
        top: ${theme.adaptSize(theme.token.spacing.none)}px;
    `}
`

export const Content = styled(Shape)<TooltipSupportingContentProps>`
    overflow: hidden;

    ${({theme, type = 'plain'}) => {
        const contentType = {
            plain: css`
                background-color: ${theme.token.scheme.inverseSurface};
                min-height: ${theme.adaptSize(theme.token.spacing.large)}px;
                padding: ${theme.adaptSize(theme.token.spacing.extraSmall)}px
                    ${theme.adaptSize(theme.token.spacing.small)}px;
            `,
            rich: css``,
            menu: css``
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

export const TooltipSupportingText = styled(Typography)`
    text-align: center;
    user-select: none;

    ${({theme}) => css`
        color: ${theme.token.scheme.inverseOnSurface};
    `}
`
