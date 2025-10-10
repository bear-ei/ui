import {typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {Pressable, View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {PressableType} from '../../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'

export const RenderNavigationRailItem = forwardRef<PressableType, RenderNavigationRailItemProps>(
        (
                {
                        accessibilityLabel,
                        active,
                        contentAnimatedStyle,
                        eventName,
                        iconElement,
                        id,
                        interactionHandlers,
                        labelText,
                        labelTextAnimatedStyle,
                        testID,
                        type,
                        ...touchableProps
                },
                ref
        ) => {
                const theme = useTheme()
                const activeAnimatedType =
                        type === NAVIGATION_RAIL_TYPE.BLOCK ? ACTIVE_ANIMATED.SCALE : ACTIVE_ANIMATED.SCALE_X

                const activeColor = theme.token.scheme.secondaryContainer
                const shape = type === NAVIGATION_RAIL_TYPE.BLOCK ? SHAPE.FULL : SHAPE.LARGE
                const underlayColor = theme.token.scheme.onSurface

                return (
                        <View
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='tab'
                                accessible={true}
                                className='overflow-hidden'
                                tabIndex={-1}
                                testID={testID ?? `navigationRailItem--${id}`}
                        >
                                <Pressable
                                        {...touchableProps}
                                        {...interactionHandlers}
                                        className='flex h-14 w-20 flex-col items-center justify-center outline-none'
                                        ref={ref}
                                        testID={`navigationRailItem__touchable--${id}`}
                                >
                                        <Animated.View
                                                {...(type !== NAVIGATION_RAIL_TYPE.BLOCK && {
                                                        style: [contentAnimatedStyle]
                                                })}
                                                className='flex flex-col items-center justify-center'
                                                testID={`navigationRailItem__content--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'pointer-events-none relative z-10 flex w-14 flex-col items-center justify-center',
                                                                {
                                                                        ['h-14']: type === NAVIGATION_RAIL_TYPE.BLOCK,
                                                                        ['h-8']: type !== NAVIGATION_RAIL_TYPE.BLOCK
                                                                }
                                                        )}
                                                        testID={`navigationRailItem__header--${id}`}
                                                >
                                                        <View
                                                                className='h-6 w-6 overflow-hidden'
                                                                testID={`navigationRailItem__iconLayout--${id}`}
                                                        >
                                                                {iconElement}
                                                        </View>

                                                        <Underlay
                                                                active={active}
                                                                activeAnimatedType={activeAnimatedType}
                                                                activeColor={activeColor}
                                                                activeShape={SHAPE.FULL}
                                                                eventName={eventName}
                                                                shape={shape}
                                                                testID={`navigationRailItem__underlay--${id}`}
                                                                underlayColor={underlayColor}
                                                        />
                                                </View>

                                                {type === NAVIGATION_RAIL_TYPE.SEGMENT && (
                                                        <View
                                                                testID={`navigationRailItem__label--${id}`}
                                                                className='flex h-6 flex-col justify-center self-stretch'
                                                        >
                                                                <Animated.Text
                                                                        className={clsx(
                                                                                'select-none text-center font-bold',
                                                                                {
                                                                                        ['font-bold']: active,
                                                                                        ['font-normal']: !active
                                                                                },
                                                                                typographyClasses(TYPOGRAPHY.LABEL)(
                                                                                        TYPOGRAPHY_SIZE.MEDIUM
                                                                                )()
                                                                        )}
                                                                        ellipsizeMode='tail'
                                                                        numberOfLines={1}
                                                                        style={[labelTextAnimatedStyle]}
                                                                        testID={`navigationRailItem__animatedLabelText--${id}`}
                                                                >
                                                                        {labelText}
                                                                </Animated.Text>
                                                        </View>
                                                )}
                                        </Animated.View>
                                </Pressable>
                        </View>
                )
        }
)

RenderNavigationRailItem.displayName = 'RenderNavigationRailItem'
