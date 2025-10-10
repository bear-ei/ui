import {Divider} from '@/components/Divider'
import {ICON_BUTTON_TYPE, IconButton} from '@/components/Icon-button'
import {LayoutAnimated} from '@/components/Layout-animated'
import {Skeleton} from '@/components/Skeleton'
import {ACTIVE_ANIMATED, Underlay} from '@/components/Underlay'
import {EVENT_NAME, LAYOUT, shapeClasses, TRIGGER_EVENT, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {DURATION, EASING, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, isValidElement, useCallback, useMemo, type FC} from 'react'
import {Pressable, Text, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ListAfterAffordance} from '../List-after-affordance'
import {LIST_LEADING_TYPE, LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import type {ListItemRef, RenderListItemProps, RenderListItemTrailingProps} from './List-item.interface'

export const RenderListItemTrailing: FC<RenderListItemTrailingProps> = ({
        afterAffordance,
        closeTrailing,
        disabled,
        id,
        interactionHandlers,
        onTrailingVisibility,
        size: rawSize = SIZE.MEDIUM,
        trailing,
        trailingProps: rawTrailingProps,
        trailingTriggerEvent
}) => {
        const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
        const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
        const {disabled: isDisabled, ...restTrailingProps} = rawTrailingProps ?? {}
        const onHoverIn = useCallback(() => onTrailingVisibility?.(EVENT_NAME.HOVER_IN), [onTrailingVisibility])
        const iconSize = {
                [SIZE.EXTRA_LARGE]: SHAPE.LARGE,
                [SIZE.EXTRA_SMALL]: SHAPE.EXTRA_SMALL,
                [SIZE.LARGE]: SHAPE.MEDIUM,
                [SIZE.MEDIUM]: SHAPE.SMALL,
                [SIZE.SMALL]: SHAPE.EXTRA_SMALL
        }

        const size = iconSize[rawSize]
        const trailingProps = useMemo(
                () => ({
                        ...restTrailingProps,
                        ...interactionHandlers,
                        ...(trailingTriggerEvent === TRIGGER_EVENT.HOVER && {onHoverIn}),
                        disabled: isDisabled ?? disabled,
                        testID: `listItem__trailing--${id}`,
                        type: ICON_BUTTON_TYPE.STANDARD,
                        size
                }),
                [
                        disabled,
                        id,
                        interactionHandlers,
                        isDisabled,
                        onHoverIn,
                        restTrailingProps,
                        size,
                        trailingTriggerEvent
                ]
        )

        const trailingElement = useMemo(
                () => ({
                        afterAffordance:
                                trailing ?
                                        cloneElement(trailing, trailingProps)
                                :       <IconButton
                                                {...trailingProps}
                                                testID={`listItem__trailingIconButton--${id}`}
                                                icon={
                                                        <MaterialIcons
                                                                name='more-horiz'
                                                                testID={`listItem__trailingIconMoreHoriz--${id}`}
                                                        />
                                                }
                                        />,
                        closeTrailing: cloneElement(
                                trailing ?? (
                                        <IconButton
                                                testID={`listItem__trailingIconButton--${id}`}
                                                icon={
                                                        <MaterialIcons
                                                                name='close'
                                                                testID={`listItem__trailingIconMoreHoriz--${id}`}
                                                        />
                                                }
                                        />
                                ),
                                trailingProps
                        ),
                        standard: trailing ? cloneElement(trailing, trailingProps) : undefined
                }),
                [id, trailing, trailingProps]
        )

        return trailingElement[trailingType]
}

export const RenderListItem = forwardRef<ListItemRef, RenderListItemProps>(
        (
                {
                        accessibilityLabel,
                        active,
                        afterAffordance,
                        afterAffordanceExpanded,
                        afterAffordancePrimaryButtonProps,
                        afterAffordanceSecondaryButtonProps,
                        afterAffordanceVisible,
                        beforeAffordance,
                        closeTrailing,
                        contentAnimatedStyle,
                        contentStyle,
                        disabled,
                        divider,
                        enableUnderlay,
                        enableUnderlayActive,
                        eventName,
                        headline,
                        headlineTextAnimatedStyle,
                        id,
                        indexKey,
                        interactionHandlers,
                        leadingElement,
                        leadingType,
                        onCancel,
                        onConfirm,
                        panResponder,
                        selectType,
                        shape,
                        size = SIZE.MEDIUM,
                        skeletonDuration = 300,
                        skeletonElement,
                        supporting,
                        supportingTextNumberOfLines,
                        testID,
                        trailingElement,
                        trailingTriggerEvent,
                        trailingVisible,
                        type = LIST_TYPE.STANDARD,
                        ...touchableProps
                },
                ref
        ) => {
                const theme = useTheme()
                const activeColor = theme.token.scheme.secondaryContainer
                const isSupportingTextShow = !!supporting
                const isTrailingElementShow = !!trailingElement
                const isUnmountTrailing = trailingTriggerEvent === TRIGGER_EVENT.HOVER
                const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
                const underlayProps = selectType &&
                        [LIST_SELECT_TYPE.SINGLE, LIST_SELECT_TYPE.MULTIPLE].includes(selectType) &&
                        enableUnderlayActive && {
                                active,
                                activeAnimatedType: ACTIVE_ANIMATED.SCALE_X,
                                activeColor
                        }

                const isLines = (supportingTextNumberOfLines ?? 0) > 1
                const mainElement = (
                        <>
                                {beforeAffordance && (
                                        <View
                                                className='flex flex-row items-center justify-center'
                                                testID={`listItem__beforeAffordanceContainer--${id}`}
                                        >
                                                {beforeAffordance}
                                        </View>
                                )}

                                <Animated.View
                                        style={[contentStyle, contentAnimatedStyle]}
                                        testID={`listItem__animatedContent--${id}`}
                                        className={clsx('absolute bottom-0 left-0 right-0 top-0 z-10', {
                                                ['bg-[--color-surface-container]']: type !== LIST_TYPE.STANDARD,
                                                ['bg-[--color-surface]']: type === LIST_TYPE.STANDARD
                                        })}
                                >
                                        <Pressable
                                                {...touchableProps}
                                                {...interactionHandlers}
                                                className='flex flex-1 flex-col items-center justify-center self-stretch outline-none'
                                                disabled={disabled}
                                                ref={ref}
                                                testID={`listItem__touchable--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'relative z-10 flex flex-row items-center justify-start self-stretch',
                                                                {
                                                                        ['pl-4 pr-4']:
                                                                                !isTrailingElementShow &&
                                                                                size !== SIZE.SMALL,
                                                                        ['pl-3 pr-3']:
                                                                                !isTrailingElementShow &&
                                                                                size === SIZE.SMALL,
                                                                        ['pl-4 pr-[10px]']:
                                                                                isTrailingElementShow &&
                                                                                size !== SIZE.SMALL,
                                                                        ['pl-3 pr-2']:
                                                                                isTrailingElementShow &&
                                                                                size === SIZE.SMALL,

                                                                        ['pb-2 pt-2']: isSupportingTextShow && !isLines,
                                                                        ['pb-3 pt-3']: isSupportingTextShow && isLines
                                                                }
                                                        )}
                                                        testID={`listItem__main--${id}`}
                                                >
                                                        {leadingElement && (
                                                                <View
                                                                        testID={`listItem__Leading--${id}`}
                                                                        className={clsx(
                                                                                'flex flex-col items-center justify-center',
                                                                                {
                                                                                        ['justify-start']: isLines,
                                                                                        ['mr-4']: size !== SIZE.SMALL,
                                                                                        ['mr-3']: size === SIZE.SMALL
                                                                                }
                                                                        )}
                                                                >
                                                                        {leadingType === LIST_LEADING_TYPE.ICON ?
                                                                                cloneElement(leadingElement, {})
                                                                        :       leadingElement}
                                                                </View>
                                                        )}

                                                        <View
                                                                testID={`listItem__mainInner--${id}`}
                                                                className={clsx(
                                                                        'pointer-events-none flex flex-1 flex-col justify-center',
                                                                        {['min-h-8']: isSupportingTextShow}
                                                                )}
                                                        >
                                                                {headline &&
                                                                        (isValidElement(headline) ? headline : (
                                                                                <Animated.Text
                                                                                        className={typographyClasses(
                                                                                                TYPOGRAPHY.BODY
                                                                                        )(size)()}
                                                                                        ellipsizeMode='tail'
                                                                                        numberOfLines={1}
                                                                                        style={[
                                                                                                headlineTextAnimatedStyle
                                                                                        ]}
                                                                                        testID={`listItem__animatedHeadlineText--${id}`}
                                                                                >
                                                                                        {headline}
                                                                                </Animated.Text>
                                                                        ))}

                                                                {supporting &&
                                                                        (isValidElement(supporting) ? supporting : (
                                                                                <Text
                                                                                        className={clsx(
                                                                                                typographyClasses(
                                                                                                        TYPOGRAPHY.BODY
                                                                                                )(size)(
                                                                                                        'color-[--color-on-surface-variant]'
                                                                                                )
                                                                                        )}
                                                                                        ellipsizeMode='tail'
                                                                                        numberOfLines={
                                                                                                supportingTextNumberOfLines
                                                                                        }
                                                                                        testID={`listItem__supportingText--${id}`}
                                                                                >
                                                                                        {supporting}
                                                                                </Text>
                                                                        ))}
                                                        </View>

                                                        {trailingElement && (
                                                                <View
                                                                        className={clsx('flex flex-col', {
                                                                                ['justify-start']: isLines,
                                                                                ['ml-4']:
                                                                                        trailingVisible &&
                                                                                        size !== SIZE.SMALL,
                                                                                ['ml-3']:
                                                                                        trailingVisible &&
                                                                                        size === SIZE.SMALL
                                                                        })}
                                                                        testID={`listItem__trailingLayout--${id}`}
                                                                >
                                                                        <LayoutAnimated
                                                                                defaultVisible={!trailingTriggerEvent}
                                                                                entry={{
                                                                                        duration: DURATION.MEDIUM_1,
                                                                                        easing: EASING.EMPHASIZED_DECELERATE
                                                                                }}
                                                                                exit={{
                                                                                        duration: DURATION.SHORT_0,
                                                                                        easing: EASING.EMPHASIZED_ACCELERATE
                                                                                }}
                                                                                lazy={closeTrailing}
                                                                                testID={`listItem__trailing--${id}`}
                                                                                unmount={isUnmountTrailing}
                                                                                visible={trailingVisible}
                                                                        >
                                                                                {trailingElement}
                                                                        </LayoutAnimated>
                                                                </View>
                                                        )}
                                                </View>
                                        </Pressable>

                                        {enableUnderlay && (
                                                <Underlay
                                                        {...underlayProps}
                                                        eventName={eventName}
                                                        testID={`listItem__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        )}
                                </Animated.View>

                                {afterAffordance && (
                                        <View
                                                className={clsx('flex flex-1 flex-row justify-center self-end', {
                                                        ['z-20']: afterAffordanceExpanded
                                                })}
                                                testID={`listItem__afterAffordanceLayout--${id}`}
                                        >
                                                {typeof afterAffordance === 'boolean' ?
                                                        <ListAfterAffordance
                                                                indexKey={indexKey}
                                                                onCancel={onCancel}
                                                                onConfirm={onConfirm}
                                                                primaryButtonProps={afterAffordancePrimaryButtonProps}
                                                                secondaryButtonProps={
                                                                        afterAffordanceSecondaryButtonProps
                                                                }
                                                                size={size}
                                                                testID={`listItem__listAfterAffordance--${id}`}
                                                                visible={afterAffordanceVisible}
                                                        />
                                                :       afterAffordance}
                                        </View>
                                )}

                                {divider && (
                                        <View
                                                testID={`listItem__dividerLayout--${id}`}
                                                className='absolute bottom-0 left-0 right-0 z-20 h-[1px]'
                                        >
                                                <Divider
                                                        layoutType={LAYOUT.HORIZONTAL}
                                                        size={SIZE.LARGE}
                                                        testID={`listItem__divider--${id}`}
                                                />
                                        </View>
                                )}
                        </>
                )

                return (
                        <View
                                {...panResponder?.panHandlers}
                                accessibilityLabel={
                                        accessibilityLabel ?? (typeof headline === 'string' ? headline : 'headline')
                                }
                                accessibilityRole='menuitem'
                                tabIndex={-1}
                                testID={testID ?? `listItem--${id}`}
                                className={clsx(
                                        'relative flex flex-col self-stretch overflow-hidden',
                                        {
                                                ['h-8 min-w-8']: size === SIZE.SMALL,
                                                ['h-10 min-w-10']: size === SIZE.MEDIUM,
                                                ['h-12 min-w-12']: size === SIZE.LARGE
                                        },
                                        shapeClasses(shape)
                                )}
                        >
                                {skeletonElement ?
                                        <Skeleton
                                                duration={skeletonDuration}
                                                layoutType={LAYOUT.HORIZONTAL}
                                                skeleton={skeletonElement}
                                                testID={`listItem__skeleton--${id}`}
                                        >
                                                {mainElement}
                                        </Skeleton>
                                :       <View
                                                className='flex-1 self-stretch'
                                                testID={`listItem__mainLayout--${id}`}
                                        >
                                                {mainElement}
                                        </View>
                                }
                        </View>
                )
        }
)

RenderListItem.displayName = 'RenderListItem'
