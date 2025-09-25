import type {Meta} from '@storybook/react'
import {View, type ViewStyle} from 'react-native'
import {Avatar} from '../Avatar'
import {Drag} from './Drag.component'

export const NoneContent = () => {
	const containerStyle = {
		width: 800,
		height: 800
	} as ViewStyle

	return (
		<View style={containerStyle}>
			<Drag>
				<View style={containerStyle}>
					<Avatar />
				</View>
			</Drag>
		</View>
	)
}

export default {
	component: Drag,
	title: 'components/Drag'
} as Meta<typeof Drag>
