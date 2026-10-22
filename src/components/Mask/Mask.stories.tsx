import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {useState} from 'react'
import {View} from 'react-native'

import type {MaskProps} from './Mask.interface'

import {Button} from '../Button'
import {Mask} from './Mask.component'

const MaskComponent = (props: MaskProps) => {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<View>
			<View className='h-60 w-80'>
				<Mask
					{...props}
					unmount={true}
					visible={isVisible}
				/>
			</View>

			<Button onPressOut={() => setIsVisible(!isVisible)} />
		</View>
	)
}

export const CustomBackground: StoryObj<MaskProps> = {
	args: {
		backgroundColor: '#000000',
		opacity: 0.5
	}
}

export const Fade: StoryObj<MaskProps> = {
	args: {}
}

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: MaskComponent,
	title: 'components/Mask'
} as Meta<typeof Mask>
