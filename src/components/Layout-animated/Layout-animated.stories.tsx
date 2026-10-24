import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {useState} from 'react'
import {View} from 'react-native'

import type {LayoutAnimatedProps} from './Layout-animated.interface'

import {Button} from '../Button'
import {LayoutAnimated} from './Layout-animated.component'
import {LAYOUT_ANIMATION} from './Layout-animated.enum'

const LayoutAnimatedComponent = (props: LayoutAnimatedProps) => {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<View>
			<View className='h-60 w-80'>
				<LayoutAnimated
					{...props}
					unmountOnHide={true}
					visible={isVisible}
				>
					<View className='h-60 w-80 bg-red-400' />
				</LayoutAnimated>
			</View>

			<Button onPressOut={() => setIsVisible(!isVisible)} />
		</View>
	)
}

export const Fade: StoryObj<LayoutAnimatedProps> = {
	args: {}
}

export const CollapseX: StoryObj<LayoutAnimatedProps> = {
	args: {animation: LAYOUT_ANIMATION.COLLAPSE_X, contentSize: 200}
}

export const CollapseYTranslate: StoryObj<LayoutAnimatedProps> = {
	args: {animation: LAYOUT_ANIMATION.COLLAPSE_Y, contentSize: 200, translateOnCollapse: false}
}

export const Scale: StoryObj<LayoutAnimatedProps> = {
	args: {animation: LAYOUT_ANIMATION.SCALE}
}

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: LayoutAnimatedComponent,
	title: 'components/LayoutAnimated'
} as Meta<typeof LayoutAnimated>
