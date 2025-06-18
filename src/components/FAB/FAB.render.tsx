import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Elevation} from '../Elevation'
import type {IconProps} from '../Icon'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {FAB_TYPE} from './FAB.enum'
import type {FABType, RenderFABIconProps, RenderFABProps} from './FAB.interface'
import {BackgroundUnderlay, Container, Content, IconLayout, LabelText, Main} from './FAB.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
export const RenderFABIcon: FC<RenderFABIconProps> = ({disabled, size, type = FAB_TYPE.PRIMARY, id, icon}) => {
	const theme = useTheme()
	const fillType = useMemo(
		() =>
			({
				[FAB_TYPE.PRIMARY]: theme.token.scheme.onPrimaryContainer,
				[FAB_TYPE.SECONDARY]: theme.token.scheme.onSecondaryContainer,
				[FAB_TYPE.SURFACE]: theme.token.scheme.primary,
				[FAB_TYPE.TERTIARY]: theme.token.scheme.onTertiaryContainer
			}) as Record<FABType, string>,
		[
			theme.token.scheme.onPrimaryContainer,
			theme.token.scheme.onSecondaryContainer,
			theme.token.scheme.onTertiaryContainer,
			theme.token.scheme.primary
		]
	)

	const iconSize = theme.adaptSize(theme.token.spacing.large + 3 * theme.token.spacing.extraSmall)

	if (!icon) {
		return <></>
	}

	return cloneElement<IconProps>(icon, {
		...(size === SIZE.LARGE && {width: iconSize, height: iconSize}),
		disabled,
		fill: fillType[type],
		testID: `fab__icon--${id}`
	})
}

export const RenderFAB = forwardRef<PressableType, RenderFABProps>(
	(
		{
			accessibilityLabel,
			backgroundUnderlayAnimatedStyle,
			density,
			disabled,
			elevation,
			eventName,
			extendedFAB,
			iconElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			size,
			testID,
			type,
			underlayColor,
			...touchableProps
		}: RenderFABProps,
		ref
	) => {
		const sizeShape = size === SIZE.MEDIUM ? SHAPE.LARGE : SHAPE.MEDIUM
		const shape = size === SIZE.LARGE ? SHAPE.EXTRA_LARGE : sizeShape
		const backgroundUnderlayElement = (
			<AnimatedBackgroundUnderlay
				pointerEvents='none'
				shape={shape}
				style={[backgroundUnderlayAnimatedStyle]}
				testID={`fab__backgroundUnderlay--${id}`}
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
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='button'
				accessibilityState={{disabled}}
				density={density}
				extendedFAB={extendedFAB}
				size={size}
				testID={testID ?? `fab--${id}`}
			>
				<Touchable
					{...interactionHandlers}
					{...touchableProps}
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
							{iconElement && (
								<IconLayout testID={`fab__iconLayout--${id}`}>
									{iconElement}
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
)
