import {Square, SquareCheckBig, SquareMinus} from 'lucide-react-native'
import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderCheckboxProps} from './Checkbox.interface'

import {COMPONENT_STATUS, EVENT_NAME} from '../../constants'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, ENTRY_EXIT, hexToRGBA, RADIUS, SHAPE, stepDownDensitySize} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../Layout-animated'
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
	onInteractionStateChange,
	ref,
	size = DENSITY_SIZE.MEDIUM,
	status,
	testID,
	value,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const checkedColor = error ? token.colors.error : token.colors.primary
	const unselectedColor = value === CHECKBOX_VALUE.UNSELECTED ? token.colors.onSurfaceVariant : token.colors.primary
	const checkBoxOutlineColor = error ? token.colors.error : unselectedColor
	const disabledColor = hexToRGBA(token.colors.onSurface, token.opacity.level5)
	const iconSize = token.density.icon[stepDownDensitySize(size)]
	const radius = RADIUS.FULL
	const shape = SHAPE.ALL
	const underlayColor = error ? token.colors.error : unselectedColor
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
			className={classNames(densityControlClasses(size), {['pointer-events-none']: disabled})}
			tabIndex={-1}
			testID={testID ?? `checkbox--${id}`}
		>
			{status === COMPONENT_STATUS.SUCCEEDED && (
				<Touchable
					{...touchableProps}
					disabled={disabled}
					onInteractionStateChange={onInteractionStateChange}
					radius={radius}
					ref={ref}
					rippleCentered={true}
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
								animation={LAYOUT_ANIMATION.FADE}
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={entry}
								exit={exit}
								testID={`checkbox__iconLayout--blank--${id}`}
								visible={value === CHECKBOX_VALUE.UNSELECTED}
							>
								<Square
									color={disabled ? disabledColor : checkBoxOutlineColor}
									disabled={disabled}
									size={toPlatformUnit(iconSize)}
									testID={`checkbox__icon--blank--${id}`}
								/>
							</LayoutAnimated>

							<LayoutAnimated
								animation={LAYOUT_ANIMATION.FADE}
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={entry}
								exit={exit}
								testID={`checkbox__iconLayout--selected--${id}`}
								visible={value === CHECKBOX_VALUE.SELECTED}
							>
								<SquareCheckBig
									color={disabled ? disabledColor : checkedColor}
									disabled={disabled}
									size={toPlatformUnit(iconSize)}
									testID={`checkbox__icon--selected--${id}`}
								/>
							</LayoutAnimated>

							<LayoutAnimated
								animation={LAYOUT_ANIMATION.FADE}
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								entry={entry}
								exit={exit}
								testID={`checkbox__iconLayout--indeterminate--${id}`}
								visible={value === CHECKBOX_VALUE.INDETERMINATE}
							>
								<SquareMinus
									color={disabled ? disabledColor : checkedColor}
									disabled={disabled}
									size={toPlatformUnit(iconSize)}
									testID={`checkbox__icon--indeterminate--${id}`}
								/>
							</LayoutAnimated>
						</View>

						<Underlay
							interactionEventName={underlayEventName}
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
