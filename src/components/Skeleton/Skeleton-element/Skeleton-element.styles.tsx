import styled, {css} from 'styled-components/native'
import {Shape} from '../../Common'
import {SkeletonElementContainerProps} from './Skeleton-element.interface'

export const Container = styled(Shape)<SkeletonElementContainerProps>`
        display: flex;

        ${({theme, showChildren}) => css`
                background-color: ${theme.token.palette.hexToRGBA(theme.token.scheme.onSurface)(
                        showChildren ? theme.token.opacity.level0 : theme.token.opacity.level2
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
                :       css`
                                flex-direction: column;
                                justify-content: center;
                        `}
`
