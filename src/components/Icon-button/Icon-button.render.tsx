import {useTheme} from '@/hooks'
import {platformValue, processIconSize, shapeClasses} from '@/utils'
import {hexToRGBA, SHAPE, SIZE} from '@bearei/theme-token'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, type FC} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimated} from '../Layout-animated'
import {Progress, PROGRESS_ANIMATED, PROGRESS_TYPE} from '../Progress'
import {Touchable, type PressableType} from '../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../Underlay'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {RenderIconButtonIconProps, RenderIconButtonProps} from './Icon-button.interface'

export const RenderIconButtonIcon: FC<RenderIconButtonIconProps> = ({
        disabled,
        icon,
        iconColor: rawColor,
        id,
        loading,
        size = SIZE.MEDIUM,
        type
}) => {
        const theme = useTheme()
        const color = {
                [ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
                [ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
                [ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
                [ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
                [ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
        }

        const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
        const iconColor =
                rawColor ?? (!loading ? color[type as keyof typeof color] : theme.token.scheme.onSurfaceVariant)

        const iconSize = processIconSize(theme)(size)

        return cloneElement(icon ?? <MaterialIcons name='circle' />, {
                color: disabled ? disabledColor : iconColor,
                disabled,
                style: {fontSize: platformValue(iconSize)},
                testID: `iconButton__icon--${id}`
        })
}

export const RenderIconButton = forwardRef<PressableType, RenderIconButtonProps>(
        (
                {
                        accessibilityLabel,
                        active,
                        backgroundUnderlayAnimatedStyle,
                        defaultActive,
                        disabled,
                        eventName,
                        iconElement,
                        id,
                        interactionHandlers,
                        labelText,
                        loading,
                        size = SIZE.MEDIUM,
                        testID,
                        type,
                        underlayColor,
                        ...touchableProps
                },
                ref
        ) => {
                const theme = useTheme()
                const shape = SHAPE.FULL
                const activeColor = theme.token.scheme.secondaryContainer
                const backgroundUnderlayElement = (
                        <Animated.View
                                className={clsx(
                                        'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
                                        shapeClasses(shape)
                                )}
                                style={[backgroundUnderlayAnimatedStyle]}
                                testID={`iconButton__backgroundUnderlay--${id}`}
                        />
                )

                return (
                        <View
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='button'
                                accessibilityState={{disabled}}
                                accessible={true}
                                className={clsx('relative cursor-pointer', {
                                        ['h-10 w-10']: size === SIZE.MEDIUM,
                                        ['h-12 w-12']: size === SIZE.LARGE,
                                        ['h-14 w-14']: size === SIZE.EXTRA_LARGE,
                                        ['h-6 w-6']: size === SIZE.EXTRA_SMALL,
                                        ['h-8 w-8']: size === SIZE.SMALL,
                                        ['pointer-events-none']: loading
                                })}
                                tabIndex={-1}
                                testID={testID ?? `iconButton--${id}`}
                        >
                                <LayoutAnimated
                                        className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
                                        lazy={true}
                                        testID={`iconButton__contentItemLayout--${id}`}
                                        visible={loading}
                                >
                                        <Progress
                                                animatedType={PROGRESS_ANIMATED.INDETERMINATE}
                                                content={iconElement}
                                                enableAnimated={loading}
                                                size={size}
                                                testID={`iconButton__progress--${id}`}
                                                type={PROGRESS_TYPE.CIRCULAR}
                                        />
                                </LayoutAnimated>

                                <LayoutAnimated
                                        className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
                                        testID={`iconButton__contentItemLayout--${id}`}
                                        visible={!loading}
                                >
                                        <Touchable
                                                {...touchableProps}
                                                {...interactionHandlers}
                                                backgroundUnderlay={backgroundUnderlayElement}
                                                centered={true}
                                                disabled={disabled}
                                                enableTouchableRipple={type !== ICON_BUTTON_TYPE.ACTIVE}
                                                ref={ref}
                                                shape={shape}
                                                testID={`iconButton__touchable--${id}`}
                                                underlayColor={underlayColor}
                                        >
                                                <View
                                                        className='pointer-events-none relative z-10 flex flex-1 self-stretch overflow-hidden'
                                                        testID={`iconButton__content--${id}`}
                                                >
                                                        <View
                                                                className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
                                                                testID={`iconButton__main--${id}`}
                                                        >
                                                                {iconElement}
                                                        </View>

                                                        <Underlay
                                                                active={active}
                                                                activeAnimatedType={ACTIVE_ANIMATED.SCALE}
                                                                activeColor={activeColor}
                                                                defaultActive={defaultActive}
                                                                eventName={eventName}
                                                                shape={shape}
                                                                testID={`iconButton__underlay--${id}`}
                                                                underlayColor={underlayColor}
                                                        />
                                                </View>
                                        </Touchable>
                                </LayoutAnimated>
                        </View>
                )
        }
)

RenderIconButton.displayName = 'RenderIconButton'
