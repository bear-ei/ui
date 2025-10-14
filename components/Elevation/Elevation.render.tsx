import {shapeClasses} from '@/utils'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderElevationProps} from './Elevation.interface'

export const RenderElevation = forwardRef<View, RenderElevationProps>(
        ({id, shadowAnimatedStyle, shape, testID, ...containerProps}, ref) => (
                <View
                        {...containerProps}
                        className='absolute bottom-0 left-0 right-0 top-0 -z-20 flex flex-col items-center justify-center bg-transparent'
                        ref={ref}
                        testID={testID ?? `elevation--${id}`}
                >
                        <Animated.View
                                className={clsx('flex-1 self-stretch', shapeClasses(shape))}
                                style={[shadowAnimatedStyle]}
                                testID={`elevation__shadow--${id}`}
                        />
                </View>
        )
)

RenderElevation.displayName = 'RenderElevation'
