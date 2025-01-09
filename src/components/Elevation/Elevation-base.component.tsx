import {forwardRef, useMemo} from 'react'
import {View} from 'react-native'
import {ElevationBaseProps} from './Elevation.interface'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
        ({defaultLevel, level, render, ...renderProps}, ref) => {
                const elevationLevel = useMemo(() => level ?? defaultLevel, [defaultLevel, level])
                const {shadowAnimatedStyle} = useElevationAnimated({level: elevationLevel})

                return render({...renderProps, level: elevationLevel, ref, shadowAnimatedStyle})
        }
)
