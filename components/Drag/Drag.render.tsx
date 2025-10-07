import {forwardRef} from 'react'
import {View} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import type {RenderDragProps} from './Drag.interface'

export const RenderDrag = forwardRef<View, RenderDragProps>(
        ({testID, children, id, panGesture, animatedStyle, interactionHandlers, ...containerProps}, ref) => {
                const {onLayout} = interactionHandlers

                return (
                        <View
                                {...containerProps}
                                className='pointer-events-box-none absolute bottom-0 left-0 right-0 top-0 z-[1024] min-h-6 min-w-6'
                                onLayout={onLayout}
                                ref={ref}
                                testID={testID ?? `drag--${id}`}
                        >
                                <GestureDetector gesture={panGesture}>
                                        <Animated.View
                                                className='absolute bottom-0 left-0 right-0 top-0 z-[1024]'
                                                style={[animatedStyle]}
                                                testID={`drag__content--${id}`}
                                        >
                                                {children}
                                        </Animated.View>
                                </GestureDetector>
                        </View>
                )
        }
)

RenderDrag.displayName = 'RenderDrag'
