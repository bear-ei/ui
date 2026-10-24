import {ArrowLeft, ArrowRight, X} from 'lucide-react-native'
import {useMemo, type FC} from 'react'
import {Text, View} from 'react-native'

import type {
	RenderSheetContentLeadingProps,
	RenderSheetContentProps,
	RenderSheetContentTrailingProps
} from './Sheet-content.interface'

import {LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {
	BORDER_SIZE,
	DENSITY_SIZE,
	DENSITY_TYPE,
	DURATION,
	EASING,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../../theme'
import {Button, BUTTON_TYPE} from '../../Button'
import {Divider} from '../../Divider'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../../Layout-animated'
import {SIDE_SHEET_POSITION, SIDE_SHEET_TYPE} from '../Sheet.enum'

export const RenderSheetContentLeading: FC<RenderSheetContentLeadingProps> = ({
	back,
	disabled,
	headlineLeading,
	id,
	onBack,
	position
}) =>
	headlineLeading ??
	(back ?
		<IconButton
			disabled={disabled}
			icon={position === SIDE_SHEET_POSITION.HORIZONTAL_START ? <ArrowRight /> : <ArrowLeft />}
			onPressOut={onBack}
			size={DENSITY_SIZE.MEDIUM}
			testID={`sheet__backIconButton--${id}`}
			type={ICON_BUTTON_TYPE.STANDARD}
		/>
	:	undefined)

export const RenderSheetContentTrailing: FC<RenderSheetContentTrailingProps> = ({
	close,
	headlineTrailing,
	id,
	onClose
}) =>
	headlineTrailing ??
	(close ?
		<IconButton
			icon={<X />}
			onPressOut={onClose}
			size={DENSITY_SIZE.MEDIUM}
			testID={`sheet__closeIconButton--${id}`}
			type={ICON_BUTTON_TYPE.STANDARD}
		/>
	:	undefined)

/**
 * TODO: Add visible animation for modal layer types.
 */
export const RenderSheetContent: FC<RenderSheetContentProps> = ({
	containerAnimatedStyle,
	content,
	footerVisible,
	headlineText,
	id,
	leadingElement,
	onCancel,
	onConfirm,
	onVisible,
	position,
	primaryButton,
	primaryButtonDisabled,
	primaryButtonLabelText = 'Confirm',
	primaryButtonLoading,
	primaryButtonStyle,
	radius = RADIUS.LARGE,
	secondaryButton,
	secondaryButtonDisabled,
	secondaryButtonLabelText = 'Cancel',
	secondaryButtonLoading,
	secondaryButtonStyle,
	shape,
	style,
	testID,
	trailingElement,
	type,
	visible,
	...contentProps
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.VERTICAL)
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.HORIZONTAL)
	const footerLayoutAnimatedContentSize =
		token.density.inline[DENSITY_SIZE.XX_LARGE] +
		token.density.spacing[DENSITY_SIZE.SMALL] +
		token.border[BORDER_SIZE.SMALL]

	const positionShape = position === SIDE_SHEET_POSITION.HORIZONTAL_START ? SHAPE.END : SHAPE.START
	const sheetShape = shape ?? (type === SIDE_SHEET_TYPE.SIDEBAR ? SHAPE.ALL : positionShape)
	const buttonTabIndex = footerVisible ? 0 : -1
	const {entry, exit} = useMemo(
		() => ({
			entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
			exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
		}),
		[]
	)

	return (
		<LayoutAnimated
			animatedType={LAYOUT_ANIMATED.FADE}
			className={classesName('flex flex-1 flex-row self-stretch overflow-hidden', {
				['justify-end']: type === SIDE_SHEET_TYPE.MODAL && position === SIDE_SHEET_POSITION.HORIZONTAL_END,
				['justify-start']: type === SIDE_SHEET_TYPE.MODAL && position === SIDE_SHEET_POSITION.HORIZONTAL_START
			})}
			defaultVisible={true}
			entry={entry}
			exit={exit}
			onVisible={onVisible}
			style={containerAnimatedStyle}
			testID={testID ?? `sheetContent--${id}`}
			visible={visible}
		>
			<View
				{...contentProps}
				className={classesName(
					'relative flex flex-1 flex-col overflow-hidden bg-[--color-surface-container-low]',
					{['max-w-[--density-layout-sidebar]']: type === SIDE_SHEET_TYPE.SIDEBAR},
					shapeClasses(sheetShape)(radius)
				)}
				style={style}
				testID={`sheetContent__content--${id}`}
			>
				<View
					className={classesName(
						'flex flex-row items-center gap-[--density-spacing-xx-small] self-stretch',
						densityVerticalInsetClasses(DENSITY_SIZE.MEDIUM),
						densityHorizontalInsetClasses(DENSITY_SIZE.LARGE),
						{
							['pl-[--density-inset-small]']: !!leadingElement,
							['pr-[--density-inset-small]']: !!trailingElement
						}
					)}
					testID={`sheetContent__header--${id}`}
				>
					{leadingElement && (
						<View
							className='flex flex-col items-center justify-center overflow-hidden'
							testID={`sheetContent__leading--${id}`}
						>
							{leadingElement}
						</View>
					)}

					<View
						className={classesName(
							'flex flex-1 flex-row items-center',
							`${densityInlineClasses(DENSITY_SIZE.MEDIUM)} w-auto`
						)}
						testID={`sheetContent__headlineLayout--${id}`}
					>
						<Text
							className={classesName(
								'select-none text-center',
								typographyClasses(TYPOGRAPHY.TITLE, {
									colorClasses: 'color-[--color-on-surface-variant]'
								})(TYPOGRAPHY_SIZE.LARGE)
							)}
							numberOfLines={1}
							testID={`sheetContent__headerText--${id}`}
						>
							{headlineText}
						</Text>
					</View>

					{trailingElement && (
						<View
							className='flex flex-col items-center justify-center overflow-hidden'
							testID={`sheetContent__trailing--${id}`}
						>
							{trailingElement}
						</View>
					)}
				</View>

				<View
					className='flex-1 self-stretch'
					testID={`sheetContent__main--${id}`}
				>
					{content}
				</View>

				<LayoutAnimated
					animatedType={LAYOUT_ANIMATED.COLLAPSE_Y}
					className='absolute bottom-0 left-0 right-0 origin-bottom'
					contentSize={footerLayoutAnimatedContentSize}
					entry={entry}
					exit={exit}
					testID={`sheetContent__footerLayout--${id}`}
					translate={true}
					visible={footerVisible}
				>
					<View testID={`sheetContent__footerLayout--${id}`}>
						<Divider
							layoutType={LAYOUT.HORIZONTAL}
							size={DENSITY_SIZE.LARGE}
							testID={`sheetContent__divider--${id}`}
						/>

						<View
							className={classesName(
								'flex flex-row gap-[--density-spacing-x-small] bg-[--color-surface-container-low] ',
								densityVerticalInsetClasses(DENSITY_SIZE.MEDIUM),
								densityHorizontalInsetClasses(DENSITY_SIZE.LARGE)
							)}
							testID={`sheetContent__footer--${id}`}
						>
							<View
								className='min-h-[--density-control-medium]'
								style={primaryButtonStyle}
								testID={`sheetContent__primaryButton--${id}`}
							>
								{primaryButton ?? (
									<Button
										disabled={primaryButtonDisabled}
										labelText={primaryButtonLabelText}
										loading={primaryButtonLoading}
										onPressOut={onConfirm}
										stretch={true}
										tabIndex={buttonTabIndex}
										testID={`sheetContent__confirmButton--${id}`}
										type={BUTTON_TYPE.FILLED}
									/>
								)}
							</View>

							<View
								className='min-h-[--density-control-medium]'
								style={secondaryButtonStyle}
								testID={`sheetContent__secondaryButton--${id}`}
							>
								{secondaryButton ?? (
									<Button
										disabled={secondaryButtonDisabled}
										labelText={secondaryButtonLabelText}
										loading={secondaryButtonLoading}
										onPressOut={onCancel}
										stretch={true}
										tabIndex={buttonTabIndex}
										testID={`sheetContent__cancelButton--${id}`}
										type={BUTTON_TYPE.OUTLINED}
									/>
								)}
							</View>
						</View>
					</View>
				</LayoutAnimated>
			</View>
		</LayoutAnimated>
	)
}
