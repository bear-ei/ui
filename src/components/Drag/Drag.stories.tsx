import type {Meta} from '@storybook/react-native-web-vite'

import {View} from 'react-native'

import {LAYOUT} from '../../constants'
import {Avatar} from '../Avatar'
import {Drag} from './Drag.component'

export const DragAvatar = () => (
	<View className='h-80 w-80'>
		<Drag>
			<Avatar />
		</Drag>
	</View>
)

export const DragHorizontal = () => (
	<View className='h-20 w-80'>
		<Drag layoutType={LAYOUT.HORIZONTAL}>
			<Avatar />
		</Drag>
	</View>
)

export const DragWithOffset = () => (
	<View className='h-80 w-80'>
		<Drag offset={100}>
			<Avatar />
		</Drag>
	</View>
)

export const DragBounded = () => (
	<View className='h-80 w-80'>
		<Drag
			height={200}
			width={200}
		>
			<Avatar />
		</Drag>
	</View>
)

export default {
	component: Drag,
	title: 'components/Drag'
} as Meta<typeof Drag>
