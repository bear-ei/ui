import {AnimatedView} from '@/components/Animated-component'
import {classesName, platformValue, shapeClasses} from '@/utils'
import {SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {View, type ViewStyle} from 'react-native'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'

export const RenderTouchableRipple = forwardRef<View, RenderTouchableRippleProps>(
        (
                {
                        containerAnimatedStyle,
                        id,
                        interactionHandlers,
                        locationX = 0,
                        locationY = 0,
                        size = 0,
                        style,
                        testID,
                        underlayColor,
                        ...containerProps
                },
                ref
        ) => (
                <AnimatedView
                        {...containerProps}
                        {...interactionHandlers}
                        className={classesName(
                                'pointer-events-none absolute bg-[--color-on-surface]',
                                shapeClasses(SHAPE.FULL)
                        )}
                        ref={ref}
                        style={[
                                style,
                                {...(underlayColor && {backgroundColor: underlayColor})},
                                {
                                        height: platformValue(size),
                                        left: platformValue(locationX),
                                        top: platformValue(locationY),
                                        width: platformValue(size)
                                } as ViewStyle,
                                containerAnimatedStyle
                        ]}
                        testID={testID ?? `touchableRipple--${id}`}
                />
        )
)

RenderTouchableRipple.displayName = 'RenderTouchableRipple'
