import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {ElevationBaseProps} from './Elevation.interface'
import {RenderElevation} from './Elevation.render'
import {useElevationAnimated} from './use-elevation-animated.hook'

export const ElevationBase = forwardRef<View, ElevationBaseProps>(
        ({defaultLevel, level, onAnimationFinished, ...renderElevationProps}, ref) => {
                const id = useId()
                const elevationLevel = level ?? defaultLevel
                const {shadowAnimatedStyle} = useElevationAnimated({level: elevationLevel, onAnimationFinished})

                return (
                        <RenderElevation
                                {...renderElevationProps}
                                id={id}
                                level={elevationLevel}
                                ref={ref}
                                shadowAnimatedStyle={shadowAnimatedStyle}
                        />
                )
        }
)

ElevationBase.displayName = 'ElevationBase'
