import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement} from 'react'
import Animated from 'react-native-reanimated'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE, type IconProps} from '../../Icon'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {Container, Content, Header, IconLayout, Label, LabelText, Touchable} from './Navigation-rail-item.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
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

export const renderNavigationRailItem = ({
	accessibilityLabel,
	active,
	contentAnimatedStyle,
	eventName,
	icon,
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
	const shape = type === NAVIGATION_RAIL_TYPE.BLOCK ? SHAPE.FULL : SHAPE.LARGE
	const underlayColor = theme.token.scheme.onSurface
	const iconElement = cloneElement<IconProps>(
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

	return (
		<Container
			{...containerProps}
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='tab'
			accessible={true}
			testID={testID ?? `navigationRailItem--${id}`}
		>
			<Touchable
				{...interactionHandlers}
				enableFocusRing={false}
				ref={ref}
				testID={`navigationRailItem__touchable--${id}`}
			>
				<AnimatedContent
					{...(type !== NAVIGATION_RAIL_TYPE.BLOCK && {style: [contentAnimatedStyle]})}
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
