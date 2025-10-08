import {shapeClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {hexToRGBA, SHAPE} from '@bearei/theme-token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
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
        type
}) => {
        const theme = useTheme()
        const color = useMemo(
                () => ({
                        [ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
                        [ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
                        [ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
                        [ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
                        [ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
                }),
                [
                        theme.token.scheme.onPrimary,
                        theme.token.scheme.onSecondaryContainer,
                        theme.token.scheme.onSurfaceVariant
                ]
        )

        const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5.opacity)
        const iconColor =
                rawColor ?? (!loading ? color[type as keyof typeof color] : theme.token.scheme.onSurfaceVariant)

        return cloneElement(icon ?? <MaterialCommunityIcons name='circle' />, {
                color: disabled ? disabledColor : iconColor,
                disabled,
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
                        density,
                        disabled,
                        eventName,
                        iconElement,
                        id,
                        interactionHandlers,
                        labelText,
                        loading,
                        size,
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
                                        'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-[4]',
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
                                tabIndex={-1}
                                testID={testID ?? `iconButton--${id}`}
                                className={clsx('relative h-10 w-10 cursor-pointer', {
                                        ['pointer-events-none']: loading
                                })}
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
                                                size={theme.token.spacing.extraSmall * 10}
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
                                                contentStyle={{alignSelf: 'center'}}
                                                disabled={disabled}
                                                enableTouchableRipple={type !== ICON_BUTTON_TYPE.ACTIVE}
                                                ref={ref}
                                                shape={shape}
                                                testID={`iconButton__touchable--${id}`}
                                                underlayColor={underlayColor}
                                        >
                                                <View
                                                        className={clsx(
                                                                'pointer-events-none relative z-[4] flex h-10 min-h-6 w-10 min-w-6 flex-col items-center justify-center overflow-hidden',
                                                                shapeClasses(shape)
                                                        )}
                                                        style={[
                                                                {
                                                                        ...(typeof size === 'number' && {
                                                                                height: size,
                                                                                minHeight: size,
                                                                                minWidth: size,
                                                                                width: size
                                                                        })
                                                                }
                                                        ]}
                                                        testID={`iconButton__content--${id}`}
                                                >
                                                        <View
                                                                className='z-[4]'
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
