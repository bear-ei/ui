import {classesName, platformValue} from '@/utils'
import {forwardRef, type FC} from 'react'
import {Platform, Pressable, View, type ViewStyle} from 'react-native'
import type {RenderPopoverLayoutProps, RenderPopoverProps} from './Popover.interface'

export const RenderPopover = forwardRef<View, RenderPopoverProps>(
        ({children, className, id, testID, ...containerProps}, ref) => (
                <View
                        {...containerProps}
                        className={classesName('relative flex flex-col', className)}
                        ref={ref}
                        testID={testID ?? `popover--${id}`}
                >
                        {children}
                </View>
        )
)

export const RenderPopoverPressableLayout: FC<RenderPopoverLayoutProps> = ({
        containerLayout,
        id,
        ...pressableProps
}) => {
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
                        className={classesName('z-50 min-h-6', {
                                ['absolute']: Platform.OS !== 'web',
                                ['fixed']: Platform.OS === 'web'
                        })}
                        style={[layoutStyle]}
                        testID={`popover__pressableLayout--${id}`}
                />
        )
}

RenderPopover.displayName = 'RenderPopover'
