import {EVENT_NAME, EventName, shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {hexToRGBA, pxToRem, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, type FC} from 'react'
import {Platform, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {LayoutAnimated} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonType, RenderButtonIconProps, RenderButtonProps} from './Button.interface'

export const RenderButtonIcon: FC<RenderButtonIconProps> = ({disabled, icon, id, type = BUTTON_TYPE.FILLED}) => {
        const theme = useTheme()
        const color = {
                [BUTTON_TYPE.ELEVATED]: theme.token.scheme.primary,
                [BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
                [BUTTON_TYPE.LINK]: theme.token.scheme.primary,
                [BUTTON_TYPE.TEXT]: theme.token.scheme.primary,
                [BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
        } as Record<ButtonType, string>

        const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)

        if (!icon) {
                return <></>
        }

        const iconSize = theme.token.spacing.medium

        return cloneElement(icon, {
                color: disabled ? disabledColor : color[type],
                disabled,
                testID: `button__icon--${id}`,
                ...Platform.select({
                        default: {size: iconSize},
                        web: {style: {fontSize: pxToRem()(iconSize)}}
                })
        })
}

export const RenderButton = forwardRef<PressableType, RenderButtonProps>(
        (
                {
                        accessibilityLabel,
                        backgroundUnderlayAnimatedStyle,
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
                        size = SIZE.MEDIUM,
                        stretch,
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
                        EVENT_NAME.PRESS,
                        EVENT_NAME.PRESS_IN,
                        EVENT_NAME.PRESS_OUT
                ] as readonly EventName[]

                const isActiveIndicatorVisible =
                        type === BUTTON_TYPE.LINK && eventName && eventNames.includes(eventName)

                const isLink = type === BUTTON_TYPE.LINK
                const buttonTypes = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as readonly ButtonType[]
                const loadingEventName = type && buttonTypes.includes(type) ? EVENT_NAME.NONE : EVENT_NAME.LONG_PRESS
                const shape = isLink ? SHAPE.EXTRA_SMALL_TOP : SHAPE.FULL
                const backgroundUnderlayElement = (
                        <Animated.View
                                className={clsx(
                                        'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
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

                console.info(type !== BUTTON_TYPE.LINK && size === SIZE.EXTRA_LARGE, type, size)

                return (
                        <View
                                accessibilityLabel={accessibilityLabel ?? `Button: ${labelText}`}
                                accessibilityRole='button'
                                accessibilityState={{disabled}}
                                accessible={true}
                                tabIndex={-1}
                                testID={testID ?? `button--${id}`}
                                className={clsx('cursor-pointer', {
                                        ['h-10 min-w-20']: type !== BUTTON_TYPE.LINK && size === SIZE.MEDIUM,
                                        ['h-12 min-w-20']: type !== BUTTON_TYPE.LINK && size === SIZE.LARGE,
                                        ['h-14 min-w-20']: type !== BUTTON_TYPE.LINK && size === SIZE.EXTRA_LARGE,
                                        ['h-4 min-w-6']: type === BUTTON_TYPE.LINK,
                                        ['h-6 min-w-20']: type !== BUTTON_TYPE.LINK && size === SIZE.EXTRA_SMALL,
                                        ['h-8 min-w-20']: type !== BUTTON_TYPE.LINK && size === SIZE.SMALL,
                                        ['self-start']: !stretch,
                                        ['self-stretch']: stretch
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
                                                className={clsx(
                                                        'pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'
                                                )}
                                                testID={`button__content--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'z-10 flex flex-1 flex-row items-center justify-center gap-2 self-stretch',
                                                                {
                                                                        ['pl-1 pr-1']: type === BUTTON_TYPE.LINK,
                                                                        ['pl-2 pr-2']:
                                                                                type !== BUTTON_TYPE.LINK &&
                                                                                size === SIZE.EXTRA_SMALL,
                                                                        ['pl-3 pr-3']:
                                                                                type !== BUTTON_TYPE.LINK &&
                                                                                size === SIZE.SMALL,
                                                                        ['pl-4 pr-4']:
                                                                                type !== BUTTON_TYPE.LINK &&
                                                                                size === SIZE.MEDIUM,
                                                                        ['pl-5 pr-5']:
                                                                                type !== BUTTON_TYPE.LINK &&
                                                                                size === SIZE.LARGE,
                                                                        ['pl-6 pr-6']:
                                                                                type !== BUTTON_TYPE.LINK &&
                                                                                size === SIZE.EXTRA_LARGE
                                                                }
                                                        )}
                                                        testID={`button__main--${id}`}
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
                                                                        'select-none text-center',
                                                                        typographyClasses(
                                                                                isLink ?
                                                                                        TYPOGRAPHY.BODY
                                                                                :       TYPOGRAPHY.LABEL
                                                                        )(size)()
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
                                                                        'absolute bottom-0 left-0 right-0 z-20 min-h-[0.0625rem] bg-[--color-primary]'
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
