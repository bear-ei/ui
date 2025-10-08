import {shapeClasses, typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {hexToRGBA, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
import {View, type StyleProp, type ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {FAB_TYPE} from './FAB.enum'
import type {FABType, RenderFABIconProps, RenderFABProps} from './FAB.interface'

export const RenderFABIcon: FC<RenderFABIconProps> = ({disabled, size, type = FAB_TYPE.PRIMARY, id, icon}) => {
        const theme = useTheme()
        const color = useMemo(
                () =>
                        ({
                                [FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
                                [FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
                                [FAB_TYPE.SURFACE]: theme.token.scheme.primary,
                                [FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
                        }) as Record<FABType, string>,
                [
                        theme.token.scheme.onPrimaryContainer,
                        theme.token.scheme.onSecondaryContainer,
                        theme.token.scheme.onTertiaryContainer,
                        theme.token.scheme.primary
                ]
        )

        const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5.opacity)
        const iconSize = theme.token.spacing.large + 3 * theme.token.spacing.extraSmall

        if (!icon) {
                return <></>
        }

        return cloneElement(icon, {
                ...(size === SIZE.LARGE && {size: iconSize}),
                color: disabled ? disabledColor : color[type],
                disabled,
                testID: `fab__icon--${id}`
        })
}

export const RenderFAB = forwardRef<PressableType, RenderFABProps>(
        (
                {
                        accessibilityLabel,
                        backgroundUnderlayAnimatedStyle,
                        density,
                        disabled,
                        elevation,
                        eventName,
                        extendedFAB,
                        iconElement,
                        id,
                        interactionHandlers,
                        labelText,
                        labelTextAnimatedStyle,
                        size,
                        testID,
                        type,
                        underlayColor,
                        ...touchableProps
                }: RenderFABProps,
                ref
        ) => {
                const sizeShape = size === SIZE.MEDIUM ? SHAPE.LARGE : SHAPE.MEDIUM
                const shape = size === SIZE.LARGE ? SHAPE.EXTRA_LARGE : sizeShape
                const touchableContentStyle = useMemo(
                        () => ({alignSelf: size === SIZE.SMALL ? 'center' : 'stretch'}) as StyleProp<ViewStyle>,
                        [size]
                )

                const backgroundUnderlayElement = (
                        <Animated.View
                                className={clsx(
                                        'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
                                        shapeClasses(shape)
                                )}
                                style={[backgroundUnderlayAnimatedStyle]}
                                testID={`fab__backgroundUnderlay--${id}`}
                        />
                )

                const elevationUnderlayElement = (
                        <Elevation
                                level={elevation}
                                shape={shape}
                                testID={`fab__elevation--${id}`}
                        />
                )

                return (
                        <View
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='button'
                                accessibilityState={{disabled}}
                                className={clsx('cursor-pointer self-start', {
                                        ['h-10 w-10']: size === SIZE.SMALL,
                                        ['h-14 w-14']: size === SIZE.MEDIUM,
                                        ['h-24 w-24']: size === SIZE.LARGE,
                                        ['w-auto min-w-14']: extendedFAB
                                })}
                                tabIndex={-1}
                                testID={testID ?? `fab--${id}`}
                        >
                                <Touchable
                                        {...interactionHandlers}
                                        {...touchableProps}
                                        backgroundUnderlay={backgroundUnderlayElement}
                                        contentStyle={touchableContentStyle}
                                        disabled={disabled}
                                        elevationUnderlay={elevationUnderlayElement}
                                        ref={ref}
                                        shape={shape}
                                        testID={`fab__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <View
                                                className={clsx(
                                                        'pointer-events-none relative z-10 flex items-center justify-center',
                                                        {
                                                                ['h-10 w-10']: size === SIZE.SMALL,
                                                                ['h-14 w-14']: size === SIZE.MEDIUM,
                                                                ['h-24 w-24']: size === SIZE.LARGE,
                                                                ['w-auto min-w-14']: extendedFAB
                                                        }
                                                )}
                                                testID={`fab__content--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'z-10 flex flex-1 flex-row items-center justify-center self-stretch',
                                                                {
                                                                        ['pb-0 pl-2 pr-2 pt-0']: size === SIZE.SMALL,
                                                                        ['pb-0 pl-4 pr-4 pt-0']: size === SIZE.MEDIUM,
                                                                        ['pb-0 pl-7 pr-7 pt-0']: size === SIZE.LARGE,
                                                                        ['gap-3 pb-0 pl-5 pr-4 pt-0']: extendedFAB
                                                                }
                                                        )}
                                                        testID={`fab__main--${id}`}
                                                >
                                                        {iconElement && (
                                                                <View
                                                                        testID={`fab__iconLayout--${id}`}
                                                                        className='flex flex-col items-center justify-center overflow-hidden'
                                                                >
                                                                        {iconElement}
                                                                </View>
                                                        )}

                                                        {extendedFAB && labelText && (
                                                                <Animated.Text
                                                                        className={clsx(
                                                                                'select-none text-center',
                                                                                typographyClasses(TYPOGRAPHY.LABEL)(
                                                                                        SIZE.LARGE
                                                                                )
                                                                        )}
                                                                        ellipsizeMode='tail'
                                                                        numberOfLines={1}
                                                                        style={[labelTextAnimatedStyle]}
                                                                        testID={`fab__animatedLabelText--${id}`}
                                                                >
                                                                        {labelText}
                                                                </Animated.Text>
                                                        )}
                                                </View>

                                                <Underlay
                                                        eventName={eventName}
                                                        shape={shape}
                                                        testID={`fab__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        </View>
                                </Touchable>
                        </View>
                )
        }
)

RenderFAB.displayName = 'RenderFAB'
