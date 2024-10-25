import {Meta, StoryObj} from '@storybook/react'
import {useState} from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'
import {Button} from '../Button'
import {LayoutAnimated} from './Layout-animated.component'
import {LayoutAnimatedProps} from './Layout-animated.interface'

const LayoutAnimatedComponent = (props: LayoutAnimatedProps) => {
        const [visible, setVisible] = useState(false)
        const style = {
                display: 'flex',
                flexDirection: 'column'
        } as StyleProp<ViewStyle>

        const contentStyle = {width: 200, height: 200}
        const innerStyle = {width: 200, height: 200, backgroundColor: 'red'}

        return (
                <View style={[style]}>
                        <View style={contentStyle}>
                                <LayoutAnimated
                                        {...props}
                                        visible={visible}
                                >
                                        <View style={innerStyle} />
                                </LayoutAnimated>
                        </View>

                        <Button onPressOut={() => setVisible(!visible)} />
                </View>
        )
}

export const Visible: StoryObj<LayoutAnimatedProps> = {
        args: {}
}

export default {
        title: 'components/LayoutAnimated',
        argTypes: {onPress: {action: 'pressed'}},
        component: LayoutAnimatedComponent
} as Meta<typeof LayoutAnimated>
