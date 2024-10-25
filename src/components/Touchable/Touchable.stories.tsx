import {Meta, StoryObj} from '@storybook/react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Touchable} from './Touchable.component'
import {TouchableProps} from './Touchable.interface'

const TouchableComponent = (props: TouchableProps) => {
        const style = {
                display: 'flex',
                height: 300,
                width: 300,
                flexDirection: 'row'
        } as StyleProp<ViewStyle>

        return (
                <View style={style}>
                        <Touchable {...props} />
                </View>
        )
}

const childrenStyle = {
        height: 300,
        width: 300,
        backgroundColor: '#0e0000'
} as StyleProp<ViewStyle>

export const Ripple: StoryObj<TouchableProps> = {
        args: {
                children: <View style={[childrenStyle]} />
        }
}

export default {
        title: 'components/Touchable',
        argTypes: {onPress: {action: 'pressed'}},
        component: TouchableComponent
} as Meta<typeof Touchable>
