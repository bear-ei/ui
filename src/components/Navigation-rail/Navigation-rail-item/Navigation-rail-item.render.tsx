import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {Container, Content, Header, IconLayout, Label, LabelText, Touchable} from './Navigation-rail-item.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
export const RenderNavigationRailItem = forwardRef<typeof Pressable, RenderNavigationRailItemProps>(
	(
		{
			accessibilityLabel,
			active,
			contentAnimatedStyle,
			eventName,
			iconElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			testID,
			type,
			...touchableProps
		},
		ref
	) => {
		const theme = useTheme()
		const activeAnimatedType =
			type === NAVIGATION_RAIL_TYPE.BLOCK ? ACTIVE_ANIMATED.SCALE : ACTIVE_ANIMATED.SCALE_X

		const activeColor = theme.token.scheme.secondaryContainer
		const shape = type === NAVIGATION_RAIL_TYPE.BLOCK ? SHAPE.FULL : SHAPE.LARGE
		const underlayColor = theme.token.scheme.onSurface

		return (
			<Container
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='tab'
				accessible={true}
				testID={testID ?? `navigationRailItem--${id}`}
			>
				<Touchable
					{...touchableProps}
					{...interactionHandlers}
					ref={ref}
					testID={`navigationRailItem__touchable--${id}`}
				>
					<AnimatedContent
						{...(type !== NAVIGATION_RAIL_TYPE.BLOCK && {
							style: [contentAnimatedStyle]
						})}
						testID={`navigationRailItem__content--${id}`}
					>
						<Header
							pointerEvents='none'
							testID={`navigationRailItem__header--${id}`}
							type={type}
						>
							<IconLayout testID={`navigationRailItem__iconLayout--${id}`}>
								{iconElement}
							</IconLayout>

							<Underlay
								active={active}
								activeAnimatedType={activeAnimatedType}
								activeColor={activeColor}
								activeShape={SHAPE.FULL}
								eventName={eventName}
								shape={shape}
								testID={`navigationRailItem__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						</Header>

						{type === NAVIGATION_RAIL_TYPE.SEGMENT && (
							<Label testID={`navigationRailItem__label--${id}`}>
								<AnimatedLabelText
									active={active}
									ellipsizeMode='tail'
									numberOfLines={1}
									size={SIZE.MEDIUM}
									style={[labelTextAnimatedStyle]}
									testID={`navigationRailItem__animatedLabelText--${id}`}
									type={TYPOGRAPHY.LABEL}
								>
									{labelText}
								</AnimatedLabelText>
							</Label>
						)}
					</AnimatedContent>
				</Touchable>
			</Container>
		)
	}
)
