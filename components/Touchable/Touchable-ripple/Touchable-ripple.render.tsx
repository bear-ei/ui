import {shapeClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {SHAPE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderTouchableRippleProps} from './Touchable-ripple.interface'

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
                const theme = useTheme()
                const containerStyle = [
                        style,
                        {
                                ...(underlayColor && {backgroundColor: underlayColor}),
                                height: size,
                                left: locationY,
                                top: locationX,
                                width: size
                        },
                        containerAnimatedStyle
                ]

                console.info(containerStyle)

                return (
                        <Animated.View
                                {...containerProps}
                                {...interactionHandlers}
                                className={clsx(
                                        'pointer-events-none absolute bg-[--color-primary-container]',
                                        // theme.token.opacity.level2.classes,
                                        shapeClasses(SHAPE.FULL)
                                )}
                                ref={ref}
                                // style={containerStyle}
                                testID={testID ?? `touchableRipple--${id}`}
                        />
                )
        }
)

RenderTouchableRipple.displayName = 'RenderTouchableRipple'
