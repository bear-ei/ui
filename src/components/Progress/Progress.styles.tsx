import {RuleSet} from 'styled-components'
import styled, {css} from 'styled-components/native'
import {ProgressType} from './Progress.enum'
import {ProgressContainerProps} from './Progress.interface'

export const Container = styled.View<ProgressContainerProps>`
	align-self: stretch;
	display: flex;
	flex-direction: column;

	${({theme, type = ProgressType.LINEAR, size}) => {
		const containerType = {
			[ProgressType.LINEAR]: css`
				height: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
				min-width: ${theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
			`,
			[ProgressType.CIRCULAR]: css`
				height: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
				width: ${size ?? theme.adaptSize(theme.token.spacing.extraSmall * 12)}px;
			`
		} as Record<ProgressType, RuleSet<object> | undefined>

		return containerType[type]
	}}

	${({theme, progressing, type}) =>
		progressing &&
		type === ProgressType.LINEAR &&
		css`
			gap: ${theme.adaptSize(theme.token.spacing.extraSmall)}px;
		`};
`
