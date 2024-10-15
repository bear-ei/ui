import styled, {css} from 'styled-components/native'
import {SkeletonContainerProps} from './Skeleton.interface'

export const Container = styled.View<SkeletonContainerProps>`
    display: flex;

    ${({theme}) => css`
        min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
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
