import {classesName, shapeClasses} from '@/utils'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {AnimatedView} from '../Animated-component'
import type {RenderElevationProps} from './Elevation.interface'

export const RenderElevation = forwardRef<View, RenderElevationProps>(
    ({id, shadowAnimatedStyle, shape, testID, className, ...containerProps}, ref) => (
        <View
            {...containerProps}
            className={classesName(
                'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-20 flex flex-col items-center justify-center bg-transparent',
                className
            )}
            ref={ref}
            testID={testID ?? `elevation--${id}`}
        >
            <AnimatedView
                className={classesName('flex-1 self-stretch', shapeClasses(shape))}
                style={[shadowAnimatedStyle]}
                testID={`elevation__shadow--${id}`}
            />
        </View>
    )
)

RenderElevation.displayName = 'RenderElevation'
