import {useTheme} from '@/hooks'
import {DURATION, hexToRGBA, SHAPE, SIZE} from '@bearei/theme-token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {CheckboxValue, RenderCheckboxProps} from './Checkbox.interface'

export const RenderCheckbox = forwardRef<PressableType, RenderCheckboxProps>(
        (
                {
                        disabled,
                        error,
                        eventName,
                        id,
                        interactionHandlers,
                        size = SIZE.MEDIUM,
                        testID,
                        value,
                        ...touchableProps
                }: RenderCheckboxProps,
                ref
        ) => {
                const theme = useTheme()
                const activeColor = error ? theme.token.scheme.error : theme.token.scheme.primary
                const unselectedColor =
                        value === CHECKBOX_VALUE.UNSELECTED ?
                                theme.token.scheme.onSurfaceVariant
                        :       theme.token.scheme.primary

                const checkBoxOutlineColor = error ? theme.token.scheme.error : unselectedColor
                const shape = SHAPE.FULL
                const checkUnderlayColor =
                        value === CHECKBOX_VALUE.UNSELECTED ?
                                theme.token.scheme.onSurfaceVariant
                        :       theme.token.scheme.primary

                const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5.opacity)
                const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
                const isCheckBoxVisible =
                        value &&
                        ([CHECKBOX_VALUE.SELECTED, CHECKBOX_VALUE.INDETERMINATE] as readonly CheckboxValue[]).includes(
                                value
                        )

                const iconSize = {
                        [SIZE.LARGE]: theme.token.spacing.large + theme.token.spacing.extraSmall,
                        [SIZE.MEDIUM]: theme.token.spacing.large,
                        [SIZE.SMALL]: theme.token.spacing.large - theme.token.spacing.extraSmall
                }

                return (
                        <View
                                accessibilityLabel='checkbox'
                                accessibilityRole='checkbox'
                                accessibilityState={{disabled}}
                                accessible={true}
                                className={clsx({
                                        ['h-12 w-12']: size === SIZE.LARGE,
                                        ['h-10 w-10']: size === SIZE.MEDIUM,
                                        ['h-8 w-8']: size === SIZE.SMALL
                                })}
                                tabIndex={-1}
                                testID={testID ?? `checkbox--${id}`}
                        >
                                <Touchable
                                        {...touchableProps}
                                        {...interactionHandlers}
                                        centered={true}
                                        disabled={disabled}
                                        ref={ref}
                                        shape={shape}
                                        testID={`checkbox__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <View
                                                className='pointer-events-none relative z-10 flex flex-1 self-stretch overflow-hidden'
                                                testID={`checkbox__content--${id}`}
                                        >
                                                <View
                                                        className='relative z-10 flex-1 self-stretch'
                                                        testID={`checkbox__main--${id}`}
                                                >
                                                        <View
                                                                className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
                                                                testID={`checkbox__iconLayout--blank--${id}`}
                                                        >
                                                                <MaterialCommunityIcons
                                                                        color={
                                                                                disabled ? disabledColor : (
                                                                                        checkBoxOutlineColor
                                                                                )
                                                                        }
                                                                        disabled={disabled}
                                                                        name='checkbox-blank-outline'
                                                                        size={iconSize[size]}
                                                                        testID={`checkbox__icon--blank--${id}`}
                                                                />
                                                        </View>

                                                        <LayoutAnimated
                                                                animatedType={LAYOUT_ANIMATED.SCALE}
                                                                className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
                                                                entry={{duration: DURATION.SHORT_2}}
                                                                exit={{duration: DURATION.SHORT_1}}
                                                                testID={`checkbox__iconLayout--selected--${id}`}
                                                                visible={isCheckBoxVisible}
                                                        >
                                                                <MaterialCommunityIcons
                                                                        color={disabled ? disabledColor : activeColor}
                                                                        disabled={disabled}
                                                                        name={
                                                                                value === CHECKBOX_VALUE.INDETERMINATE ?
                                                                                        'checkbox-intermediate'
                                                                                :       'checkbox-marked'
                                                                        }
                                                                        size={iconSize[size]}
                                                                        testID={`checkbox__icon--selected--${id}`}
                                                                />
                                                        </LayoutAnimated>
                                                </View>

                                                <Underlay
                                                        eventName={eventName}
                                                        shape={shape}
                                                        testID={`checkbox__underlay--${id}`}
                                                        underlayColor={underlayColor}
                                                />
                                        </View>
                                </Touchable>
                        </View>
                )
        }
)

RenderCheckbox.displayName = 'RenderCheckbox'
