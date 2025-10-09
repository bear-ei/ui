import {PressableType, Touchable} from '@/components/Touchable'
import {Underlay} from '@/components/Underlay'
import {typographyClasses} from '@/constants'
import {useTheme} from '@/hooks'
import {SIZE, TYPOGRAPHY} from '@bearei/theme-token'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import type {RenderListAffordanceButtonProps} from './List-affordance-button.interface'

export const RenderListAffordanceButton = forwardRef<PressableType, RenderListAffordanceButtonProps>(
        (
                {
                        accessibilityLabel,
                        backgroundUnderlayAnimatedStyle,
                        disabled,
                        eventName,
                        icon,
                        id,
                        interactionHandlers,
                        labelText,
                        labelTextAnimatedStyle,
                        testID,
                        ...touchableProps
                },
                ref
        ) => {
                const theme = useTheme()
                const underlayColor = theme.token.scheme.onPrimary
                const backgroundUnderlayElement = (
                        <Animated.View
                                className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10'
                                style={[backgroundUnderlayAnimatedStyle]}
                                testID={`listAffordanceButton__backgroundUnderlay--${id}`}
                        />
                )

                return (
                        <View
                                accessibilityLabel={accessibilityLabel ?? labelText}
                                accessibilityRole='button'
                                className='flex min-w-20 cursor-pointer flex-col self-stretch'
                                tabIndex={-1}
                                testID={testID ?? `listAffordanceButton--${id}`}
                        >
                                <Touchable
                                        {...touchableProps}
                                        {...interactionHandlers}
                                        backgroundUnderlay={backgroundUnderlayElement}
                                        disabled={disabled}
                                        ref={ref}
                                        testID={`listAffordanceButton__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <View
                                                className='pointer-events-none relative flex min-w-20 flex-1 flex-col items-center justify-center'
                                                testID={`listAffordanceButton__content--${id}`}
                                        >
                                                {icon ?? (
                                                        <Animated.Text
                                                                className={clsx(
                                                                        'z-20 select-none text-center color-[--color-on-primary]',
                                                                        typographyClasses(TYPOGRAPHY.LABEL)(SIZE.LARGE)
                                                                )}
                                                                ellipsizeMode='tail'
                                                                numberOfLines={1}
                                                                style={[labelTextAnimatedStyle]}
                                                                testID={`listAffordanceButton__animatedLabelText--${id}`}
                                                        >
                                                                {labelText}
                                                        </Animated.Text>
                                                )}

                                                <Underlay
                                                        eventName={eventName}
                                                        testID={`listAffordanceButton__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        </View>
                                </Touchable>
                        </View>
                )
        }
)

RenderListAffordanceButton.displayName = 'RenderListAffordanceButton'
