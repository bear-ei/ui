import {useTheme} from '@/hooks'
import {classesName, platformValue, processIconSize} from '@/utils'
import {DURATION, hexToRGBA, SHAPE, SIZE} from '@bearei/theme-token'
import {Square, SquareCheckBig, SquareMinus} from 'lucide-react-native'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutAnimated} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {RenderCheckboxProps} from './Checkbox.interface'

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
			value === CHECKBOX_VALUE.UNSELECTED ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

		const checkBoxOutlineColor = error ? theme.token.scheme.error : unselectedColor
		const shape = SHAPE.FULL
		const checkUnderlayColor =
			value === CHECKBOX_VALUE.UNSELECTED ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

		const disabledColor = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
		const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
		const iconSize = processIconSize(theme)(size)

		return (
			<View
				accessibilityLabel='checkbox'
				accessibilityRole='checkbox'
				accessibilityState={{disabled}}
				accessible={true}
				className={classesName({
					['h-10 w-10']: size === SIZE.MEDIUM,
					['h-12 w-12']: size === SIZE.LARGE,
					['h-14 w-14']: size === SIZE.EXTRA_LARGE,
					['h-6 w-6']: size === SIZE.EXTRA_SMALL,
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
							<LayoutAnimated
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={{duration: DURATION.SHORT_2}}
								exit={{duration: DURATION.SHORT_1}}
								testID={`checkbox__iconLayout--blank--${id}`}
								visible={value === CHECKBOX_VALUE.UNSELECTED}
							>
								<Square
									color={disabled ? disabledColor : checkBoxOutlineColor}
									disabled={disabled}
									size={platformValue(iconSize)}
									testID={`checkbox__icon--blank--${id}`}
								/>
							</LayoutAnimated>

							<LayoutAnimated
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={{duration: DURATION.SHORT_2}}
								exit={{duration: DURATION.SHORT_1}}
								testID={`checkbox__iconLayout--selected--${id}`}
								visible={value === CHECKBOX_VALUE.SELECTED}
							>
								<SquareCheckBig
									color={disabled ? disabledColor : activeColor}
									disabled={disabled}
									size={platformValue(iconSize)}
									testID={`checkbox__icon--selected--${id}`}
								/>
							</LayoutAnimated>

							<LayoutAnimated
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={{duration: DURATION.SHORT_2}}
								exit={{duration: DURATION.SHORT_1}}
								testID={`checkbox__iconLayout--selected--${id}`}
								visible={value === CHECKBOX_VALUE.INDETERMINATE}
							>
								<SquareMinus
									color={disabled ? disabledColor : activeColor}
									disabled={disabled}
									size={platformValue(iconSize)}
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
