import {SHAPE} from '@bearei/material-token'
import {cloneElement} from 'react'
import Animated from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import {Icon, ICON_STYLE, ICON_TYPE, type IconProps} from '../Icon'
import {Progress, PROGRESS_ANIMATED, PROGRESS_TYPE} from '../Progress'
import {Touchable} from '../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../Underlay'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {RenderIconButtonIconOptions, RenderIconButtonProps} from './Icon-button.interface'
import {BackgroundUnderlay, Container, Content, ContentItemLayout, Main} from './Icon-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
export const renderIconButtonIcon =
	({disabled, type, fill: rawFill, loading, id}: RenderIconButtonIconOptions) =>
	(theme: DefaultTheme) => {
		const fillType = {
			[ICON_BUTTON_TYPE.ACTIVE]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
			[ICON_BUTTON_TYPE.OUTLINED]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.STANDARD]: theme.token.scheme.onSurfaceVariant,
			[ICON_BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
		}

		const fill =
			rawFill ??
			(!loading ? fillType[type as keyof typeof fillType] : theme.token.scheme.onSurfaceVariant)

		return (icon?: React.JSX.Element) =>
			cloneElement<IconProps>(
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

export const renderIconButton = ({
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
	ref,
	size,
	testID,
	theme,
	type,
	underlayColor,
	...contentProps
}: RenderIconButtonProps) => {
	const shape = SHAPE.FULL
	const activeColor = theme.token.scheme.secondaryContainer
	const progressIconElement = cloneElement(iconElement ?? <></>, {
		testID: `iconButton__progressIcon--${id}`
	})

	const backgroundUnderlayElement = (
		<AnimatedBackgroundUnderlay
			pointerEvents='none'
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
			pointerEvents={loading ? 'none' : 'auto'}
			testID={testID ?? `iconButton--${id}`}
		>
			<ContentItemLayout
				lazy={true}
				testID={`iconButton__contentItemLayout--${id}`}
				visible={loading}
			>
				<Progress
					animatedType={PROGRESS_ANIMATED.INDETERMINATE}
					content={progressIconElement}
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
					{...interactionHandlers}
					backgroundUnderlay={backgroundUnderlayElement}
					disabled={disabled}
					enableTouchableRipple={type !== ICON_BUTTON_TYPE.ACTIVE}
					mainAlignSelf='center'
					ref={ref}
					shape={shape}
					testID={`iconButton__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<Content
						{...contentProps}
						pointerEvents='none'
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
