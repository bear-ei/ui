import {Elevation} from '@/components/Elevation'
import {LAYOUT_ANIMATED, LayoutAnimated} from '@/components/Layout-animated'
import {Mask} from '@/components/Mask'
import type {MenuProps} from '@/components/Menu'
import {useTheme} from '@/hooks'
import {classesName, platformValue, shapeClasses, typographyClasses} from '@/utils'
import {SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import React, {cloneElement, forwardRef, isValidElement} from 'react'
import {Platform, Pressable, Text, View, type ViewStyle} from 'react-native'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE, type PopoverType} from '..'
import {getSafeMenuPosition} from './Popover-content.handler'
import type {RenderPopoverContentProps} from './Popover-content.interface'

export const RenderPopoverContent = forwardRef<View, RenderPopoverContentProps>(
        (
                {
                        containerLayout,
                        content,
                        elevation,
                        height = 0,
                        id,
                        interactionHandlers,
                        menuPosition,
                        onMaskPressOut,
                        popoverContentPosition = POPOVER_CONTENT_POSITION.VERTICAL_START,
                        shape = SHAPE.EXTRA_SMALL,
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

                const isMenuOrPicker =
                        type &&
                        (
                                [POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
                        ).includes(type)

                const position = {
                        [POPOVER_CONTENT_POSITION.VERTICAL_START]: () => {
                                const x = containerX - (width - containerWidth) / 2
                                const y =
                                        containerY -
                                        height -
                                        (type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
                                                theme.token.spacing.none
                                        :       theme.token.spacing.extraSmall)

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
                        [POPOVER_CONTENT_POSITION.VERTICAL_END]: () => {
                                const x = containerX - (width - containerWidth) / 2
                                const y =
                                        containerY +
                                        containerHeight +
                                        (type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
                                                theme.token.spacing.none
                                        :       theme.token.spacing.extraSmall)

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
                        [POPOVER_CONTENT_POSITION.HORIZONTAL_START]: () => {
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
                        [POPOVER_CONTENT_POSITION.HORIZONTAL_END]: () => {
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

                const contentPosition = position[popoverContentPosition]()

                const contentStyle = {
                        height: platformValue(height),
                        width: platformValue(width),
                        ...(type === POPOVER_TYPE.CONTEXT_MENU ?
                                {
                                        left: platformValue(menuPosition.left ?? theme.token.spacing.none),
                                        top: platformValue(menuPosition.top ?? theme.token.spacing.none)
                                }
                        :       {left: platformValue(contentPosition.left), top: platformValue(contentPosition.top)})
                } as ViewStyle

                const elevationLayoutStyle = {
                        height: platformValue(height + containerHeight),
                        width: platformValue(width)
                } as ViewStyle

                const positionOutputRanges = {
                        [POPOVER_CONTENT_POSITION.VERTICAL_START]: [
                                theme.token.spacing.small,
                                theme.token.spacing.none
                        ],
                        [POPOVER_CONTENT_POSITION.VERTICAL_END]: [-theme.token.spacing.small, theme.token.spacing.none],
                        [POPOVER_CONTENT_POSITION.HORIZONTAL_START]: [
                                theme.token.spacing.small,
                                theme.token.spacing.none
                        ],
                        [POPOVER_CONTENT_POSITION.HORIZONTAL_END]: [
                                -theme.token.spacing.small,
                                theme.token.spacing.none
                        ]
                }

                const mainElement = (
                        <View
                                {...(type === POPOVER_TYPE.PLAIN && {onLayout})}
                                className={classesName(
                                        'absolute bottom-0 top-0 overflow-hidden',
                                        {
                                                ['m-h-6 bg-[--color-inverse-surface] pb-1 pl-2 pr-2 pt-1']:
                                                        type === POPOVER_TYPE.PLAIN,
                                                ['left-0 right-0']: isMenuOrPicker
                                        },
                                        shapeClasses(
                                                type === POPOVER_TYPE.TEXT_INPUT_PICKER ? SHAPE.MEDIUM_BOTTOM : shape
                                        )
                                )}
                                testID={`popoverContent__main--${id}`}
                        >
                                {isValidElement(content) && type !== POPOVER_TYPE.TOOLTIP ?
                                        <View
                                                {...(isMenuOrPicker && {onLayout})}
                                                testID={`popoverContent__supporting--${id}`}
                                        >
                                                {isMenuOrPicker ?
                                                        cloneElement<MenuProps>(
                                                                content as React.ReactElement<
                                                                        MenuProps,
                                                                        string | React.JSXElementConstructor<unknown>
                                                                >,
                                                                {...mainInteractionHandlers, visible}
                                                        )
                                                :       content}
                                        </View>
                                :       <Text
                                                ellipsizeMode='tail'
                                                numberOfLines={1}
                                                testID={`popoverContent__supportingText--${id}`}
                                                className={classesName(
                                                        'select-none text-center',
                                                        typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)({
                                                                colorClasses: 'color-[--color-inverse-on-surface]'
                                                        })
                                                )}
                                        >
                                                {content}
                                        </Text>
                                }
                        </View>
                )

                return (
                        <>
                                <LayoutAnimated
                                        {...containerProps}
                                        animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
                                        contentSize={{height, width}}
                                        className={classesName('z-50 ', {
                                                ['absolute']: Platform.OS !== 'web',
                                                ['fixed']: Platform.OS === 'web',
                                                ['min-h-6']: !isMenuOrPicker
                                        })}
                                        ref={ref}
                                        style={[contentStyle]}
                                        testID={testID ?? `popoverContent__content--${id}`}
                                        translate={!isMenuOrPicker}
                                        visible={visible}
                                >
                                        {isMenuOrPicker ?
                                                mainElement
                                        :       <Pressable
                                                        {...mainInteractionHandlers}
                                                        className='relative flex-1 self-stretch outline-none'
                                                        testID={`popoverContent_contentMain--${id}`}
                                                >
                                                        {mainElement}
                                                </Pressable>
                                        }
                                </LayoutAnimated>

                                {isMenuOrPicker && (
                                        <Mask
                                                backgroundColor={theme.token.scheme.scrim}
                                                onPressOut={onMaskPressOut}
                                                opacity={theme.token.opacity.level0}
                                                testID={`popoverContent__mask--${id}`}
                                                visible={visible}
                                        />
                                )}

                                {typeof elevation === 'number' && type === POPOVER_TYPE.TEXT_INPUT_PICKER && (
                                        <View
                                                className={classesName('z-40', {
                                                        ['absolute']: Platform.OS !== 'web',
                                                        ['fixed']: Platform.OS === 'web'
                                                })}
                                                style={[elevationLayoutStyle]}
                                                testID={`popoverContent_elevationLayout--${id}`}
                                        >
                                                <Elevation
                                                        level={elevation}
                                                        shape={SHAPE.MEDIUM}
                                                        testID={`popoverContent_elevation--${id}`}
                                                />
                                        </View>
                                )}
                        </>
                )
        }
)

RenderPopoverContent.displayName = 'RenderPopoverContent'
