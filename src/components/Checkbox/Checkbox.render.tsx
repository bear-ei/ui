import {SHAPE} from '@bearei/element-token'
import {forwardRef, useMemo} from 'react'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../Icon'
import {LAYOUT_ANIMATED} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconLayout, Main} from './Checkbox.styles'

export const RenderCheckbox = forwardRef<PressableType, RenderCheckboxProps>(
	(
		{
			animatedOptions,
			density,
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
		const activeFill = error ? theme.token.scheme.error : theme.token.scheme.primary
		const unselectedFill =
			value === CHECKBOX_VALUE.UNSELECTED ?
				theme.token.scheme.onSurfaceVariant
			:	theme.token.scheme.primary

		const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
		const iconSize = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)
		const shape = SHAPE.FULL
		const checkUnderlayColor =
			value === CHECKBOX_VALUE.UNSELECTED ?
				theme.token.scheme.onSurfaceVariant
			:	theme.token.scheme.primary

		const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
		const iconSvgStyle = useMemo(
			() => ({
				minHeight: theme.adaptSize(theme.token.spacing.large),
				minWidth: theme.adaptSize(theme.token.spacing.large)
			}),
			[theme]
		)

		return (
			<Container
				accessibilityLabel='checkbox'
				accessibilityRole='checkbox'
				accessibilityState={{disabled}}
				accessible={true}
				density={density}
				testID={testID ?? `checkbox--${id}`}
			>
				<Touchable
					{...touchableProps}
					{...interactionHandlers}
					centered={true}
					disabled={disabled}
					mainAlignSelf='center'
					ref={ref}
					shape={shape}
					testID={`checkbox__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<Content
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
								animatedType={LAYOUT_ANIMATED.STANDARD}
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
									testID={`checkbox__icon--blank--${id}`}
									type={ICON_TYPE.FILLED}
								/>
							</IconLayout>

							<IconLayout
								{...animatedOptions}
								lazy={true}
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
									testID={`checkbox__icon--selected--${id}`}
									type={ICON_TYPE.FILLED}
								/>
							</IconLayout>

							<IconLayout
								{...animatedOptions}
								lazy={true}
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
									testID={`checkbox__icon--indeterminate--${id}`}
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
)
