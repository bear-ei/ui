import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {View} from 'react-native'
import {Touchable} from './Touchable.component'
import type {TouchableProps} from './Touchable.interface'

const TouchableComponent = (props: TouchableProps) => (
	<View className='flex h-80 w-80 flex-row'>
		<Touchable {...props} />
	</View>
)

export const Ripple: StoryObj<TouchableProps> = {
	args: {
		children: <View className='h-80 w-80 bg-[#F9F9F8]' />
	}
}

export default {
	title: 'components/Touchable',
	argTypes: {onPress: {action: 'pressed'}},
	component: TouchableComponent
} as Meta<typeof Touchable>
