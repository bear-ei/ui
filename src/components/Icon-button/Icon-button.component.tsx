import {SHAPE} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Progress, PROGRESS_ANIMATED, PROGRESS_TYPE} from '../Progress'
import {Touchable} from '../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../Underlay'
import {IconButtonBase} from './Icon-button-base.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {IconButtonProps, RenderIconButtonProps} from './Icon-button.interface'
import {BackgroundUnderlay, Container, Content, ContentItemLayout, Main} from './Icon-button.styles'

const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const renderIconButton = ({
	accessibilityLabel,
	active,
	backgroundUnderlayAnimatedStyle,
	defaultActive,
	disabled,
	eventName,
	icon,
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
	const backgroundUnderlayElement = (
		<AnimatedBackgroundUnderlay
			pointerEvents='none'
			shape={shape}
			style={[backgroundUnderlayAnimatedStyle]}
			testID={`iconButton__animatedBackgroundUnderlay--${testID}`}
		/>
	)

	return (
		<Container
			accessibilityLabel={labelText ?? accessibilityLabel}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			accessible={true}
			pointerEvents={loading ? 'none' : 'auto'}
			testID={`iconButton--${testID}`}
		>
			<ContentItemLayout
				lazy={true}
				testID={`iconButton__contentItemLayout--${testID}`}
				visible={loading}
			>
				<Progress
					animatedType={PROGRESS_ANIMATED.INDETERMINATE}
					content={icon}
					size={theme.adaptSize(theme.token.spacing.extraSmall * 10)}
					testID={testID}
					type={PROGRESS_TYPE.CIRCULAR}
				/>
			</ContentItemLayout>

			<ContentItemLayout
				testID={`iconButton__contentItemLayout--${testID}`}
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
					testID={testID}
					underlayColor={underlayColor}
				>
					<Content
						{...contentProps}
						pointerEvents='none'
						shape={shape}
						size={size}
						testID={`iconButton__content--${testID}`}
					>
						<Main testID={`iconButton__main--${testID}`}>{icon}</Main>
						<Underlay
							active={active}
							activeAnimatedType={ACTIVE_ANIMATED.SCALE}
							activeColor={activeColor}
							defaultActive={defaultActive}
							eventName={eventName}
							shape={shape}
							testID={testID}
							underlayColor={underlayColor}
						/>
					</Content>
				</Touchable>
			</ContentItemLayout>
		</Container>
	)
}

const ButtonWithRef = forwardRef<View, IconButtonProps>((props, ref) => (
	<IconButtonBase
		{...props}
		ref={ref}
		renderIconButton={renderIconButton}
	/>
))

export const IconButton: FC<IconButtonProps> = ButtonWithRef
