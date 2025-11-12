import {clsx} from 'clsx'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {AnimatedView} from '../Animated-component'
import type {RenderLayoutAnimatedProps} from './Layout-animated.interface'

export const RenderLayoutAnimated = forwardRef<View, RenderLayoutAnimatedProps>(
        (
                {
                        children,
                        className,
                        containerAnimatedStyle,
                        id,
                        interactionHandlers,
                        style,
                        testID,
                        visible,
                        ...containerProps
                },
                ref
        ) => {
                const {onLayout} = interactionHandlers

                return (
                        <AnimatedView
                                {...containerProps}
                                className={clsx('flex flex-col', {['pointer-events-none -z-40']: !visible}, className)}
                                onLayout={onLayout}
                                ref={ref}
                                style={[style, containerAnimatedStyle]}
                                testID={testID ?? `layoutAnimated--${id}`}
                        >
                                {children}
                        </AnimatedView>
                )
        }
)

RenderLayoutAnimated.displayName = 'RenderLayoutAnimated'
