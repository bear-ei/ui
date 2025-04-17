import {DURATION, SHAPE} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../Icon'
import {LAYOUT_ANIMATED} from '../Layout-animated'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {CheckboxBase} from './Checkbox-base.component'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {CheckboxIconAnimatedOptions, CheckboxProps, RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconLayout, Main} from './Checkbox.styles'

const render = ({
	density,
	disabled = false,
	error,
	eventName,
	id,
	interactionHandlers,
	testID,
	theme,
	value,
	...contentProps
}: RenderCheckboxProps) => {
	const activeFill = error ? theme.token.scheme.error : theme.token.scheme.primary
	const unselectedFill =
		value === CHECKBOX_VALUE.UNSELECTED ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

	const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
	const shape = SHAPE.FULL
	const iconSize = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)
	const checkUnderlayColor =
		value === CHECKBOX_VALUE.UNSELECTED ? theme.token.scheme.onSurfaceVariant : theme.token.scheme.primary

	const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
	const iconSvgStyle = {
		minWidth: theme.adaptSize(theme.token.spacing.large),
		minHeight: theme.adaptSize(theme.token.spacing.large)
	}

	const animatedOptions = {
		animatedType: LAYOUT_ANIMATED.SCALE,
		entry: {duration: DURATION.SHORT_2},
		exit: {duration: DURATION.SHORT_1}
	} as CheckboxIconAnimatedOptions

	return (
		<Container
			accessibilityLabel='checkbox'
			accessibilityRole='checkbox'
			accessibilityState={{disabled}}
			accessible={true}
			testID={testID ?? `checkbox--${id}`}
		>
			<Touchable
				{...interactionHandlers}
				disabled={disabled}
				mainAlignSelf='center'
				shape={shape}
				testID={`checkbox__touchable--${id}`}
				underlayColor={underlayColor}
			>
				<Content
					{...contentProps}
					density={density}
					pointerEvents='none'
					shape={shape}
					testID={`checkbox__content--${id}`}
				>
					<Main
						shape={SHAPE.TINY_SMALL}
						testID={`checkbox__main--${id}`}
					>
						<IconLayout
							testID={`checkbox__iconLayout--blank--${id}`}
							visible={true}
						>
							<Icon
								disabled={disabled}
								fill={checkBoxOutlineFill}
								iconStyle={ICON_STYLE.ROUNDED}
								name={ICON_NAME.CHECK_BOX_OUTLINE_BLANK}
								size={iconSize}
								svgStyle={iconSvgStyle}
								testID={`checkbox__iconCheckBoxOutlineBlank--${id}`}
								type={ICON_TYPE.FILLED}
							/>
						</IconLayout>

						<IconLayout
							{...animatedOptions}
							testID={`checkbox__iconLayout--selected--${id}`}
							visible={value === CHECKBOX_VALUE.SELECTED}
						>
							<Icon
								disabled={disabled}
								fill={activeFill}
								iconStyle={ICON_STYLE.ROUNDED}
								name={ICON_NAME.CHECK_BOX}
								size={iconSize}
								svgStyle={iconSvgStyle}
								testID={`checkbox__iconCheckBox--${id}`}
								type={ICON_TYPE.FILLED}
							/>
						</IconLayout>

						<IconLayout
							{...animatedOptions}
							testID={`checkbox__iconLayout--indeterminate--${id}`}
							visible={value === CHECKBOX_VALUE.INDETERMINATE}
						>
							<Icon
								disabled={disabled}
								fill={activeFill}
								iconStyle={ICON_STYLE.ROUNDED}
								name={ICON_NAME.INDETERMINATE_CHECK_BOX}
								size={iconSize}
								svgStyle={iconSvgStyle}
								testID={`checkbox__iconIndeterminateCheckBox--${id}`}
								type={ICON_TYPE.FILLED}
							/>
						</IconLayout>
					</Main>

					<Underlay
						eventName={eventName}
						shape={shape}
						testID={`checkbox__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</Content>
			</Touchable>
		</Container>
	)
}

const ForwardRefCheckbox = forwardRef<View, CheckboxProps>((props, ref) => (
	<CheckboxBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const Checkbox: FC<CheckboxProps> = ForwardRefCheckbox
