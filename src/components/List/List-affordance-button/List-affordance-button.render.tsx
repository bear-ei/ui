import {cloneElement, forwardRef} from 'react'
import {View} from 'react-native'

import {EVENT_NAME} from '../../../constants'
import {useTheme} from '../../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapIconSize,
	densitySizeMapTypographySize,
	TYPOGRAPHY
} from '../../../theme'
import {platformValue} from '../../../utils'
import {AnimatedText, AnimatedView} from '../../Animated'
import {Touchable, type PressableType} from '../../Touchable'
import {Underlay} from '../../Underlay'

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
			size = DENSITY_SIZE.MEDIUM,
			testID,
			...touchableProps
		},
		ref
	) => {
		const {token} = useTheme()
		const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
		const {classesName, typographyClasses, densityClasses} = token.classes
		const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)()
		const underlayColor = token.scheme.onPrimary
		const iconSize = token.density.icon[densitySizeMapIconSize(size)]
		const color = token.scheme.onPrimary
		const backgroundUnderlayElement = (
			<AnimatedView
				className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10'
				style={[backgroundUnderlayAnimatedStyle]}
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
					ref={ref}
					testID={`listAffordanceButton__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<View
						className='pointer-events-none relative flex flex-1 flex-col items-center justify-center'
						testID={`listAffordanceButton__content--${id}`}
					>
						{icon ?
							cloneElement(icon, {size: platformValue(iconSize), color})
						:	<AnimatedText
								className={classesName(
									'z-20 select-none text-center',
									typographyClasses(TYPOGRAPHY.LABEL)(densitySizeMapTypographySize(size))({
										colorClasses: 'color-[--color-on-primary]'
									})
								)}
								ellipsizeMode='tail'
								numberOfLines={1}
								style={[labelTextAnimatedStyle]}
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
)

RenderListAffordanceButton.displayName = 'RenderListAffordanceButton'
