import {EVENT_NAME, EventName, shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {LayoutAnimated} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonType, RenderButtonIconProps, RenderButtonProps} from './Button.interface'

export const RenderButtonIcon: FC<RenderButtonIconProps> = ({disabled, type = BUTTON_TYPE.FILLED, id, icon}) => {
        const theme = useTheme()
        const color = useMemo(
                () =>
                        ({
                                [BUTTON_TYPE.ELEVATED]: theme.token.scheme.primary,
                                [BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
                                [BUTTON_TYPE.LINK]: theme.token.scheme.primary,
                                [BUTTON_TYPE.TEXT]: theme.token.scheme.primary,
                                [BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
                        }) as Record<ButtonType, string>,
                [theme.token.scheme.onPrimary, theme.token.scheme.onSecondaryContainer, theme.token.scheme.primary]
        )

        const size = theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall

        if (!icon) {
                return <></>
        }

        return cloneElement(icon, {
                disabled,
                color: color[type],
                size,
                testID: `button__icon--${id}`
        })
}

export const RenderButton = forwardRef<PressableType, RenderButtonProps>(
        (
                {
                        accessibilityLabel,
                        backgroundUnderlayAnimatedStyle,
                        density,
                        disabled,
                        elevation,
                        eventName,
                        iconElement,
                        id,
                        interactionHandlers,
                        labelText,
                        labelTextAnimatedStyle,
                        linkColor,
                        loading,
                        testID,
                        type = BUTTON_TYPE.FILLED,
                        underlayColor,
                        ...touchableProps
                }: RenderButtonProps,
                ref
        ) => {
                const eventNames = [
                        EVENT_NAME.FOCUS,
                        EVENT_NAME.HOVER_IN,
                        EVENT_NAME.LONG_PRESS,
                        EVENT_NAME.PRESS_IN,
                        EVENT_NAME.PRESS_OUT,
                        EVENT_NAME.PRESS
                ] as readonly EventName[]

                const isActiveIndicatorVisible =
                        type === BUTTON_TYPE.LINK && eventName && eventNames.includes(eventName)

                const isLink = type === BUTTON_TYPE.LINK
                const buttonTypes = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as readonly ButtonType[]
                const loadingEventName = type && buttonTypes.includes(type) ? EVENT_NAME.NONE : EVENT_NAME.LONG_PRESS
                const shape = isLink ? SHAPE.EXTRA_SMALL : SHAPE.FULL
                const backgroundUnderlayElement = (
                        <Animated.View
                                className={clsx(
                                        'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-[4]',
                                        shapeClasses(shape)
                                )}
                                style={[backgroundUnderlayAnimatedStyle]}
                                testID={`button__backgroundUnderlay--${id}`}
                        />
                )

                const elevationUnderlayElement =
                        typeof elevation === 'number' ?
                                <Elevation
                                        level={elevation}
                                        shape={shape}
                                        testID={`button__elevation--${id}`}
                                />
                        :       <></>

                return (
                        <View
                                accessibilityLabel={accessibilityLabel ?? `Button: ${labelText}`}
                                accessibilityRole='button'
                                accessibilityState={{disabled}}
                                accessible={true}
                                tabIndex={-1}
                                testID={testID ?? `button--${id}`}
                                className={clsx('h-10 min-w-20 cursor-pointer', {
                                        ['min-w-14']: type === BUTTON_TYPE.TEXT,
                                        ['h-auto min-h-4 min-w-6']: type === BUTTON_TYPE.LINK
                                })}
                        >
                                <Touchable
                                        {...touchableProps}
                                        {...interactionHandlers}
                                        backgroundUnderlay={backgroundUnderlayElement}
                                        disabled={disabled}
                                        elevationUnderlay={elevationUnderlayElement}
                                        ref={ref}
                                        shape={shape}
                                        testID={`button__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <View
                                                testID={`button__content--${id}`}
                                                className={clsx(
                                                        'pointer-events-none relative z-[4] flex flex-col items-center justify-center overflow-hidden',
                                                        {
                                                                ['min-w-20']: !(
                                                                        [
                                                                                BUTTON_TYPE.TEXT,
                                                                                BUTTON_TYPE.LINK
                                                                        ] as readonly ButtonType[]
                                                                ).includes(type),
                                                                ['h-10']: type !== BUTTON_TYPE.LINK,
                                                                ['min-w-14']: type === BUTTON_TYPE.TEXT,
                                                                ['h-4 min-w-4']: type === BUTTON_TYPE.LINK
                                                        },
                                                        shapeClasses(shape)
                                                )}
                                        >
                                                <View
                                                        testID={`button__main--${id}`}
                                                        className={clsx(
                                                                'z-[4] flex flex-1 flex-row items-center justify-center gap-2 self-stretch pb-0 pt-0',
                                                                {
                                                                        ['pl-4 pr-4']: type !== BUTTON_TYPE.LINK,
                                                                        ['pl-1 pr-1']: type === BUTTON_TYPE.LINK
                                                                }
                                                        )}
                                                >
                                                        {iconElement && !isLink && (
                                                                <View
                                                                        className='flex flex-col items-center justify-center overflow-hidden'
                                                                        testID={`button__iconLayout--${id}`}
                                                                >
                                                                        {iconElement}
                                                                </View>
                                                        )}

                                                        <Animated.Text
                                                                className={clsx(
                                                                        'text-center',
                                                                        typographyClasses(
                                                                                isLink ?
                                                                                        TYPOGRAPHY.BODY
                                                                                :       TYPOGRAPHY.LABEL
                                                                        )(isLink ? SIZE.SMALL : SIZE.LARGE)
                                                                )}
                                                                ellipsizeMode='tail'
                                                                numberOfLines={1}
                                                                style={[labelTextAnimatedStyle]}
                                                                testID={`button__animatedLabelText--${id}`}
                                                        >
                                                                {labelText}
                                                        </Animated.Text>
                                                </View>

                                                {type === BUTTON_TYPE.LINK && (
                                                        <LayoutAnimated
                                                                className={clsx(
                                                                        'absolute bottom-0 left-0 right-0 z-[8] min-h-[1px] bg-[--color-primary]'
                                                                )}
                                                                style={[
                                                                        {...(linkColor && {backgroundColor: linkColor})}
                                                                ]}
                                                                testID={`button__activeIndicator--${id}`}
                                                                visible={isActiveIndicatorVisible}
                                                        />
                                                )}

                                                <Underlay
                                                        eventName={loading ? loadingEventName : eventName}
                                                        shape={shape}
                                                        testID={`button__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        </View>
                                </Touchable>
                        </View>
                )
        }
)

RenderButton.displayName = 'RenderButton'
