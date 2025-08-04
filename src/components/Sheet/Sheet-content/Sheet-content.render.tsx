import {DURATION, EASING, SHAPE, SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {forwardRef, useMemo, type FC} from 'react'
import type {View, ViewStyle} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {Button, BUTTON_TYPE, type ButtonProps} from '../../Button'
import {Divider} from '../../Divider'
import {Icon, ICON_NAME, ICON_TYPE} from '../../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from '../Sheet.enum'
import type {
	RenderSheetContentLeadingProps,
	RenderSheetContentProps,
	RenderSheetContentTrailingProps
} from './Sheet-content.interface'
import {
	Container,
	Content,
	Footer,
	FooterLayout,
	FooterLayoutAnimated,
	Header,
	HeaderText,
	HeadlineLayout,
	Leading,
	Main,
	PrimaryButton,
	SecondaryButton,
	Trailing
} from './Sheet-content.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const RenderSheetContentLeading: FC<RenderSheetContentLeadingProps> = ({
	back,
	headlineLeading,
	id,
	onBack,
	position
}) => {
	const iconName =
		position === SIDE_SHEET_POSITION.HORIZONTAL_START ? ICON_NAME.ARROW_FORWARD : ICON_NAME.ARROW_BACK

	const iconElement = (
		<Icon
			name={iconName}
			testID={`sheet__iconForward--${id}`}
			type={ICON_TYPE.FILLED}
		/>
	)

	return (
		headlineLeading ??
		(back ?
			<IconButton
				icon={iconElement}
				onPressOut={onBack}
				testID={`sheet__backIconButton--${id}`}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		:	undefined)
	)
}

export const RenderSheetContentTrailing: FC<RenderSheetContentTrailingProps> = ({
	close,
	headlineTrailing,
	id,
	onClose
}) => {
	const iconElement = (
		<Icon
			name={ICON_NAME.CLOSE}
			testID={`sheet__iconClose--${id}`}
			type={ICON_TYPE.FILLED}
		/>
	)

	return (
		headlineTrailing ??
		(close ?
			<IconButton
				icon={iconElement}
				onPressOut={onClose}
				testID={`sheet__closeIconButton--${id}`}
				type={ICON_BUTTON_TYPE.STANDARD}
			/>
		:	undefined)
	)
}

/**
 * TODO: Add visible animation for modal layer types.
 */
export const RenderSheetContent = forwardRef<View, RenderSheetContentProps>(
	(
		{
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
			trailingElement,
			type,
			...contentProps
		},
		ref
	) => {
		const theme = useTheme()
		const footerLayoutAnimatedContentSize = useMemo(
			() => ({
				height: theme.adaptFontSize(theme.token.spacing.extraSmall * 20)
			}),
			[theme]
		)

		const positionShape =
			position === SIDE_SHEET_POSITION.HORIZONTAL_START ? SHAPE.LARGE_END : SHAPE.LARGE_START

		const sheetShape = shape ?? (type === SIDE_SHEET_TYPE.SIDEBAR ? SHAPE.LARGE : positionShape)
		const {style: primaryButtonStyle} = primaryButtonProps ?? ({} as ButtonProps)
		const {style: secondaryButtonStyle} = secondaryButtonProps ?? ({} as ButtonProps)
		const buttonTabIndex = footerVisible ? 0 : -1

		return (
			<AnimatedContainer
				accessibilityRole='alert'
				accessible={true}
				position={position}
				style={[containerAnimatedStyle]}
				testID={testID ?? `sheetContent--${id}`}
				type={type}
			>
				<Content
					{...contentProps}
					ref={ref}
					shape={sheetShape}
					style={[style]}
					testID={`sheetContent__content--${id}`}
					type={type}
				>
					<Header
						leadingShow={!!leadingElement}
						testID={`sheetContent__header--${id}`}
						trailingShow={!!trailingElement}
						type={type}
					>
						{leadingElement && (
							<Leading testID={`sheetContent__leading--${id}`}>
								{leadingElement}
							</Leading>
						)}

						<HeadlineLayout testID={`sheetContent__headlineLayout--${id}`}>
							<HeaderText
								numberOfLines={1}
								size={SIZE.LARGE}
								testID={`sheetContent__headerText--${id}`}
								type={TYPOGRAPHY.TITLE}
							>
								{headlineText}
							</HeaderText>
						</HeadlineLayout>

						{trailingElement && (
							<Trailing testID={`sheetContent__trailing--${id}`}>
								{trailingElement}
							</Trailing>
						)}
					</Header>

					<Main testID={`sheetContent__main--${id}`}>{content}</Main>
					<FooterLayoutAnimated
						animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
						contentSize={footerLayoutAnimatedContentSize}
						entry={{
							duration: DURATION.MEDIUM_3,
							easing: EASING.EMPHASIZED_DECELERATE
						}}
						exit={{
							duration: DURATION.SHORT_3,
							easing: EASING.EMPHASIZED_ACCELERATE
						}}
						testID={`sheetContent__footerLayout--${id}`}
						translate={true}
						visible={footerVisible}
					>
						<FooterLayout testID={`sheetContent__footerLayout--${id}`}>
							<Divider
								size={SIZE.LARGE}
								testID={`sheetContent__divider--${id}`}
							/>

							<Footer
								type={type}
								testID={`sheetContent__footer--${id}`}
							>
								<PrimaryButton
									style={[primaryButtonStyle as ViewStyle]}
									testID={`sheetContent__primaryButton--${id}`}
								>
									{primaryButton ?? (
										<Button
											{...{
												labelText: 'Confirm',
												...primaryButtonProps
											}}
											onPressOut={onConfirm}
											tabIndex={buttonTabIndex}
											testID={`sheetContent__confirmButton--${id}`}
											type={BUTTON_TYPE.FILLED}
										/>
									)}
								</PrimaryButton>

								<SecondaryButton
									style={[secondaryButtonStyle as ViewStyle]}
									testID={`sheetContent__secondaryButton--${id}`}
								>
									{secondaryButton ?? (
										<Button
											{...{
												labelText: 'Cancel',
												...secondaryButtonProps
											}}
											onPressOut={onCancel}
											tabIndex={buttonTabIndex}
											testID={`sheetContent__cancelButton--${id}`}
											type={BUTTON_TYPE.OUTLINED}
										/>
									)}
								</SecondaryButton>
							</Footer>
						</FooterLayout>
					</FooterLayoutAnimated>
				</Content>
			</AnimatedContainer>
		)
	}
)
