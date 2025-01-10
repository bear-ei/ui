import styled, {css} from 'styled-components/native'
import {LayoutAnimated} from '../Layout-animated'
import {SkeletonContainerProps} from './Skeleton.interface'

export const SkeletonContainer = styled.View<SkeletonContainerProps>`
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
                :       css`
                                flex-direction: column;
                                justify-content: center;
                        `}
`

export const ContentItemLayout = styled(LayoutAnimated)`
        position: absolute;

        ${({theme}) => css`
                bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
                left: ${theme.adaptSize(theme.token.spacing.none)}px;
                right: ${theme.adaptSize(theme.token.spacing.none)}px;
                top: ${theme.adaptSize(theme.token.spacing.none)}px;
        `}
`

export const ContentItem = styled.View``
