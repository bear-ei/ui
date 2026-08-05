import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useState} from 'react'
import {View} from 'react-native'
import {Button} from '../Button'
import {LayoutAnimated} from './Layout-animated.component'
import type {LayoutAnimatedProps} from './Layout-animated.interface'

const LayoutAnimatedComponent = (props: LayoutAnimatedProps) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <View>
            <View className='h-60 w-80'>
                <LayoutAnimated
                    {...props}
                    visible={isVisible}
                    // unmount={true}
                >
                    <View className='h-60 w-80 bg-red-400' />
                </LayoutAnimated>
            </View>

            <Button onPressOut={() => setIsVisible(!isVisible)} />
        </View>
    )
}

export const Fade: StoryObj<LayoutAnimatedProps> = {
    args: {}
}

export default {
    title: 'components/LayoutAnimated',
    argTypes: {onPress: {action: 'pressed'}},
    component: LayoutAnimatedComponent
} as Meta<typeof LayoutAnimated>
