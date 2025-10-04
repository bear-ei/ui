import type {Meta, StoryObj} from '@storybook/react'
import {View} from 'react-native'
import {Avatar} from './Avatar.component'

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	decorators: [
		Story => (
			<View className='flex-1 items-start'>
				<Story />
			</View>
		)
	]
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Primary: Story = {}
