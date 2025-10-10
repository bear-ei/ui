import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {Meta} from '@storybook/react'
import {View} from 'react-native'
import {ICON_BUTTON_TYPE, IconButton} from '../Icon-button'
import {SUPPORTING_POSITION} from './Tooltip-supporting'
import {Tooltip} from './Tooltip.component'

export const PlainVerticalEnd = () => (
        <View className='flex h-[800px] w-[800px] items-center justify-center'>
                <Tooltip
                        className='h-10 w-10'
                        defaultVisible={true}
                        supporting='2222222'
                        supportingPosition={SUPPORTING_POSITION.VERTICAL_END}
                >
                        <IconButton
                                icon={<MaterialIcons name='circle' />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                </Tooltip>
        </View>
)

export const PlainVerticalStart = () => (
        <View className='flex h-[800px] w-[800px] items-center justify-center'>
                <Tooltip
                        className='h-10 w-10'
                        defaultVisible={true}
                        supporting='2222222'
                        supportingPosition={SUPPORTING_POSITION.VERTICAL_START}
                >
                        <IconButton
                                icon={<MaterialIcons name='circle' />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                </Tooltip>
        </View>
)

export const PlainHorizontalStart = () => (
        <View className='flex h-[800px] w-[800px] items-center justify-center'>
                <Tooltip
                        defaultVisible={true}
                        supporting='Supporting Text'
                        supportingPosition={SUPPORTING_POSITION.HORIZONTAL_START}
                        className='h-10 w-10'
                        delay={2000}
                >
                        <IconButton
                                icon={<MaterialIcons name='circle' />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                </Tooltip>
        </View>
)

export const PlainHorizontalEnd = () => (
        <View className='flex h-[800px] w-[800px] items-center justify-center'>
                <Tooltip
                        defaultVisible={true}
                        supporting='Supporting Text'
                        supportingPosition={SUPPORTING_POSITION.HORIZONTAL_END}
                        className='h-10 w-10'
                >
                        <IconButton
                                icon={<MaterialIcons name='circle' />}
                                type={ICON_BUTTON_TYPE.STANDARD}
                        />
                </Tooltip>
        </View>
)

export default {
        title: 'components/Tooltip',
        argTypes: {onPress: {action: 'pressed'}},
        component: Tooltip
} as Meta<typeof Tooltip>
