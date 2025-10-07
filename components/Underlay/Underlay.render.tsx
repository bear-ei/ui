import {shapeClasses} from '@/constants'
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
                                'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-[4] flex flex-col items-center justify-center overflow-hidden',
                                shapeClasses(shape)
                        )}
                        testID={testID ?? `underlay--${id}`}
                >
                        <Animated.View
                                className='absolute bottom-0 left-0 right-0 top-0 z-[8]'
                                style={[
                                        {...(underlayColor && {backgroundColor: underlayColor})},
                                        hoverLayerAnimatedStyle
                                ]}
                                testID={`underlay__hoverLayer--${id}`}
                        />

                        {typeof active === 'boolean' && activeColor && (
                                <Animated.View
                                        className='absolute bottom-0 left-0 right-0 top-0 z-[4]'
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
