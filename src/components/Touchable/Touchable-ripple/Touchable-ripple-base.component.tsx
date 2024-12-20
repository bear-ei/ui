import {forwardRef, useId} from 'react'
import {NativeTouchEvent, View} from 'react-native'
import {TouchableRippleBaseProps, TouchableRippleProps} from './Touchable-ripple.interface'
import {useTouchableRippleAnimated} from './use-touchable-ripple-animated.hook'

export const handleTouchableRipplePropsEqual = (prevProps: TouchableRippleProps) => {
        const {index: prevIndex} = prevProps

        return (nextProps: TouchableRippleProps) => {
                const {index: nextIndex} = nextProps

                return ![prevIndex !== nextIndex].some(Boolean)
        }
}

export const TouchableRippleBase = forwardRef<View, TouchableRippleBaseProps>(
        (
                {
                        centered,
                        containerLayout,
                        index,
                        onAnimatedFinished,
                        render,
                        touchableLocation = {} as Pick<NativeTouchEvent, 'locationX' | 'locationY'>,
                        underlayColor,
                        ...renderProps
                },
                ref
        ) => {
                const {width = 0, height = 0} = containerLayout ?? {}
                const centerX = width / 2
                const centerY = height / 2
                const {locationX = 0, locationY = 0} =
                        centered ? {locationX: centerX, locationY: centerY} : touchableLocation

                const id = useId()
                const offsetX = Math.abs(centerX - locationX)
                const offsetY = Math.abs(centerY - locationY)
                const radius = Math.sqrt(Math.pow(centerX + offsetX, 2) + Math.pow(centerY + offsetY, 2))
                const diameter = radius * 2
                const {containerAnimatedStyle} = useTouchableRippleAnimated({
                        index,
                        onAnimatedFinished,
                        radius
                })

                return render({
                        ...renderProps,
                        containerAnimatedStyle,
                        height: diameter,
                        id,
                        locationX,
                        locationY,
                        ref,
                        underlayColor,
                        width: diameter
                })
        }
)
