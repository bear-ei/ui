import {ArrowLeft, ArrowRight, X} from 'lucide-react-native'
import {type FC} from 'react'
import {Text, View} from 'react-native'

import type {
	RenderSheetContentLeadingProps,
	RenderSheetContentProps,
	RenderSheetContentTrailingProps
} from './Sheet-content.interface'

import {ORIENTATION} from '../../../constants'
import {useTheme} from '../../../hooks'
import {
	BORDER_SIZE,
	DENSITY_SIZE,
	DENSITY_TYPE,
	ENTRY_EXIT,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../../theme'
import {Button, BUTTON_TYPE} from '../../Button'
import {Divider} from '../../Divider'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../../Layout-animated'
import {SHEET_POSITION, SHEET_TYPE} from '../Sheet.enum'

export const RenderSheetContentLeading: FC<RenderSheetContentLeadingProps> = ({
	backButtonVisible,
	disabled,
	headlineLeading,
	id,
	onBack,
	position
}) =>
	headlineLeading ??
	(backButtonVisible ?
		<IconButton
			disabled={disabled}
			icon={position === SHEET_POSITION.HORIZONTAL_START ? <ArrowRight /> : <ArrowLeft />}
			onPressOut={onBack}
			size={DENSITY_SIZE.MEDIUM}
			testID={`sheet__backIconButton--${id}`}
			type={ICON_BUTTON_TYPE.STANDARD}
		/>
	:	undefined)

export const RenderSheetContentTrailing: FC<RenderSheetContentTrailingProps> = ({
	closeButtonVisible,
	headlineTrailing,
	id,
	onClose
}) =>
	headlineTrailing ??
	(closeButtonVisible ?
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
	onVisibleChange,
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
	const {classNames, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.VERTICAL)
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const footerLayoutAnimatedContentSize =
		token.density.inline[DENSITY_SIZE.XX_LARGE] +
		token.density.spacing[DENSITY_SIZE.SMALL] +
		token.border[BORDER_SIZE.SMALL]

	const positionShape = position === SHEET_POSITION.HORIZONTAL_START ? SHAPE.END : SHAPE.START
	const sheetShape = shape ?? (type === SHEET_TYPE.SIDEBAR ? SHAPE.ALL : positionShape)
	const buttonTabIndex = footerVisible ? 0 : -1
	const {entry, exit} = ENTRY_EXIT.SHORT

	return (
		<LayoutAnimated
			animation={LAYOUT_ANIMATION.FADE}
			className={classNames('flex flex-1 flex-row self-stretch overflow-hidden', {
				['justify-end']: type === SHEET_TYPE.MODAL && position === SHEET_POSITION.HORIZONTAL_END,
				['justify-start']: type === SHEET_TYPE.MODAL && position === SHEET_POSITION.HORIZONTAL_START
			})}
			defaultVisible={true}
			entry={entry}
			exit={exit}
			onVisibleChange={onVisibleChange}
			style={containerAnimatedStyle}
			testID={testID ?? `sheetContent--${id}`}
			visible={visible}
		>
			<View
				{...contentProps}
				className={classNames(
					'relative flex flex-1 flex-col overflow-hidden bg-[--color-surface-container-low]',
					{['max-w-[--density-layout-sidebar]']: type === SHEET_TYPE.SIDEBAR},
					shapeClasses(sheetShape)(radius)
				)}
				style={style}
				testID={`sheetContent__content--${id}`}
			>
				<View
					className={classNames(
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
						className={classNames(
							'flex flex-1 flex-row items-center',
							`${densityInlineClasses(DENSITY_SIZE.MEDIUM)} w-auto`
						)}
						testID={`sheetContent__headlineLayout--${id}`}
					>
						<Text
							className={classNames(
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
					animation={LAYOUT_ANIMATION.COLLAPSE_Y}
					className='absolute bottom-0 left-0 right-0 origin-bottom'
					contentSize={footerLayoutAnimatedContentSize}
					entry={entry}
					exit={exit}
					testID={`sheetContent__footerLayout--${id}`}
					translateOnCollapse={true}
					visible={footerVisible}
				>
					<View testID={`sheetContent__footerLayout--${id}`}>
						<Divider
							orientation={ORIENTATION.HORIZONTAL}
							size={DENSITY_SIZE.LARGE}
							testID={`sheetContent__divider--${id}`}
						/>

						<View
							className={classNames(
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
