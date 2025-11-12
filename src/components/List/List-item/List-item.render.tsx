import {AnimatedText, AnimatedView} from '@/components/Animated-component'
import {Divider} from '@/components/Divider'
import {ICON_BUTTON_TYPE, IconButton} from '@/components/Icon-button'
import {LayoutAnimated} from '@/components/Layout-animated'
import {Skeleton} from '@/components/Skeleton'
import {ACTIVE_ANIMATED, Underlay} from '@/components/Underlay'
import {EVENT_NAME, ICON_BUTTON_SIZE, LAYOUT, TRIGGER_EVENT} from '@/constants'
import {useTheme} from '@/hooks'
import {platformValue, processIconSize, shapeClasses, typographyClasses} from '@/utils'
import {DURATION, EASING, SIZE, TYPOGRAPHY, type Size} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {Ellipsis, X} from 'lucide-react-native'
import {cloneElement, forwardRef, isValidElement, useCallback, type FC} from 'react'
import {Pressable, Text, View} from 'react-native'
import {ListAfterAffordance} from '../List-after-affordance'
import {LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import type {ListType} from '../List.interface'
import type {ListItemRef, RenderListItemProps, RenderListItemTrailingProps} from './List-item.interface'

export const RenderListItemTrailing: FC<RenderListItemTrailingProps> = ({
        afterAffordance,
        closeTrailing,
        disabled,
        id,
        interactionHandlers,
        onTrailingVisibility,
        size = SIZE.MEDIUM,
        trailing,
        trailingProps: rawTrailingProps,
        trailingTriggerEvent
}) => {
        const {disabled: isDisabled, ...restTrailingProps} = rawTrailingProps ?? {}
        const onHoverIn = useCallback(() => onTrailingVisibility?.(EVENT_NAME.HOVER_IN), [onTrailingVisibility])
        const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
        const trailingSize = ICON_BUTTON_SIZE[size]
        const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
        const trailingProps = {
                ...restTrailingProps,
                ...interactionHandlers,
                ...(trailingTriggerEvent === TRIGGER_EVENT.HOVER && {onHoverIn}),
                disabled: isDisabled ?? disabled,
                size: trailingSize,
                type: ICON_BUTTON_TYPE.STANDARD
        }

        const trailingElement = {
                afterAffordance: cloneElement(
                        trailing ?? (
                                <IconButton
                                        testID={`listItem__trailingIconButton--${id}`}
                                        icon={<Ellipsis testID={`listItem__trailingIconMoreHoriz--${id}`} />}
                                />
                        ),
                        trailingProps
                ),
                closeTrailing: cloneElement(
                        trailing ?? (
                                <IconButton
                                        testID={`listItem__trailingIconButton--${id}`}
                                        icon={<X testID={`listItem__trailingIconMoreHoriz--${id}`} />}
                                />
                        ),
                        trailingProps
                ),
                standard: trailing ? cloneElement(trailing, trailingProps) : undefined
        }

        return trailingElement[trailingType]
}

/**
 * TODO: Support Multiline
 */
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
                        className,
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
                const isTrailingShow = !!trailingElement
                const isLeadingShow = !!leadingElement
                const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
                const underlayProps = selectType &&
                        [LIST_SELECT_TYPE.SINGLE, LIST_SELECT_TYPE.MULTIPLE].includes(selectType) &&
                        enableUnderlayActive && {
                                active,
                                activeAnimatedType: ACTIVE_ANIMATED.SCALE_X,
                                activeColor
                        }

                const isMultiline = (supportingTextNumberOfLines ?? 0) > 1
                const iconSize = processIconSize(theme)(ICON_BUTTON_SIZE[size])
                const typographyType =
                        type && ([LIST_TYPE.MENU, LIST_TYPE.LABEL] as readonly ListType[]).includes(type) ?
                                TYPOGRAPHY.LABEL
                        :       TYPOGRAPHY.BODY

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

                                <AnimatedView
                                        style={[contentStyle, contentAnimatedStyle]}
                                        testID={`listItem__animatedContent--${id}`}
                                        className={clsx('absolute bottom-0 left-0 right-0 top-0 z-20', {
                                                ['bg-[--color-surface-container]']: type !== LIST_TYPE.STANDARD,
                                                ['bg-[--color-surface]']: type === LIST_TYPE.STANDARD
                                        })}
                                >
                                        <Pressable
                                                {...touchableProps}
                                                {...interactionHandlers}
                                                className={clsx(
                                                        'flex flex-1 flex-col items-center justify-center self-stretch outline-none',
                                                        className
                                                )}
                                                disabled={disabled}
                                                ref={ref}
                                                testID={`listItem__touchable--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'relative z-10 flex flex-row items-center justify-start self-stretch',
                                                                {
                                                                        ['pr-6']:
                                                                                !isTrailingShow &&
                                                                                size === SIZE.EXTRA_LARGE,

                                                                        ['pl-6']:
                                                                                !isLeadingShow &&
                                                                                size === SIZE.EXTRA_LARGE,

                                                                        ['pr-3']:
                                                                                (isTrailingShow &&
                                                                                        size === SIZE.EXTRA_LARGE) ||
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.SMALL),

                                                                        ['pl-3']:
                                                                                (isLeadingShow &&
                                                                                        size === SIZE.EXTRA_LARGE) ||
                                                                                (!isLeadingShow && size === SIZE.SMALL),

                                                                        ['pr-5']:
                                                                                !isTrailingShow && size === SIZE.LARGE,

                                                                        ['pl-5']: !isLeadingShow && size === SIZE.LARGE,

                                                                        ['pr-[0.625rem]']:
                                                                                isTrailingShow && size === SIZE.LARGE,

                                                                        ['pl-[0.625rem]']:
                                                                                isLeadingShow && size === SIZE.LARGE,

                                                                        ['pr-4']:
                                                                                !isTrailingShow && size === SIZE.MEDIUM,

                                                                        ['pl-4']:
                                                                                !isLeadingShow && size === SIZE.MEDIUM,

                                                                        ['pr-2']:
                                                                                (isTrailingShow &&
                                                                                        size === SIZE.MEDIUM) ||
                                                                                (!isTrailingShow &&
                                                                                        size === SIZE.EXTRA_SMALL),

                                                                        ['pl-2']:
                                                                                (isLeadingShow &&
                                                                                        size === SIZE.MEDIUM) ||
                                                                                (!isLeadingShow &&
                                                                                        size === SIZE.EXTRA_SMALL),

                                                                        ['pr-1']:
                                                                                isTrailingShow &&
                                                                                size &&
                                                                                (
                                                                                        [
                                                                                                SIZE.SMALL,
                                                                                                SIZE.EXTRA_SMALL
                                                                                        ] as readonly Size[]
                                                                                ).includes(size),
                                                                        ['pl-1']:
                                                                                isLeadingShow &&
                                                                                size &&
                                                                                (
                                                                                        [
                                                                                                SIZE.SMALL,
                                                                                                SIZE.EXTRA_SMALL
                                                                                        ] as readonly Size[]
                                                                                ).includes(size),

                                                                        ['pb-2 pt-2']:
                                                                                isSupportingTextShow && !isMultiline,
                                                                        ['pb-4 pt-4']:
                                                                                isSupportingTextShow && isMultiline
                                                                }
                                                        )}
                                                        testID={`listItem__main--${id}`}
                                                >
                                                        {leadingElement && (
                                                                <View
                                                                        testID={`listItem__leading--${id}`}
                                                                        className={clsx(
                                                                                'flex flex-col items-center justify-center',
                                                                                {
                                                                                        ['justify-start']: isMultiline,
                                                                                        ['mr-1']: (
                                                                                                [
                                                                                                        SIZE.SMALL,
                                                                                                        SIZE.EXTRA_SMALL
                                                                                                ] as readonly Size[]
                                                                                        ).includes(size),
                                                                                        ['mr-2']: size === SIZE.MEDIUM,
                                                                                        ['mr-3']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,
                                                                                        ['mr-[0.625rem]']:
                                                                                                size === SIZE.LARGE,

                                                                                        ['h-12 w-12']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,

                                                                                        ['h-10 w-10']:
                                                                                                size === SIZE.LARGE,

                                                                                        ['h-8 w-8']:
                                                                                                size &&
                                                                                                (
                                                                                                        [
                                                                                                                SIZE.MEDIUM,
                                                                                                                SIZE.SMALL
                                                                                                        ] as readonly Size[]
                                                                                                ).includes(size),

                                                                                        ['h-6 w-6']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_SMALL
                                                                                }
                                                                        )}
                                                                >
                                                                        {cloneElement(leadingElement, {
                                                                                color: theme.token.scheme
                                                                                        .onSurfaceVariant,
                                                                                size: platformValue(iconSize),
                                                                                testID: `listItem__leadingIcon--${id}`
                                                                        })}
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
                                                                        (isValidElement(headline) ?
                                                                                cloneElement(headline, {...{active}})
                                                                        :       <AnimatedText
                                                                                        className={typographyClasses(
                                                                                                typographyType
                                                                                        )(size)()}
                                                                                        ellipsizeMode='tail'
                                                                                        numberOfLines={1}
                                                                                        style={[
                                                                                                headlineTextAnimatedStyle
                                                                                        ]}
                                                                                        testID={`listItem__animatedHeadlineText--${id}`}
                                                                                >
                                                                                        {headline}
                                                                                </AnimatedText>)}

                                                                {supporting &&
                                                                        (isValidElement(supporting) ? supporting : (
                                                                                <Text
                                                                                        className={clsx(
                                                                                                typographyClasses(
                                                                                                        TYPOGRAPHY.BODY
                                                                                                )(size)({
                                                                                                        colorClasses:
                                                                                                                'color-[--color-on-surface-variant]'
                                                                                                })
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
                                                                        className={clsx(
                                                                                'flex flex-col items-center justify-center',
                                                                                {
                                                                                        ['justify-start']: isMultiline,
                                                                                        ['ml-1']: (
                                                                                                [
                                                                                                        SIZE.SMALL,
                                                                                                        SIZE.EXTRA_SMALL
                                                                                                ] as readonly Size[]
                                                                                        ).includes(size),
                                                                                        ['ml-2']: size === SIZE.MEDIUM,
                                                                                        ['ml-3']:
                                                                                                size ===
                                                                                                SIZE.EXTRA_LARGE,
                                                                                        ['ml-[0.625rem]']:
                                                                                                size === SIZE.LARGE,
                                                                                        ['h-12 w-12']:
                                                                                                size ===
                                                                                                        SIZE.EXTRA_LARGE &&
                                                                                                trailingVisible,

                                                                                        ['h-10 w-10']:
                                                                                                size === SIZE.LARGE &&
                                                                                                trailingVisible,

                                                                                        ['h-8 w-8']:
                                                                                                size &&
                                                                                                (
                                                                                                        [
                                                                                                                SIZE.MEDIUM,
                                                                                                                SIZE.SMALL
                                                                                                        ] as readonly Size[]
                                                                                                ).includes(size) &&
                                                                                                trailingVisible,

                                                                                        ['h-6 w-6']:
                                                                                                size ===
                                                                                                        SIZE.EXTRA_SMALL &&
                                                                                                trailingVisible
                                                                                }
                                                                        )}
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
                                                                                unmount={true}
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
                                </AnimatedView>

                                {afterAffordance && (
                                        <View
                                                className={clsx('flex flex-1 flex-row justify-center self-end', {
                                                        ['z-10']: afterAffordanceExpanded
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
                                                className='absolute bottom-0 left-0 right-0 z-20 h-[0.0625rem]'
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
                                        'relative flex min-w-20 flex-col self-stretch overflow-hidden',
                                        {
                                                ['h-10']: size === SIZE.SMALL,
                                                ['h-12']: size === SIZE.MEDIUM,
                                                ['h-14']: size === SIZE.LARGE,
                                                ['h-16']: size === SIZE.EXTRA_LARGE,
                                                ['h-8']: size === SIZE.EXTRA_SMALL
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
