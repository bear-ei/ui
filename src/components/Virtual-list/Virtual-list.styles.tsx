import styled, {css} from 'styled-components/native'
import {Typography} from '../Common'
import {LayoutAnimated} from '../Layout-animated'

export const Container = styled.View`
	align-self: stretch;
	flex: 1;

	${({theme}) => css`
		min-height: ${theme.adaptSize(theme.token.spacing.extraSmall * 40)}px;
	`}
`

export const Content = styled.View`
	position: relative;
	flex: 1;
`

export const ContentLayout = styled(LayoutAnimated)`
	flex: 1;
	position: relative;
`

export const EmptyContentLayout = styled(LayoutAnimated)`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;

	${({theme}) => css`
		bottom: ${theme.adaptSize(theme.token.spacing.none)}px;
		left: ${theme.adaptSize(theme.token.spacing.none)}px;
		right: ${theme.adaptSize(theme.token.spacing.none)}px;
		top: ${theme.adaptSize(theme.token.spacing.none)}px;
	`}
`

export const LoadingContentLayout = styled(EmptyContentLayout)``
export const SupportingText = styled(Typography)``
