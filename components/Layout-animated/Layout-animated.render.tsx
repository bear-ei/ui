import {clsx} from 'clsx'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'

export const RenderLayoutAnimated = forwardRef<View, RenderLayoutAnimatedProps>(
        (
                {children, containerAnimatedStyle, id, interactionHandlers, style, testID, visible, ...containerProps},
                ref
        ) => {
                const {onLayout} = interactionHandlers

                return (
                        <Animated.View
                                {...containerProps}
                                className={clsx('flex flex-col', {['pointer-events-none -z-[4096]']: !visible})}
                                onLayout={onLayout}
                                ref={ref}
                                style={[style, containerAnimatedStyle]}
                                testID={testID ?? `layoutAnimated--${id}`}
                        >
                                {children}
                        </Animated.View>
                )
        }
)

RenderLayoutAnimated.displayName = 'RenderLayoutAnimated'
