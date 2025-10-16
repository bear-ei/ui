import {useTheme} from '@/hooks'
import {platformValue, processIconSize, shapeClasses, typographyClasses} from '@/utils'
import {hexToRGBA, SHAPE, SIZE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {cloneElement, forwardRef, type FC} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {FAB_TYPE} from './FAB.enum'
import type {FABType, RenderFABIconProps, RenderFABProps} from './FAB.interface'

export const RenderFABIcon: FC<RenderFABIconProps> = ({
        disabled,
        extended,
        icon,
        id,
        size: rawSize = SIZE.MEDIUM,
        type = FAB_TYPE.PRIMARY
}) => {
        const theme = useTheme()
        const color = {
                [FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
                [FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
                [FAB_TYPE.SURFACE]: theme.token.scheme.primary,
                [FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
        } as Record<FABType, string>

        const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
        const iconSize = processIconSize(theme)(rawSize)

        if (!icon) {
                return <></>
        }

        const size = extended ? theme.token.spacing.medium : iconSize

        return cloneElement(icon, {
                color: disabled ? disabledColor : color[type],
                disabled,
                size: platformValue(size),
                testID: `fab__icon--${id}`
        })
}

export const RenderFAB = forwardRef<PressableType, RenderFABProps>(
        (
                {
                        accessibilityLabel,
                        backgroundUnderlayAnimatedStyle,
                        disabled,
                        elevation,
                        eventName,
                        extended,
                        iconElement,
                        id,
                        interactionHandlers,
                        labelText,
                        labelTextAnimatedStyle,
                        size = SIZE.MEDIUM,
                        testID,
                        underlayColor,
                        ...touchableProps
                }: RenderFABProps,
                ref
        ) => {
                const shapeSize = {
                        [SIZE.EXTRA_LARGE]: SHAPE.LARGE,
                        [SIZE.EXTRA_SMALL]: SHAPE.MEDIUM,
                        [SIZE.LARGE]: SHAPE.LARGE,
                        [SIZE.MEDIUM]: SHAPE.LARGE,
                        [SIZE.SMALL]: SHAPE.MEDIUM
                }

                const shape = shapeSize[size]
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
                                className={clsx('cursor-pointer', {
                                        ['h-10 w-10']: !extended && size === SIZE.SMALL,
                                        ['h-12 min-w-20 self-start']: extended,
                                        ['h-12 w-12']: !extended && size === SIZE.MEDIUM,
                                        ['h-14 w-14']: !extended && size === SIZE.LARGE,
                                        ['h-16 w-16']: !extended && size === SIZE.EXTRA_LARGE,
                                        ['h-8 w-8']: !extended && size === SIZE.EXTRA_SMALL
                                })}
                                tabIndex={-1}
                                testID={testID ?? `fab--${id}`}
                        >
                                <Touchable
                                        {...interactionHandlers}
                                        {...touchableProps}
                                        backgroundUnderlay={backgroundUnderlayElement}
                                        disabled={disabled}
                                        elevationUnderlay={elevationUnderlayElement}
                                        ref={ref}
                                        shape={shape}
                                        testID={`fab__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <View
                                                className={clsx(
                                                        'pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'
                                                )}
                                                testID={`fab__content--${id}`}
                                        >
                                                <View
                                                        className={clsx(
                                                                'z-10 flex flex-1 flex-row items-center justify-center self-stretch',
                                                                {['gap-2 pl-4 pr-4']: extended}
                                                        )}
                                                        testID={`fab__main--${id}`}
                                                >
                                                        {iconElement && (
                                                                <View
                                                                        className='flex flex-col items-center justify-center overflow-hidden'
                                                                        testID={`fab__iconLayout--${id}`}
                                                                >
                                                                        {iconElement}
                                                                </View>
                                                        )}

                                                        {extended && labelText && (
                                                                <Animated.Text
                                                                        className={clsx(
                                                                                'select-none text-center',
                                                                                typographyClasses(TYPOGRAPHY.LABEL)(
                                                                                        TYPOGRAPHY_SIZE.LARGE
                                                                                )()
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
