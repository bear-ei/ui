import {Elevation} from '@/components/Elevation'
import {Mask} from '@/components/Mask'
import {MenuProps} from '@/components/Menu'
import {shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import React, {cloneElement, forwardRef, isValidElement} from 'react'
import {Platform, Pressable, Text, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import {getSafeMenuPosition} from './Tooltip-supporting.handler'
import type {RenderTooltipSupportingProps} from './Tooltip-supporting.interface'

export const RenderTooltipSupporting = forwardRef<View, RenderTooltipSupportingProps>(
        (
                {
                        containerLayout,
                        contentAnimatedStyle,
                        elevation,
                        height = 0,
                        id,
                        interactionHandlers,
                        menuPosition,
                        onMaskPressOut,
                        shape = SHAPE.EXTRA_SMALL,
                        supporting,
                        supportingPosition = SUPPORTING_POSITION.VERTICAL_START,
                        testID,
                        type,
                        visible,
                        width = 0,
                        windowHeight = 0,
                        windowWidth = 0,
                        ...containerProps
                },
                ref
        ) => {
                const {onLayout, ...mainInteractionHandlers} = interactionHandlers
                const theme = useTheme()
                const {
                        height: containerHeight = 0,
                        width: containerWidth = 0,
                        x: containerX = 0,
                        y: containerY = 0
                } = containerLayout ?? {}

                const position = {
                        [SUPPORTING_POSITION.VERTICAL_START]: () => {
                                const x = containerX - (width - containerWidth) / 2
                                const y = containerY - height - theme.token.spacing.extraSmall
                                const {left} = getSafeMenuPosition({
                                        height,
                                        margin: theme.token.spacing.medium,
                                        width,
                                        windowHeight,
                                        windowWidth,
                                        x,
                                        y
                                })

                                return {left, top: y}
                        },
                        [SUPPORTING_POSITION.VERTICAL_END]: () => {
                                const x = containerX - (width - containerWidth) / 2
                                const y = containerY + containerHeight + theme.token.spacing.extraSmall
                                const {left} = getSafeMenuPosition({
                                        height,
                                        margin: theme.token.spacing.medium,
                                        width,
                                        windowHeight,
                                        windowWidth,
                                        x,
                                        y
                                })

                                return {left, top: y}
                        },
                        [SUPPORTING_POSITION.HORIZONTAL_START]: () => {
                                const x = containerX - width - theme.token.spacing.extraSmall
                                const y = containerY - (height - containerHeight) / 2
                                const {top} = getSafeMenuPosition({
                                        height,
                                        margin: theme.token.spacing.medium,
                                        width,
                                        windowHeight,
                                        windowWidth,
                                        x,
                                        y
                                })

                                return {left: x, top}
                        },
                        [SUPPORTING_POSITION.HORIZONTAL_END]: () => {
                                const x = containerX + containerWidth + theme.token.spacing.extraSmall
                                const y = containerY - (height - containerHeight) / 2
                                const {top} = getSafeMenuPosition({
                                        height,
                                        margin: theme.token.spacing.medium,
                                        width,
                                        windowHeight,
                                        windowWidth,
                                        x,
                                        y
                                })

                                return {left: x, top}
                        }
                }

                const mainElement = (
                        <View
                                {...(type === TOOLTIP_TYPE.PLAIN && {onLayout})}
                                className={clsx(
                                        'absolute bottom-0 top-0 overflow-hidden',
                                        {
                                                ['m-h-6 bg-[--color-inverse-surface] pb-1 pl-2 pr-2 pt-1']:
                                                        type === TOOLTIP_TYPE.PLAIN
                                        },
                                        shapeClasses(shape)
                                )}
                                testID={`tooltipSupporting__main--${id}`}
                        >
                                {isValidElement(supporting) ?
                                        <View
                                                {...(type === TOOLTIP_TYPE.MENU && {onLayout})}
                                                testID={`tooltipSupporting__supporting--${id}`}
                                        >
                                                {type === TOOLTIP_TYPE.MENU ?
                                                        cloneElement<MenuProps>(
                                                                supporting as React.ReactElement<
                                                                        MenuProps,
                                                                        string | React.JSXElementConstructor<unknown>
                                                                >,
                                                                {...mainInteractionHandlers, visible}
                                                        )
                                                :       supporting}
                                        </View>
                                :       <Text
                                                ellipsizeMode='tail'
                                                numberOfLines={1}
                                                testID={`tooltipSupporting__supportingText--${id}`}
                                                className={clsx(
                                                        'select-none text-center',
                                                        typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)(
                                                                'color-[--color-inverse-on-surface]'
                                                        )
                                                )}
                                        >
                                                {supporting}
                                        </Text>
                                }
                        </View>
                )

                return (
                        <>
                                <Animated.View
                                        {...containerProps}
                                        ref={ref}
                                        className={clsx('z-50 min-h-6', {
                                                ['absolute']: Platform.OS !== 'web',
                                                ['fixed']: Platform.OS === 'web'
                                        })}
                                        style={[
                                                {
                                                        height,
                                                        width,
                                                        ...(type === TOOLTIP_TYPE.PLAIN ?
                                                                position[supportingPosition]()
                                                        :       {
                                                                        left: menuPosition.left ?? 0,
                                                                        top: menuPosition.top ?? 0
                                                                })
                                                },
                                                contentAnimatedStyle
                                        ]}
                                        testID={testID ?? `tooltipSupporting__supporting--${id}`}
                                >
                                        {type === TOOLTIP_TYPE.MENU ?
                                                <View
                                                        className='relative flex-1 self-stretch'
                                                        testID={`tooltipSupporting_content--${id}`}
                                                >
                                                        {mainElement}
                                                </View>
                                        :       <Pressable
                                                        {...mainInteractionHandlers}
                                                        className='relative flex-1 self-stretch outline-none'
                                                        testID={`tooltipSupporting_content--${id}`}
                                                >
                                                        {mainElement}
                                                </Pressable>
                                        }

                                        {elevation && (
                                                <Elevation
                                                        level={elevation}
                                                        shape={shape}
                                                        testID={`tooltipSupporting_elevation--${id}`}
                                                />
                                        )}
                                </Animated.View>

                                {type === TOOLTIP_TYPE.MENU && (
                                        <Mask
                                                backgroundColor={theme.token.scheme.scrim}
                                                onPressOut={onMaskPressOut}
                                                opacity={theme.token.opacity.level0}
                                                // style={[{position: 'fixed'}]}
                                                testID={`tooltip__mask--${id}`}
                                                visible={visible}
                                        />
                                )}
                        </>
                )
        }
)

RenderTooltipSupporting.displayName = 'RenderTooltipSupporting'
