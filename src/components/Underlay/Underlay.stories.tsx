import {EVENT_NAME, type EventName} from '@/constants'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {Pressable} from 'react-native'
import {Underlay} from './Underlay.component'
import type {UnderlayProps} from './Underlay.interface'

const UnderlayComponent = (props: UnderlayProps) => {
        const [eventName, setEventName] = useState<EventName>(EVENT_NAME.NONE)

        return (
                <Pressable
                        onHoverIn={() => setEventName(EVENT_NAME.HOVER_IN)}
                        onHoverOut={() => setEventName(EVENT_NAME.HOVER_OUT)}
                        onPressIn={() => setEventName(EVENT_NAME.PRESS_IN)}
                        onPressOut={() => setEventName(EVENT_NAME.PRESS_OUT)}
                        className='h-20 w-20 bg-[#ececf0]'
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
