import {classesName, platformValue} from '@/utils'
import {forwardRef} from 'react'
import {Platform, Pressable, View, type ViewStyle} from 'react-native'
import type {RenderPopoverLayoutProps} from './Popover-pressable-layout.interface'

export const RenderPopoverPressableLayout = forwardRef<View, RenderPopoverLayoutProps>(
        ({containerLayout, id, ...pressableProps}, ref) => {
                const {
                        height: containerHeight = 0,
                        width: containerWidth = 0,
                        x: containerX = 0,
                        y: containerY = 0
                } = containerLayout ?? {}

                const layoutStyle = {
                        height: platformValue(containerHeight),
                        left: platformValue(containerX),
                        top: platformValue(containerY),
                        width: platformValue(containerWidth)
                } as ViewStyle

                return (
                        <Pressable
                                {...pressableProps}
                                ref={ref}
                                className={classesName('z-50 min-h-6', {
                                        ['absolute']: Platform.OS !== 'web',
                                        ['fixed']: Platform.OS === 'web'
                                })}
                                style={[layoutStyle]}
                                testID={`popover__pressableLayout--${id}`}
                        />
                )
        }
)

RenderPopoverPressableLayout.displayName = 'RenderPopoverPressableLayout'
