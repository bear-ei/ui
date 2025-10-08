import {LayoutAnimated} from '@/components/Layout-animated'
import {EVENT_NAME, LAYOUT, shapeClasses, TRIGGER_EVENT, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {DURATION, EASING, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, isValidElement, useCallback, useMemo, type FC} from 'react'
import {Pressable, Text, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Divider} from '../../Divider'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance'
import {LIST_LEADING_TYPE, LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import {ListType} from '../List.interface'
import type {ListItemRef, RenderListItemProps, RenderListItemTrailingProps} from './List-item.interface'

export const RenderListItemTrailing: FC<RenderListItemTrailingProps> = ({
        afterAffordance,
        closeTrailing,
        disabled,
        id,
        interactionHandlers,
        onTrailingVisibility,
        trailing,
        trailingProps: rawTrailingProps,
        trailingTriggerEvent,
        type = LIST_TYPE.STANDARD
}) => {
        const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
        const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
        const {disabled: isDisabled, ...restTrailingProps} = useMemo(() => rawTrailingProps ?? {}, [rawTrailingProps])
        // const density = useMemo(
        //         () => ({
        //                 [LIST_TYPE.LABEL]: -2,
        //                 [LIST_TYPE.MENU]: 0,
        //                 [LIST_TYPE.STANDARD]: 0
        //         }),
        //         []
        // )

        // const iconButtonDensity = density[type]
        // const iconDensity = iconButtonDensity / 2
        const onHoverIn = useCallback(() => onTrailingVisibility?.(EVENT_NAME.HOVER_IN), [onTrailingVisibility])
        const trailingProps = useMemo(
                () => ({
                        ...restTrailingProps,
                        ...interactionHandlers,
                        ...(trailingTriggerEvent === TRIGGER_EVENT.HOVER && {onHoverIn}),
                        disabled: isDisabled ?? disabled,
                        testID: `listItem__trailing--${id}`,
                        type: ICON_BUTTON_TYPE.STANDARD
                        // density: iconButtonDensity
                }),
                [disabled, id, interactionHandlers, isDisabled, onHoverIn, restTrailingProps, trailingTriggerEvent]
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
                                                        <MaterialCommunityIcons
                                                                name='more'
                                                                testID={`listItem__trailingIconMoreHoriz--${id}`}
                                                        />
                                                }
                                        />,
                        closeTrailing: cloneElement(
                                trailing ?? (
                                        <IconButton
                                                testID={`listItem__trailingIconButton--${id}`}
                                                icon={
                                                        <MaterialCommunityIcons
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
                const isUnmountTrailing = trailingTriggerEvent === TRIGGER_EVENT.HOVER
                const isTrailingShow = !!trailingElement
                const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
                const underlayProps = useMemo(
                        () =>
                                selectType &&
                                [LIST_SELECT_TYPE.SINGLE, LIST_SELECT_TYPE.MULTIPLE].includes(selectType) &&
                                enableUnderlayActive && {
                                        active,
                                        activeAnimatedType: ACTIVE_ANIMATED.SCALE_X,
                                        activeColor
                                },
                        [active, activeColor, enableUnderlayActive, selectType]
                )

                // const leadingDensity = type === LIST_TYPE.LABEL ? -1 : 0
                const size = type === LIST_TYPE.LABEL ? SIZE.MEDIUM : SIZE.LARGE
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
                                        className={clsx('absolute z-10', {
                                                ['h-10 min-w-12']: type === LIST_TYPE.LABEL,
                                                ['h-12 min-w-12']: type === LIST_TYPE.MENU,
                                                ['h-14 min-w-14']: type === LIST_TYPE.STANDARD
                                        })}
                                >
                                        <Pressable
                                                {...touchableProps}
                                                {...interactionHandlers}
                                                className='flex flex-col items-center justify-center outline-none'
                                                disabled={disabled}
                                                ref={ref}
                                                testID={`listItem__touchable--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'relative z-10 flex flex-row items-center justify-start self-stretch overflow-hidden',
                                                                {
                                                                        ['h-10 min-w-12 pb-0 pl-3 pr-3 pt-0']:
                                                                                type === LIST_TYPE.LABEL,
                                                                        ['h-12 min-w-12 pb-0 pl-3 pr-3 pt-0']:
                                                                                type === LIST_TYPE.MENU,
                                                                        ['h-14 min-w-14 pb-0 pl-4 pr-4 pt-0']:
                                                                                type === LIST_TYPE.STANDARD,
                                                                        ['pb-2 pt-2']: isSupportingTextShow,
                                                                        ['pb-3 pt-3']: isLines,
                                                                        ['pb-0 pl-2 pr-3 pt-0']:
                                                                                type === LIST_TYPE.LABEL &&
                                                                                isTrailingShow,
                                                                        ['pb-0 pl-3 pr-1 pt-0']:
                                                                                type === LIST_TYPE.MENU &&
                                                                                isTrailingShow,
                                                                        ['pb-0 pl-3 pr-2 pt-0']:
                                                                                type === LIST_TYPE.STANDARD &&
                                                                                isTrailingShow,
                                                                        ['pr-0']: isUnmountTrailing
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
                                                                                        ['mr-3']: (
                                                                                                [
                                                                                                        LIST_TYPE.LABEL,
                                                                                                        LIST_TYPE.MENU
                                                                                                ] as readonly ListType[]
                                                                                        ).includes(type),
                                                                                        ['mr-4']:
                                                                                                type ===
                                                                                                LIST_TYPE.STANDARD
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
                                                                        {['min-h-10']: isSupportingTextShow}
                                                                )}
                                                        >
                                                                {headline &&
                                                                        (isValidElement(headline) ? headline : (
                                                                                <Animated.Text
                                                                                        className={typographyClasses(
                                                                                                TYPOGRAPHY.BODY
                                                                                        )(size)}
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
                                                                                                )(SIZE.MEDIUM),
                                                                                                'color-[--color-on-surface-variant]'
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
                                                                                ['ml-3 h-8 w-8']:
                                                                                        type === LIST_TYPE.LABEL,
                                                                                ['ml-3 h-10 w-10']:
                                                                                        type === LIST_TYPE.MENU,
                                                                                ['ml-4 h-10 w-10']:
                                                                                        type === LIST_TYPE.MENU,
                                                                                ['h-auto w-auto']: isUnmountTrailing,
                                                                                ['justify-start']: isLines
                                                                        })}
                                                                        testID={`listItem__trailingLayout--${id}`}
                                                                >
                                                                        <LayoutAnimated
                                                                                className={clsx({
                                                                                        ['pr-2']:
                                                                                                isUnmountTrailing &&
                                                                                                (
                                                                                                        [
                                                                                                                LIST_TYPE.LABEL,
                                                                                                                LIST_TYPE.STANDARD
                                                                                                        ] as readonly ListType[]
                                                                                                ).includes(type),
                                                                                        ['pr-1']:
                                                                                                isUnmountTrailing &&
                                                                                                type === LIST_TYPE.MENU
                                                                                })}
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
                                                className={clsx('flex flex-1 flex-row items-end justify-center', {
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
                                                ['h-10 min-w-12']: type === LIST_TYPE.LABEL,
                                                ['h-12 min-w-12']: type === LIST_TYPE.MENU,
                                                ['h-14 min-w-14']: type === LIST_TYPE.STANDARD
                                        },
                                        shapeClasses(shape)
                                )}
                        >
                                {skeletonElement ?
                                        // <Skeleton
                                        //         duration={skeletonDuration}
                                        //         layoutType={LAYOUT.HORIZONTAL}
                                        //         skeleton={skeletonElement}
                                        //         testID={`listItem__skeleton--${id}`}
                                        // >
                                        //         {mainElement}
                                        // </Skeleton>
                                        <></>
                                :       mainElement}
                        </View>
                )
        }
)

RenderListItem.displayName = 'RenderListItem'
