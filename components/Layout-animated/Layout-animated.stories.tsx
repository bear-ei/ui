import type {Meta, StoryObj} from '@storybook/react'
import {useState} from 'react'
import type {ViewStyle} from 'react-native'
import {View} from 'react-native'
// import {Button} from '../Button'
import {LayoutAnimated} from './Layout-animated.component'
import type {LayoutAnimatedProps} from './Layout-animated.interface'

const LayoutAnimatedComponent = (props: LayoutAnimatedProps) => {
        const [isVisible, setIsVisible] = useState(false)
        const style = {
                display: 'flex',
                flexDirection: 'column'
        } as ViewStyle

        const contentStyle = {width: 200, height: 200}
        const innerStyle = {width: 200, height: 200, backgroundColor: 'red'}

        return (
                <View style={[style]}>
                        <View style={contentStyle}>
                                <LayoutAnimated
                                        {...props}
                                        visible={isVisible}
                                        unmount={true}
                                >
                                        <View style={innerStyle} />
                                </LayoutAnimated>
                        </View>

                        {/* <Button onPressOut={() => setIsVisible(!isVisible)} /> */}
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
