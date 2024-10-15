import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {SkeletonElementContainerProps} from './Skeleton-element.interface'

export const Container = styled(Shape)<SkeletonElementContainerProps>`
    display: flex;

    ${({theme, showChildren}) => css`
        background-color: ${theme.token.palette.convertHexToRGBA(theme.token.scheme.onSurface)(
            showChildren ? 0 : 0.12
        )};

        gap: ${theme.adaptSize(theme.token.spacing.small)}px;
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
    `}

    ${({containerLayout = 'horizontal'}) =>
        containerLayout === 'horizontal' ?
            css`
                flex-direction: row;
                align-items: center;
            `
        :   css`
                flex-direction: column;
                justify-content: center;
            `}


    ${({width}) =>
        typeof width === 'number' &&
        css`
            min-width: ${width}px;
            width: ${width}px;
        `}


    ${({height}) =>
        typeof height === 'number' &&
        css`
            height: ${height}px;
            min-height: ${height}px;
        `}
`
