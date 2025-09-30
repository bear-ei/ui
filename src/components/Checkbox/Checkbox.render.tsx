import {SHAPE} from '@bearei/element-token'
import {forwardRef, useMemo} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_NAME, ICON_TYPE} from '../Icon'
import {LAYOUT_ANIMATED} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {CHECKBOX_VALUE} from './Checkbox.enum'
import type {CheckboxValue, RenderCheckboxProps} from './Checkbox.interface'
import {Container, Content, IconLayout, Main} from './Checkbox.styles'

export const RenderCheckbox = forwardRef<PressableType, RenderCheckboxProps>(
	(
		{
			animatedOptions,
			density = 0,
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
		const touchableContentStyle = useMemo(() => ({alignSelf: 'center'}) as StyleProp<ViewStyle>, [])
		const unselectedFill =
			value === CHECKBOX_VALUE.UNSELECTED ?
				theme.token.scheme.onSurfaceVariant
			:	theme.token.scheme.primary

		const checkBoxOutlineFill = error ? theme.token.scheme.error : unselectedFill
		const shape = SHAPE.FULL
		const checkUnderlayColor =
			value === CHECKBOX_VALUE.UNSELECTED ?
				theme.token.scheme.onSurfaceVariant
			:	theme.token.scheme.primary

		const underlayColor = error ? theme.token.scheme.error : checkUnderlayColor
		const isCheckBoxVisible =
			value &&
			([CHECKBOX_VALUE.SELECTED, CHECKBOX_VALUE.INDETERMINATE] as readonly CheckboxValue[]).includes(
				value
			)

		const iconDensity = density / 2

		return (
			<Container
				accessibilityLabel='checkbox'
				accessibilityRole='checkbox'
				accessibilityState={{disabled}}
				accessible={true}
				density={density}
				tabIndex={-1}
				testID={testID ?? `checkbox--${id}`}
			>
				<Touchable
					{...touchableProps}
					{...interactionHandlers}
					centered={true}
					contentStyle={touchableContentStyle}
					disabled={disabled}
					ref={ref}
					shape={shape}
					testID={`checkbox__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<Content
						density={density}
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
									density={iconDensity}
									disabled={disabled}
									fill={checkBoxOutlineFill}
									name={ICON_NAME.CHECK_BOX_OUTLINE_BLANK}
									testID={`checkbox__icon--blank--${id}`}
									type={ICON_TYPE.FILLED}
								/>
							</IconLayout>

							<IconLayout
								{...animatedOptions}
								testID={`checkbox__iconLayout--selected--${id}`}
								visible={isCheckBoxVisible}
							>
								<Icon
									density={iconDensity}
									disabled={disabled}
									fill={activeFill}
									name={
										value === CHECKBOX_VALUE.INDETERMINATE ?
											ICON_NAME.INDETERMINATE_CHECK_BOX
										:	ICON_NAME.CHECK_BOX
									}
									testID={`checkbox__icon--selected--${id}`}
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
