import {SHAPE} from '@bearei/element-token'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
import type {StyleProp, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Icon, ICON_STYLE, ICON_TYPE, type IconProps} from '../Icon'
import {Progress, PROGRESS_ANIMATED, PROGRESS_TYPE} from '../Progress'
import {Touchable, type PressableType} from '../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../Underlay'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {RenderIconButtonIconProps, RenderIconButtonProps} from './Icon-button.interface'
import {BackgroundUnderlay, Container, Content, ContentItemLayout, Main} from './Icon-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
export const RenderIconButtonIcon: FC<RenderIconButtonIconProps> = ({
	disabled,
	type,
	fill: rawFill,
	loading,
	id,
	icon
}) => {
	const theme = useTheme()
	const fillType = useMemo(
		() => ({
			[ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
			[ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
		}),
		[
			theme.token.scheme.onPrimary,
			theme.token.scheme.onSecondaryContainer,
			theme.token.scheme.onSurfaceVariant
		]
	)

	const fill =
		rawFill ?? (!loading ? fillType[type as keyof typeof fillType] : theme.token.scheme.onSurfaceVariant)

	return cloneElement<IconProps>(
		icon ?? (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				type={ICON_TYPE.OUTLINED}
			/>
		),
		{
			disabled,
			fill,
			testID: `iconButton__icon--${id}`
		}
	)
}

export const RenderIconButton = forwardRef<PressableType, RenderIconButtonProps>(
	(
		{
			accessibilityLabel,
			active,
			backgroundUnderlayAnimatedStyle,
			defaultActive,
			disabled,
			eventName,
			iconElement,
			id,
			interactionHandlers,
			labelText,
			loading,
			size,
			testID,
			type,
			underlayColor,
			...touchableProps
		},
		ref
	) => {
		const theme = useTheme()
		const shape = SHAPE.FULL
		const activeColor = theme.token.scheme.secondaryContainer
		const touchableContentStyle = {alignSelf: 'center'} as StyleProp<ViewStyle>
		const backgroundUnderlayElement = (
			<AnimatedBackgroundUnderlay
				shape={shape}
				style={[backgroundUnderlayAnimatedStyle]}
				testID={`iconButton__backgroundUnderlay--${id}`}
			/>
		)

		return (
			<Container
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='button'
				accessibilityState={{disabled}}
				accessible={true}
				loading={loading}
				tabIndex={-1}
				testID={testID ?? `iconButton--${id}`}
			>
				<ContentItemLayout
					lazy={true}
					testID={`iconButton__contentItemLayout--${id}`}
					visible={loading}
				>
					<Progress
						animatedType={PROGRESS_ANIMATED.INDETERMINATE}
						content={iconElement}
						enableAnimated={loading}
						size={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
						testID={`iconButton__progress--${id}`}
						type={PROGRESS_TYPE.CIRCULAR}
					/>
				</ContentItemLayout>

				<ContentItemLayout
					testID={`iconButton__contentItemLayout--${id}`}
					visible={!loading}
				>
					<Touchable
						{...touchableProps}
						{...interactionHandlers}
						backgroundUnderlay={backgroundUnderlayElement}
						centered={true}
						contentStyle={touchableContentStyle}
						disabled={disabled}
						enableTouchableRipple={type !== ICON_BUTTON_TYPE.ACTIVE}
						ref={ref}
						shape={shape}
						testID={`iconButton__touchable--${id}`}
						underlayColor={underlayColor}
					>
						<Content
							shape={shape}
							size={size}
							testID={`iconButton__content--${id}`}
						>
							<Main testID={`iconButton__main--${id}`}>{iconElement}</Main>
							<Underlay
								active={active}
								activeAnimatedType={ACTIVE_ANIMATED.SCALE}
								activeColor={activeColor}
								defaultActive={defaultActive}
								eventName={eventName}
								shape={shape}
								testID={`iconButton__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						</Content>
					</Touchable>
				</ContentItemLayout>
			</Container>
		)
	}
)
