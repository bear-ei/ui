import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

import {useState} from 'react'
import {Pressable} from 'react-native'

import type {UnderlayProps} from './Underlay.interface'

import {EVENT_NAME, type EventName} from '../../constants'
import {Underlay} from './Underlay.component'

const UnderlayComponent = (props: UnderlayProps) => {
	const [interactionEventName, setEventName] = useState<EventName>(EVENT_NAME.NONE)

	return (
		<Pressable
			className='h-20 w-20 bg-[#ececf0]'
			onHoverIn={() => setEventName(EVENT_NAME.HOVER_IN)}
			onHoverOut={() => setEventName(EVENT_NAME.HOVER_OUT)}
			onPressIn={() => setEventName(EVENT_NAME.PRESS_IN)}
			onPressOut={() => setEventName(EVENT_NAME.PRESS_OUT)}
		>
			<Underlay
				{...props}
				interactionEventName={interactionEventName}
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
	argTypes: {onPress: {action: 'pressed'}},
	component: UnderlayComponent,
	title: 'components/Underlay'
} as Meta<typeof Underlay>
