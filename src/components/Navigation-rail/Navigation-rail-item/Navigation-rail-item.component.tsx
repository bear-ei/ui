import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef, memo} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {handleNavigationRailItemPropsEqual} from './Navigation-rail-item-handle'
import type {NavigationRailItemProps, RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {
	Container,
	Header,
	IconLayout,
	IconLayoutContainer,
	Label,
	LabelLayout,
	LabelText,
	TouchableContent
} from './Navigation-rail-item.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const render = ({
	active,
	activeIconElement,
	animatedType,
	eventName,
	iconElement,
	id,
	labelText,
	labelTextAnimatedStyle,
	ref,
	stateOnEvent,
	testID,
	theme,
	type,
	...containerProps
}: RenderNavigationRailItemProps) => {
	const activeAnimatedType = type === NAVIGATION_RAIL_TYPE.BLOCK ? ACTIVE_ANIMATED.SCALE : ACTIVE_ANIMATED.SCALE_X
	const activeColor = theme.token.scheme.secondaryContainer
	const isLabelVisible = animatedType === NAVIGATION_RAIL_ANIMATED.COLLAPSE ? active : true
	const shape = type === NAVIGATION_RAIL_TYPE.BLOCK ? SHAPE.FULL : SHAPE.LARGE
	const underlayColor = theme.token.scheme.onSurface

	return (
		<Container
			{...containerProps}
			accessibilityLabel={labelText}
			accessibilityRole='tab'
			testID={testID ?? `navigationRailItem--${id}`}
		>
			<TouchableContent
				{...stateOnEvent}
				enableFocusRing={false}
				ref={ref}
				testID={`navigationRailItem__touchableContent--${id}`}
			>
				<Header
					pointerEvents='none'
					testID={`navigationRailItem__header--${id}`}
					type={type}
				>
					<IconLayoutContainer testID={`navigationRailItem__iconLayout--${id}`}>
						<IconLayout
							testID={`navigationRailItem__iconLayoutAnimated--${id}`}
							visible={!active}
						>
							{iconElement}
						</IconLayout>

						<IconLayout
							testID={`navigationRailItem__iconLayoutAnimated--${id}`}
							visible={active}
						>
							{activeIconElement}
						</IconLayout>
					</IconLayoutContainer>

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
					<LabelLayout
						animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
						contentSize={{height: theme.adaptSize(theme.token.spacing.large)}}
						pointerEvents='none'
						scale={false}
						testID={`navigationRailItem__labelLayoutAnimated--${id}`}
						visible={isLabelVisible}
					>
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
					</LabelLayout>
				)}
			</TouchableContent>
		</Container>
	)
}

const ForwardRefNavigationRailItem = forwardRef<View, NavigationRailItemProps>((props, ref) => (
	<NavigationRailItemBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const NavigationRailItem = memo(ForwardRefNavigationRailItem, (prevProps, nextProps) =>
	handleNavigationRailItemPropsEqual(prevProps)(nextProps)
) as FC<NavigationRailItemProps>
