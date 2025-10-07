import {useTheme} from '@/hooks'
import {hexToRGBA, SHAPE} from '@bearei/theme-token'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {CheckboxValue, RenderCheckboxProps} from './Checkbox.interface'

export const RenderCheckbox = forwardRef<PressableType, RenderCheckboxProps>(
        (
                {
                        animatedOptions,
                        disabled,
                        error,
                        eventName,
                        id,
                        interactionHandlers,
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

                return (
                        <View
                                accessibilityLabel='checkbox'
                                accessibilityRole='checkbox'
                                accessibilityState={{disabled}}
                                accessible={true}
                                className='h-10 w-10'
                                tabIndex={-1}
                                testID={testID ?? `checkbox--${id}`}
                        >
                                <Touchable
                                        {...touchableProps}
                                        {...interactionHandlers}
                                        centered={true}
                                        contentStyle={{alignSelf: 'center'}}
                                        disabled={disabled}
                                        ref={ref}
                                        shape={shape}
                                        testID={`checkbox__touchable--${id}`}
                                        underlayColor={underlayColor}
                                >
                                        <View
                                                className='pointer-events-none relative z-[4] h-10 w-10 overflow-hidden'
                                                testID={`checkbox__content--${id}`}
                                        >
                                                <View
                                                        className='relative z-[4] flex-1 self-stretch'
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
                                                                        size={theme.token.spacing.large}
                                                                        testID={`checkbox__icon--blank--${id}`}
                                                                />
                                                        </View>

                                                        <LayoutAnimated
                                                                {...animatedOptions}
                                                                className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
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
                                                                        size={theme.token.spacing.large}
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
