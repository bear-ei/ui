import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {LayoutType} from '../Common'
import {FormContainerProps} from './Form.interface'

export const Container = styled.View<FormContainerProps>`
        display: flex;

        ${({theme}) => css`
                min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
        `}

        ${({layout = LayoutType.VERTICAL, theme}) => {
                const containerLayout = {
                        [LayoutType.HORIZONTAL]: css`
                                flex-direction: row;
                                gap: ${theme.adaptSize(theme.token.spacing.medium)}px;
                        `,

                        [LayoutType.VERTICAL]: css`
                                flex-direction: column;
                                gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
                        `
                } as Record<LayoutType, RuleSet<object> | undefined>

                return containerLayout[layout]
        }}
`
