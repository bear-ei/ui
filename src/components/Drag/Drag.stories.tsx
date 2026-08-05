import type {Meta} from '@storybook/react-native-web-vite'
import {View} from 'react-native'
import {Avatar} from '../Avatar'
import {Drag} from './Drag.component'

export const DragAvatar = () => (
    <View className='h-80 w-80'>
        <Drag>
            <View className='h-80 w-80'>
                <Avatar />
            </View>
        </Drag>
    </View>
)

export default {
    component: Drag,
    title: 'components/Drag'
} as Meta<typeof Drag>
