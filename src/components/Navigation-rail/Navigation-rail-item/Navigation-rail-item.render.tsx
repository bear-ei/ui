import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement} from 'react'
import Animated from 'react-native-reanimated'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE, type IconProps} from '../../Icon'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {
	Container,
	Header,
	IconLayoutContainer,
	Label,
	LabelLayout,
	LabelText,
	TouchableContent
} from './Navigation-rail-item.styles'

export const renderNavigationRailItemIcon = (id: string) => (icon?: React.JSX.Element) => (active?: boolean) =>
	cloneElement<IconProps>(
		icon ?? (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				name={ICON_NAME.CIRCLE}
				type={ICON_TYPE.OUTLINED}
			/>
		),
		{
			iconStyle: ICON_STYLE.ROUNDED,
			testID: `navigationRailItem__icon--${id}`,
			type: active ? ICON_TYPE.FILLED : ICON_TYPE.OUTLINED
		}
	)

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
export const renderNavigationRailItem = ({
	active,
	animatedType,
	eventName,
	iconElement,
	id,
	interactionHandlers,
	labelText,
	labelTextAnimatedStyle,
	ref,
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
			accessible={true}
			testID={testID ?? `navigationRailItem--${id}`}
		>
			<TouchableContent
				{...interactionHandlers}
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
						{iconElement}
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
