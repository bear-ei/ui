import {Meta, StoryObj} from '@storybook/react'
import {useState} from 'react'
import {Pressable, StyleProp, ViewStyle} from 'react-native'
import {EventName} from '../Common'
import {Underlay} from './Underlay.component'
import {UnderlayProps} from './Underlay.interface'

const UnderlayComponent = (props: UnderlayProps) => {
    const [eventName, setEventName] = useState<EventName>('none')
    const style = {
        height: 80,
        width: 200,
        backgroundColor: '#ececf0'
    } as StyleProp<ViewStyle>

    return (
        <Pressable
            onHoverIn={() => setEventName('hoverIn')}
            onHoverOut={() => setEventName('hoverOut')}
            onPressIn={() => setEventName('pressIn')}
            onPressOut={() => setEventName('pressOut')}
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
