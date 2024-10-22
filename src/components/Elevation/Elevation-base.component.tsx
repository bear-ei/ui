import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {ElevationBaseProps} from './Elevation.interface'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
    ({defaultLevel, level, render, ...renderProps}, ref) => {
        const id = useId()
        const elevationLevel = level ?? defaultLevel
        const {shadowAnimatedStyle} = useElevationAnimated({
            level: elevationLevel
        })

        return render({
            ...renderProps,
            id,
            level: elevationLevel,
            ref,
            shadowAnimatedStyle
        })
    }
)
