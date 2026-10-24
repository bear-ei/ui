import {Square, SquareCheckBig, SquareMinus} from 'lucide-react-native'
import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderCheckboxProps} from './Checkbox.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, ENTRY_EXIT, hexToRGBA, RADIUS, SHAPE, stepDownDensitySize} from '../../theme'
import {platformValue} from '../../utils'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {CHECKBOX_VALUE} from './Checkbox.enum'

export const RenderCheckbox: FC<RenderCheckboxProps> = ({
	accessibilityLabel,
	disabled,
	error,
	eventName,
	id,
	labelText,
	onStateEventChange,
	ref,
	size = DENSITY_SIZE.MEDIUM,
	status,
	testID,
	value,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const activeColor = error ? token.scheme.error : token.scheme.primary
	const unselectedColor = value === CHECKBOX_VALUE.UNSELECTED ? token.scheme.onSurfaceVariant : token.scheme.primary
	const checkBoxOutlineColor = error ? token.scheme.error : unselectedColor
	const disabledColor = hexToRGBA(token.scheme.onSurface, token.opacity.level5)
	const iconSize = token.density.icon[stepDownDensitySize(size)]
	const radius = RADIUS.FULL
	const shape = SHAPE.ALL
	const underlayColor = error ? token.scheme.error : unselectedColor
	const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
	const {entry, exit} = ENTRY_EXIT.SHORT

	const checked =
		value === CHECKBOX_VALUE.SELECTED ? true
		: value === CHECKBOX_VALUE.INDETERMINATE ? 'mixed'
		: false

	return (
		<View
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='checkbox'
			accessibilityState={{checked, disabled}}
			accessible={true}
			className={classesName(densityControlClasses(size), {['pointer-events-none']: disabled})}
			tabIndex={-1}
			testID={testID ?? `checkbox--${id}`}
		>
			{status === COMPONENT_STATUS.SUCCEEDED && (
				<Touchable
					{...touchableProps}
					centered={true}
					disabled={disabled}
					onStateEventChange={onStateEventChange}
					radius={radius}
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
								animatedType={LAYOUT_ANIMATED.FADE}
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={entry}
								exit={exit}
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
								animatedType={LAYOUT_ANIMATED.FADE}
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={entry}
								exit={exit}
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
								animatedType={LAYOUT_ANIMATED.FADE}
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={entry}
								exit={exit}
								testID={`checkbox__iconLayout--indeterminate--${id}`}
								visible={value === CHECKBOX_VALUE.INDETERMINATE}
							>
								<SquareMinus
									color={disabled ? disabledColor : activeColor}
									disabled={disabled}
									size={platformValue(iconSize)}
									testID={`checkbox__icon--indeterminate--${id}`}
								/>
							</LayoutAnimated>
						</View>

						<Underlay
							eventName={underlayEventName}
							radius={radius}
							shape={shape}
							testID={`checkbox__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</View>
				</Touchable>
			)}
		</View>
	)
}
