import type {Meta} from '@storybook/react'
import {View, type ViewStyle} from 'react-native'
import {Button} from '../Button'
import {Drag} from './Drag.component'

export const NoneContent = () => {
	const containerStyle = {
		width: 24,
		height: 24
	} as ViewStyle

	return (
		<View style={containerStyle}>
			<Drag>
				<Button />
			</Drag>
		</View>
	)
}

export default {
	component: Drag,
	title: 'components/Drag'
} as Meta<typeof Drag>
