import type {Meta} from '@storybook/react-native-web-vite'
import {Circle} from 'lucide-react-native'
import {View} from 'react-native'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {Popover} from './Popover.component'
import {POPOVER_CONTENT_POSITION} from './Popover.enum'

export const PlainVerticalEnd = () => (
	<View className='flex h-[800px] w-[800px] items-center justify-center'>
		<Popover
			className='h-10 w-10'
			content='2222222'
			defaultVisible={true}
			popoverContentPosition={POPOVER_CONTENT_POSITION.VERTICAL_END}
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
			className='h-10 w-10'
			content='2222222'
			defaultVisible={true}
			popoverContentPosition={POPOVER_CONTENT_POSITION.VERTICAL_START}
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
			className='h-10 w-10'
			content='Supporting Text'
			defaultVisible={true}
			delay={2000}
			popoverContentPosition={POPOVER_CONTENT_POSITION.HORIZONTAL_START}
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
			className='h-10 w-10'
			content='Supporting Text'
			defaultVisible={true}
			popoverContentPosition={POPOVER_CONTENT_POSITION.HORIZONTAL_END}
		>
			<IconButton
				icon={<Circle />}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		</Popover>
	</View>
)

export default {
	title: 'components/Popover',
	argTypes: {onPress: {action: 'pressed'}},
	component: Popover
} as Meta<typeof Popover>
