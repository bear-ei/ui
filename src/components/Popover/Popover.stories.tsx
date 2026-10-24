import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {Circle} from 'lucide-react-native'
import {View} from 'react-native'
import {Text} from 'react-native'

import type {PopoverProps} from './Popover.interface'

import {Button} from '../Button'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {Popover} from './Popover.component'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from './Popover.enum'

export const PlainVerticalEnd = () => (
	<View className='flex h-[800px] w-[800px] items-center justify-center'>
		<Popover
			className='h-8 w-8'
			content='2222222'
			contentPosition={POPOVER_CONTENT_POSITION.VERTICAL_END}
			defaultVisible={true}
		>
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		</Popover>
	</View>
)

export const PlainVerticalStart = () => (
	<View className='flex h-[800px] w-[800px] items-center justify-center'>
		<Popover
			className='h-8 w-8'
			content='2222222'
			contentPosition={POPOVER_CONTENT_POSITION.VERTICAL_START}
			defaultVisible={true}
		>
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		</Popover>
	</View>
)

export const PlainHorizontalStart = () => (
	<View className='flex h-[800px] w-[800px] items-center justify-center'>
		<Popover
			className='h-8 w-8'
			content='Supporting Text'
			contentPosition={POPOVER_CONTENT_POSITION.HORIZONTAL_START}
			defaultVisible={true}
		>
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		</Popover>
	</View>
)

export const PlainHorizontalEnd = () => (
	<View className='flex h-[800px] w-[800px] items-center justify-center'>
		<Popover
			className='h-8 w-8'
			content='Supporting Text'
			contentPosition={POPOVER_CONTENT_POSITION.HORIZONTAL_END}
			defaultVisible={true}
		>
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		</Popover>
	</View>
)

export const Tooltip: StoryObj<PopoverProps> = {
	args: {
		content: 'Tooltip text',
		contentPosition: POPOVER_CONTENT_POSITION.VERTICAL_END,
		defaultVisible: true
	}
}

export const Plain: StoryObj<PopoverProps> = {
	args: {
		content: 'Plain content',
		contentPosition: POPOVER_CONTENT_POSITION.VERTICAL_END,
		defaultVisible: true,
		type: POPOVER_TYPE.PLAIN
	}
}

export const Rich: StoryObj<PopoverProps> = {
	args: {
		content: (
			<View>
				<Text>Rich content</Text>
				<Button labelText='Action' />
			</View>
		),
		contentPosition: POPOVER_CONTENT_POSITION.VERTICAL_END,
		defaultVisible: true,
		type: POPOVER_TYPE.RICH
	}
}

export default {
	argTypes: {onPress: {action: 'pressed'}},
	component: Popover,
	title: 'components/Popover'
} as Meta<typeof Popover>
