import {useTheme} from '@/hooks'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Circle, Svg} from 'react-native-svg'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import type {RenderProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
export const RenderProgressActiveIndicatorCircular = forwardRef<View, RenderProgressActiveIndicatorCircularProps>(
        (
                {
                        animatedType = PROGRESS_ANIMATED.INDETERMINATE,
                        circleAnimatedProps,
                        circumference,
                        containerAnimatedStyle,
                        content,
                        id,
                        interactionHandlers,
                        radius,
                        size = 40,
                        strokeWidth,
                        testID,
                        ...containerProps
                },
                ref
        ) => {
                const theme = useTheme()
                const activeIndicatorColor = theme.token.scheme.primary
                const cx = size / 2
                const cy = size / 2
                const trackColor = theme.token.scheme.primaryContainer

                return (
                        <View
                                {...containerProps}
                                {...interactionHandlers}
                                className='pointer-events-none relative flex-1 self-stretch'
                                ref={ref}
                                testID={testID ?? `progressActiveIndicatorCircular--${id}`}
                        >
                                <View
                                        className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
                                        testID={`progressActiveIndicatorCircular__content--${id}`}
                                >
                                        {content}
                                </View>

                                <Animated.View
                                        style={[containerAnimatedStyle]}
                                        testID={`progressActiveIndicatorCircular__animatedMain--${id}`}
                                >
                                        <Svg
                                                fill='none'
                                                testID={`progressActiveIndicatorCircular__svg--${id}`}
                                                viewBox={`0 0 ${size} ${size}`}
                                        >
                                                {animatedType === PROGRESS_ANIMATED.DETERMINATE && (
                                                        <Circle
                                                                cx={cx}
                                                                cy={cy}
                                                                r={radius}
                                                                stroke={trackColor}
                                                                strokeDasharray={circumference}
                                                                strokeDashoffset={0}
                                                                strokeLinecap='round'
                                                                strokeWidth={strokeWidth}
                                                                testID={`progressActiveIndicatorCircular__circle--${id}`}
                                                        />
                                                )}

                                                <AnimatedCircle
                                                        animatedProps={circleAnimatedProps}
                                                        cx={cx}
                                                        cy={cy}
                                                        r={radius}
                                                        stroke={activeIndicatorColor}
                                                        strokeDasharray={circumference}
                                                        strokeLinecap='round'
                                                        strokeWidth={strokeWidth}
                                                        testID={`progressActiveIndicatorCircular__animatedCircle--${id}`}
                                                        transform={[
                                                                {rotate: '180'},
                                                                {rotateX: `${cx}`},
                                                                {rotateY: `${cy}`}
                                                        ]}
                                                />
                                        </Svg>
                                </Animated.View>
                        </View>
                )
        }
)

RenderProgressActiveIndicatorCircular.displayName = 'RenderProgressActiveIndicatorCircular'
