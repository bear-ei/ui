import {Meta, StoryObj} from '@storybook/react'
import {View, ViewStyle} from 'react-native'
import {Touchable} from './Touchable.component'
import {TouchableProps} from './Touchable.interface'

const TouchableComponent = (props: TouchableProps) => {
        const style = {
                display: 'flex',
                height: 300,
                width: 300,
                flexDirection: 'row'
        } as ViewStyle

        return (
                <View style={style}>
                        <Touchable {...props} />
                </View>
        )
}

const childrenStyle = {
        height: 300,
        width: 300,
        backgroundColor: '#F9F9F8'
} as ViewStyle

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
