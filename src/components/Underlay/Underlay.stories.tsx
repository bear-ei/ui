import type {Meta, StoryObj} from '@storybook/react'
import {useState} from 'react'
import type {ViewStyle} from 'react-native'
import {Pressable} from 'react-native'
import {EVENT_NAME, type EventName} from '../Common'
import {Underlay} from './Underlay.component'
import type {UnderlayProps} from './Underlay.interface'

const UnderlayComponent = (props: UnderlayProps) => {
	const [eventName, setEventName] = useState<EventName>(EVENT_NAME.NONE)
	const style = {
		height: 80,
		width: 200,
		backgroundColor: '#ececf0'
	} as ViewStyle

	return (
		<Pressable
			onHoverIn={() => setEventName(EVENT_NAME.HOVER_IN)}
			onHoverOut={() => setEventName(EVENT_NAME.HOVER_OUT)}
			onPressIn={() => setEventName(EVENT_NAME.PRESS_IN)}
			onPressOut={() => setEventName(EVENT_NAME.PRESS_OUT)}
			style={[style]}
		>
			<Underlay
				{...props}
				eventName={eventName}
			/>
		</Pressable>
	)
}

export const Hover: StoryObj<UnderlayProps> = {
	args: {
		underlayColor: '#000011'
	}
}

export default {
	title: 'components/Underlay',
	argTypes: {onPress: {action: 'pressed'}},
	component: UnderlayComponent
} as Meta<typeof Underlay>
