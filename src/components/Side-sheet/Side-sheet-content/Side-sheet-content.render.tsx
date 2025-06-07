import {DURATION, EASING, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import Animated from 'react-native-reanimated'
import {Button, BUTTON_TYPE} from '../../Button'
import {Divider} from '../../Divider'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {SIDE_SHEET_POSITION} from '../Side-sheet.enum'
import type {
	RenderSideSheetContentLeadingOptions,
	RenderSideSheetContentProps,
	RenderSideSheetContentTrailingOptions
} from './Side-sheet-content.interface'
import {
	Container,
	Content,
	Footer,
	FooterLayout,
	FooterLayoutContainer,
	Header,
	HeaderText,
	HeadlineLayout,
	Leading,
	Main,
	PrimaryButton,
	SecondaryButton,
	Trailing
} from './Side-sheet-content.styles'

export const renderSideSheetContentLeading =
	({headlineLeading, back, position, id}: RenderSideSheetContentLeadingOptions) =>
	(onBack?: () => void) => {
		const iconName =
			position === SIDE_SHEET_POSITION.HORIZONTAL_START ?
				ICON_NAME.ARROW_FORWARD
			:	ICON_NAME.ARROW_BACK

		const iconElement = (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				name={iconName}
				testID={`sideSheet__iconForward--${id}`}
				type={ICON_TYPE.FILLED}
			/>
		)

		return (
			headlineLeading ??
			(back ?
				<IconButton
					icon={iconElement}
					onPressOut={onBack}
					testID={`sideSheet__backIconButton--${id}`}
					type={ICON_BUTTON_TYPE.STANDARD}
				/>
			:	undefined)
		)
	}

export const renderSideSheetContentTrailing =
	({headlineTrailing, close, id}: RenderSideSheetContentTrailingOptions) =>
	(onClose?: () => void) => {
		const iconElement = (
			<Icon
				iconStyle={ICON_STYLE.ROUNDED}
				name={ICON_NAME.CLOSE}
				testID={`sideSheet__iconClose--${id}`}
				type={ICON_TYPE.FILLED}
			/>
		)

		return (
			headlineTrailing ??
			(close ?
				<IconButton
					icon={iconElement}
					onPressOut={onClose}
					testID={`sideSheet__closeIconButton--${id}`}
					type={ICON_BUTTON_TYPE.STANDARD}
				/>
			:	undefined)
		)
	}

const AnimatedContainer = Animated.createAnimatedComponent(Container)

/**
 * TODO: Add visible animation for modal layer types.
 */
export const renderSideSheetContent = ({
	containerAnimatedStyle,
	content,
	footerVisible,
	headlineText,
	id,
	leadingElement,
	onCancel,
	onConfirm,
	position,
	primaryButton,
	primaryButtonProps,
	secondaryButton,
	secondaryButtonProps,
	shape,
	style,
	testID,
	theme,
	trailingElement,
	type,
	...contentProps
}: RenderSideSheetContentProps) => {
	const footerLayoutContainerContentSize = {height: theme.adaptFontSize(theme.token.spacing.extraSmall * 20)}
	const sheetShape =
		shape ?? (position === SIDE_SHEET_POSITION.HORIZONTAL_START ? SHAPE.LARGE_END : SHAPE.LARGE_START)

	return (
		<AnimatedContainer
			accessibilityRole='alert'
			accessible={true}
			position={position}
			style={[containerAnimatedStyle]}
			testID={testID ?? `sideSheetContent--${id}`}
			type={type}
		>
			<Content
				{...contentProps}
				shape={sheetShape}
				style={[style]}
				testID={`sideSheetContent__content--${id}`}
				type={type}
			>
				<Header
					leadingShow={!!leadingElement}
					testID={`sideSheetContent__header--${id}`}
					trailingShow={!!trailingElement}
				>
					{leadingElement && (
						<Leading testID={`sideSheetContent__leading--${id}`}>
							{leadingElement}
						</Leading>
					)}

					<HeadlineLayout testID={`sideSheetContent__headlineLayout--${id}`}>
						<HeaderText
							numberOfLines={1}
							size={SIZE.LARGE}
							testID={`sideSheetContent__headerText--${id}`}
							type={TYPOGRAPHY.TITLE}
						>
							{headlineText}
						</HeaderText>
					</HeadlineLayout>

					{trailingElement && (
						<Trailing testID={`sideSheetContent__trailing--${id}`}>
							{trailingElement}
						</Trailing>
					)}
				</Header>

				<Main testID={`sideSheetContent__main--${id}`}>{content}</Main>
				<FooterLayoutContainer
					animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
					contentSize={footerLayoutContainerContentSize}
					entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
					exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
					testID={`sideSheetContent__footerLayoutContainer--${id}`}
					visible={footerVisible}
				>
					<FooterLayout testID={`sideSheetContent__footerLayout--${id}`}>
						<Divider
							size={SIZE.LARGE}
							testID={`sideSheetContent__divider--${id}`}
						/>

						<Footer
							type={type}
							testID={`sideSheetContent__footer--${id}`}
						>
							<PrimaryButton
								testID={`sideSheetContent__primaryButton--${id}`}
							>
								{primaryButton ?? (
									<Button
										{...{
											labelText: 'Confirm',
											...primaryButtonProps
										}}
										onPressOut={onConfirm}
										testID={`sideSheetContent__confirmButton--${id}`}
										type={BUTTON_TYPE.FILLED}
									/>
								)}
							</PrimaryButton>

							<SecondaryButton
								testID={`sideSheetContent__secondaryButton--${id}`}
							>
								{secondaryButton ?? (
									<Button
										{...{
											labelText: 'Cancel',
											...secondaryButtonProps
										}}
										onPressOut={onCancel}
										testID={`sideSheetContent__cancelButton--${id}`}
										type={BUTTON_TYPE.OUTLINED}
									/>
								)}
							</SecondaryButton>
						</Footer>
					</FooterLayout>
				</FooterLayoutContainer>
			</Content>
		</AnimatedContainer>
	)
}
