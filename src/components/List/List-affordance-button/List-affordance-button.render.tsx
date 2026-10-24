import {cloneElement, type FC} from 'react'
import {View} from 'react-native'

import type {RenderListAffordanceButtonProps} from './List-affordance-button.interface'

import {EVENT_NAME} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, stepDownDensitySize, densitySizeMapTypographySize, TYPOGRAPHY} from '../../../theme'
import {platformValue} from '../../../utils'
import {AnimatedText, AnimatedView} from '../../Animated'
import {Touchable} from '../../Touchable'
import {Underlay} from '../../Underlay'

export const RenderListAffordanceButton: FC<RenderListAffordanceButtonProps> = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	disabled,
	eventName,
	icon,
	id,
	interactionHandlers,
	labelText,
	labelTextAnimatedStyle,
	size = DENSITY_SIZE.MEDIUM,
	testID,
	...touchableProps
}) => {
	const {token} = useTheme()
	const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
	const {classesName, densityClasses, typographyClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const underlayColor = token.scheme.onPrimary
	const iconSize = token.density.icon[stepDownDensitySize(size)]
	const color = token.scheme.onPrimary
	const backgroundUnderlayElement = (
		<AnimatedView
			className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10'
			style={backgroundUnderlayAnimatedStyle}
			testID={`listAffordanceButton__backgroundUnderlay--${id}`}
		/>
	)

	return (
		<View
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='button'
			className={classesName(
				'flex cursor-pointer flex-col',
				`${densityControlClasses(DENSITY_SIZE.XX_LARGE)} h-auto`
			)}
			tabIndex={-1}
			testID={testID ?? `listAffordanceButton--${id}`}
		>
			<Touchable
				{...touchableProps}
				{...interactionHandlers}
				backgroundUnderlay={backgroundUnderlayElement}
				disabled={disabled}
				testID={`listAffordanceButton__touchable--${id}`}
				underlayColor={underlayColor}
			>
				<View
					className='pointer-events-none relative flex flex-1 flex-col items-center justify-center'
					testID={`listAffordanceButton__content--${id}`}
				>
					{icon ?
						cloneElement(icon, {color, size: platformValue(iconSize)})
					:	<AnimatedText
							className={classesName(
								'z-20 select-none text-center',
								typographyClasses(TYPOGRAPHY.LABEL, {
									colorClasses: 'color-[--color-on-primary]'
								})(densitySizeMapTypographySize(size))
							)}
							ellipsizeMode='tail'
							numberOfLines={1}
							style={labelTextAnimatedStyle}
							testID={`listAffordanceButton__animatedLabelText--${id}`}
						>
							{labelText}
						</AnimatedText>
					}

					<Underlay
						eventName={underlayEventName}
						testID={`listAffordanceButton__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</View>
			</Touchable>
		</View>
	)
}
