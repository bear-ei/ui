import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'
import {Mask} from './Mask.component'
import type {MaskProps} from './Mask.interface'
import {Button} from '../Button'

const MaskComponent = (props: MaskProps) => {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<View>
			<View className='h-60 w-80'>
				<Mask
					{...props}
					visible={isVisible}
					unmount={true}
				/>
			</View>

			<Button onPressOut={() => setIsVisible(!isVisible)} />
		</View>
	)
}

export const Fade: StoryObj<MaskProps> = {
	args: {}
}

export default {
	title: 'components/Mask',
	argTypes: {onPress: {action: 'pressed'}},
	component: MaskComponent
} as Meta<typeof Mask>
