import {shapeClasses} from '@/utils'
import {SHAPE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorLinearProps} from './Progress-active-indicator-linear.interface'

export const RenderProgressActiveIndicatorLinear = forwardRef<View, RenderProgressActiveIndicatorLinearProps>(
        ({animatedType, contentAnimatedStyle, id, interactionHandlers, testID, ...containerProps}, ref) => {
                const shape = SHAPE.SMALL

                return (
                        <View
                                {...interactionHandlers}
                                className={clsx(
                                        'relative flex flex-1 flex-row self-stretch overflow-hidden',
                                        shapeClasses(shape)
                                )}
                                ref={ref}
                                testID={testID ?? `progressActiveIndicatorLinear--${id}`}
                        >
                                <Animated.View
                                        {...containerProps}
                                        className={clsx(
                                                'pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 origin-left bg-[--color-primary]',
                                                shapeClasses(shape)
                                        )}
                                        style={[contentAnimatedStyle]}
                                        testID={`progressActiveIndicatorLinear__animatedContent--${id}`}
                                />

                                <Animated.View
                                        className={clsx(
                                                'h-1 flex-1 self-stretch bg-[--color-primary-container]',
                                                shapeClasses(shape)
                                        )}
                                        testID={`progressActiveIndicatorLinear__track--${id}`}
                                />

                                {animatedType === PROGRESS_ANIMATED.DETERMINATE && (
                                        <Animated.View
                                                className={clsx(
                                                        'absolute right-0 top-0 z-10 h-1 w-1 bg-[--color-primary]',
                                                        shapeClasses(shape)
                                                )}
                                                testID={`progressActiveIndicatorLinear__stop--${id}`}
                                        />
                                )}
                        </View>
                )
        }
)

RenderProgressActiveIndicatorLinear.displayName = 'RenderProgressActiveIndicatorLinear'
