import {shapeClasses} from '@/utils'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderUnderlayProps} from './Underlay.interface'

export const RenderUnderlay = forwardRef<View, RenderUnderlayProps>(
        (
                {
                        active,
                        activeColor,
                        activeLayerAnimatedStyle,
                        activeShape,
                        hoverLayerAnimatedStyle,
                        id,
                        interactionHandlers,
                        shape,
                        testID,
                        underlayColor,
                        ...containerProps
                },
                ref
        ) => (
                <View
                        {...containerProps}
                        {...interactionHandlers}
                        ref={ref}
                        className={clsx(
                                'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10 flex flex-col items-center justify-center overflow-hidden',
                                shapeClasses(shape)
                        )}
                        testID={testID ?? `underlay--${id}`}
                >
                        <Animated.View
                                className='absolute bottom-0 left-0 right-0 top-0 z-20'
                                style={[
                                        {...(underlayColor && {backgroundColor: underlayColor})},
                                        hoverLayerAnimatedStyle
                                ]}
                                testID={`underlay__hoverLayer--${id}`}
                        />

                        {typeof active === 'boolean' && activeColor && (
                                <Animated.View
                                        className={clsx(
                                                'absolute bottom-0 left-0 right-0 top-0 z-10',
                                                shapeClasses(activeShape ?? shape)
                                        )}
                                        style={[
                                                {...(activeColor && {backgroundColor: activeColor})},
                                                activeLayerAnimatedStyle
                                        ]}
                                        testID={`underlay__activeLayer--${id}`}
                                />
                        )}
                </View>
        )
)

RenderUnderlay.displayName = 'RenderUnderlay'
