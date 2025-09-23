import type {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {LAYOUT, type LayoutType} from '../Common'
import type {FormContainerProps} from './Form.interface'

export const Container = styled.View<FormContainerProps>`
	display: flex;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 10)}px;
	`}

	${({layoutType = LAYOUT.VERTICAL, theme}) => {
		const containerLayout = {
			[LAYOUT.HORIZONTAL]: css`
				flex-direction: row;
				gap: ${theme.adaptSize(theme.token.spacing.medium)}px;
			`,

			[LAYOUT.VERTICAL]: css`
				flex-direction: column;
				gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
			`
		} as Record<LayoutType, RuleSet<object> | undefined>

		return containerLayout[layoutType]
	}}
`
