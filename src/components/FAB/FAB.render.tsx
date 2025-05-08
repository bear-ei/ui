import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement} from 'react'
import Animated from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import {Elevation} from '../Elevation'
import type {IconProps} from '../Icon'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FAB_TYPE} from './FAB.enum'
import type {FABType, RenderFABIconOptions, RenderFABProps} from './FAB.interface'
import {BackgroundUnderlay, Container, Content, IconLayout, LabelText, Main} from './FAB.styles'

export const renderFABIcon =
	({disabled, size, type = FAB_TYPE.PRIMARY, id}: RenderFABIconOptions) =>
	(theme: DefaultTheme) => {
		const fillType = {
			[FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
			[FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
			[FAB_TYPE.SURFACE]: theme.token.scheme.primary,
			[FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
		} as Record<FABType, string>

		return (icon?: React.JSX.Element) => {
			if (!icon) {
				return icon
			}

			const iconSize = theme.adaptSize(theme.token.spacing.large + 3 * theme.token.spacing.extraSmall)

			return cloneElement<IconProps>(icon, {
				...(size === SIZE.LARGE && {width: iconSize, height: iconSize}),
				disabled,
				fill: fillType[type],
				testID: `fab__icon--${id}`
			})
		}
	}

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
export const renderFAB = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	density,
	disabled,
	elevation,
	eventName,
	extendedFAB,
	icon,
	interactionHandlers,
	labelText,
	labelTextAnimatedStyle,
	ref,
	size,
	testID,
	id,
	type,
	underlayColor,
	...contentProps
}: RenderFABProps) => {
	const sizeShape = size === SIZE.MEDIUM ? SHAPE.LARGE : SHAPE.MEDIUM
	const shape = size === SIZE.LARGE ? SHAPE.EXTRA_LARGE : sizeShape
	const backgroundUnderlayElement = (
		<AnimatedBackgroundUnderlay
			pointerEvents='none'
			shape={shape}
			style={[backgroundUnderlayAnimatedStyle]}
			testID={`fab__animatedBackgroundUnderlay--${id}`}
		/>
	)

	const elevationUnderlayElement = (
		<Elevation
			level={elevation}
			shape={shape}
			testID={`fab__elevation--${id}`}
		/>
	)

	return (
		<Container
			accessibilityLabel={labelText ?? accessibilityLabel}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			density={density}
			extendedFAB={extendedFAB}
			size={size}
			testID={testID ?? `fab--${id}`}
		>
			<Touchable
				{...interactionHandlers}
				backgroundUnderlay={backgroundUnderlayElement}
				disabled={disabled}
				elevationUnderlay={elevationUnderlayElement}
				mainAlignSelf={size === SIZE.SMALL ? 'center' : 'stretch'}
				ref={ref}
				shape={shape}
				testID={`fab__touchable--${id}`}
				underlayColor={underlayColor}
			>
				<Content
					{...contentProps}
					density={density}
					extendedFAB={extendedFAB}
					pointerEvents='none'
					size={size}
					testID={`fab__content--${id}`}
					type={type}
				>
					<Main
						extendedFAB={extendedFAB}
						size={size}
						testID={`fab__main--${id}`}
						type={type}
					>
						{icon && (
							<IconLayout testID={`fab__iconLayout--${id}`}>
								{icon}
							</IconLayout>
						)}

						{extendedFAB && labelText && (
							<AnimatedLabelText
								size={SIZE.LARGE}
								style={[labelTextAnimatedStyle]}
								testID={`fab__animatedLabelText--${id}`}
								type={TYPOGRAPHY.LABEL}
							>
								{labelText}
							</AnimatedLabelText>
						)}
					</Main>

					<Underlay
						eventName={eventName}
						shape={shape}
						testID={`fab__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</Content>
			</Touchable>
		</Container>
	)
}
