import {shapeClasses} from '@/constants'
import {SHAPE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cssInterop} from 'nativewind'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'

cssInterop(Animated.View, {className: 'style'})

export const RenderTouchableRipple = forwardRef<View, RenderTouchableRippleProps>(
        (
                {
                        containerAnimatedStyle,
                        id,
                        interactionHandlers,
                        locationX,
                        locationY,
                        size,
                        style,
                        testID,
                        underlayColor,
                        ...containerProps
                },
                ref
        ) => {
                const containerStyle = [
                        style,
                        {
                                ...(underlayColor && {backgroundColor: underlayColor}),
                                height: size,
                                left: locationX,
                                top: locationY,
                                width: size
                        },
                        containerAnimatedStyle
                ]

                return (
                        <Animated.View
                                {...containerProps}
                                {...interactionHandlers}
                                className={clsx(
                                        'pointer-events-none absolute bg-[--color-on-surface]',
                                        shapeClasses(SHAPE.FULL)
                                )}
                                ref={ref}
                                style={containerStyle}
                                testID={testID ?? `touchableRipple--${id}`}
                        />
                )
        }
)

RenderTouchableRipple.displayName = 'RenderTouchableRipple'
