import {shapeClasses} from '@/constants'
import {pxToRem, SHAPE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Platform, View, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
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
                <Animated.View
                        {...containerProps}
                        {...interactionHandlers}
                        className={clsx(
                                'pointer-events-none absolute bg-[--color-on-surface]',
                                shapeClasses(SHAPE.FULL)
                        )}
                        ref={ref}
                        style={[
                                style,
                                Platform.select({
                                        web: {
                                                height: `${pxToRem()(size)}rem`,
                                                left: `${pxToRem()(locationX)}rem`,
                                                top: `${pxToRem()(locationY)}rem`,
                                                width: `${pxToRem()(size)}rem`
                                        },
                                        default: {height: size, left: locationX, top: locationY, width: size}
                                }) as ViewStyle,
                                {...(underlayColor && {backgroundColor: underlayColor})},
                                containerAnimatedStyle
                        ]}
                        testID={testID ?? `touchableRipple--${id}`}
                />
        )
)

RenderTouchableRipple.displayName = 'RenderTouchableRipple'
