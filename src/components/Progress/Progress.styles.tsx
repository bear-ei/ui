import type {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {PROGRESS_TYPE} from './Progress.enum'
import type {ProgressContainerProps, ProgressType} from './Progress.interface'

export const Container = styled.View<ProgressContainerProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;
	pointer-events: none;

	${({theme, type = PROGRESS_TYPE.LINEAR, size}) => {
		const containerType = {
			[PROGRESS_TYPE.LINEAR]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
			`,
			[PROGRESS_TYPE.CIRCULAR]: css`
				height: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
				width: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
			`
		} as Record<ProgressType, RuleSet<object> | undefined>

		return containerType[type]
	}}

	${({theme, progressing, type}) =>
		progressing &&
		type === PROGRESS_TYPE.LINEAR &&
		css`
			gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
		`};
`
