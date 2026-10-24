import {Ellipsis, X} from 'lucide-react-native'
import {cloneElement, isValidElement, useCallback, type FC} from 'react'
import {Pressable, Text, View} from 'react-native'

import type {RenderListItemProps, RenderListItemTrailingProps} from './List-item.interface'

import {EVENT_NAME, ORIENTATION, TRIGGER_ON} from '../../../constants'
import {useTheme} from '../../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	ENTRY_EXIT,
	toTypographySize,
	stepDownDensitySize,
	TYPOGRAPHY,
	type DensitySizeScale
} from '../../../theme'
import {toPlatformUnit} from '../../../utils'
import {AnimatedText, AnimatedView} from '../../Animated'
import {Divider} from '../../Divider'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../../Layout-animated'
import {Skeleton} from '../../Skeleton'
import {ACTIVE_ANIMATION, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance'
import {LIST_TYPE} from '../List.enum'

const XX_SMALL_DENSITY_SIZE_SCALES = [
	DENSITY_SIZE.X_SMALL,
	DENSITY_SIZE.SMALL,
	DENSITY_SIZE.MEDIUM
] as readonly DensitySizeScale[]

export const RenderListItemTrailing: FC<RenderListItemTrailingProps> = ({
	afterAffordance,
	disabled,
	enableTrailingClose,
	id,
	interactionHandlers,
	onTrailingHoverIn,
	size = DENSITY_SIZE.MEDIUM,
	trailing,
	trailingTriggerOn
}) => {
	const onHoverIn = useCallback(() => onTrailingHoverIn?.(EVENT_NAME.HOVER_IN), [onTrailingHoverIn])
	const defaultTrailingType = enableTrailingClose ? 'enableTrailingClose' : 'standard'
	const trailingSize = stepDownDensitySize(size)
	const trailingType = afterAffordance ? 'afterAffordance' : defaultTrailingType
	const trailingProps = {
		...interactionHandlers,
		...(trailingTriggerOn === TRIGGER_ON.HOVER && {onHoverIn}),
		disabled,
		size: trailingSize,
		type: ICON_BUTTON_TYPE.STANDARD
	}

	const trailingElement = {
		afterAffordance: cloneElement(
			trailing ?? (
				<IconButton
					icon={<Ellipsis testID={`listItem__trailingIconMoreHoriz--${id}`} />}
					testID={`listItem__trailingIconButton--${id}`}
				/>
			),
			trailingProps
		),
		enableTrailingClose: cloneElement(
			trailing ?? (
				<IconButton
					icon={<X testID={`listItem__trailingIconMoreHoriz--${id}`} />}
					testID={`listItem__trailingIconButton--${id}`}
				/>
			),
			trailingProps
		),
		standard: trailing ? cloneElement(trailing, trailingProps) : undefined
	}

	return trailingElement[trailingType]
}

/**
 * TODO: Support Multiline
 */
export const RenderListItem: FC<RenderListItemProps> = ({
	accessibilityLabel,
	active,
	afterAffordance,
	afterAffordanceExpanded,
	afterAffordanceVisible,
	beforeAffordance,
	className,
	contentAnimatedStyle,
	contentStyle,
	disabled,
	divider,
	enableTrailingClose,
	enableUnderlay,
	enableUnderlayActive,
	eventName,
	headline,
	headlineTextAnimatedStyle,
	id,
	interactionHandlers,
	itemKey,
	leadingElement,
	onPrimaryAction,
	onSecondaryPress,
	panResponder,
	primaryButtonDisabled,
	primaryButtonLabelText,
	primaryButtonLoading,
	primaryButtonStyle,
	radius,
	secondaryButtonDisabled,
	secondaryButtonLabelText,
	secondaryButtonLoading,
	secondaryButtonStyle,
	selectionType,
	shape,
	size = DENSITY_SIZE.MEDIUM,
	skeletonAutoHideDelay = 300,
	skeletonElement,
	supporting,
	supportingTextNumberOfLines,
	testID,
	trailingElement,
	trailingTriggerOn,
	trailingVisible,
	type = LIST_TYPE.STANDARD,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses, shapeClasses, typographyClasses} = token.classes
	const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const densityHorizontalSpacingClasses = densityClasses(DENSITY_TYPE.SPACING, ORIENTATION.HORIZONTAL)
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const densityVerticalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.VERTICAL)
	const activeColor = token.colors.secondaryContainer
	const isSupportingTextShow = !!supporting
	const isTrailingShow = !!trailingElement
	const isLeadingShow = !!leadingElement
	const underlayColor = active ? token.colors.onSecondaryContainer : token.colors.onSurface
	const underlayProps = selectionType &&
		enableUnderlayActive && {
			active,
			activeAnimation: ACTIVE_ANIMATION.SCALE_X,
			activeColor
		}

	const isMultiline = (supportingTextNumberOfLines ?? 0) > 1
	const densityInlineSize = stepDownDensitySize(size)
	const iconSize = token.density.icon[stepDownDensitySize(densityInlineSize)]
	const isLabelType = type === LIST_TYPE.MENU || type === LIST_TYPE.LABEL
	const typographyType = isLabelType ? TYPOGRAPHY.LABEL : TYPOGRAPHY.BODY
	const typographySize = toTypographySize(isLabelType ? DENSITY_SIZE.MEDIUM : size)
	const {entry, exit} = ENTRY_EXIT.SHORT

	const animatedViewStyle = [contentStyle, contentAnimatedStyle]
	const mainElement = (
		<>
			{beforeAffordance && (
				<View
					className='flex flex-row items-center justify-center'
					testID={`listItem__beforeAffordanceContainer--${id}`}
				>
					{beforeAffordance}
				</View>
			)}

			<AnimatedView
				className={classNames('absolute bottom-0 left-0 right-0 top-0 z-20', {
					['bg-[--color-surface-container]']: type !== LIST_TYPE.STANDARD,
					['bg-[--color-surface]']: type === LIST_TYPE.STANDARD
				})}
				style={animatedViewStyle}
				testID={`listItem__animatedContent--${id}`}
			>
				<Pressable
					{...touchableProps}
					{...interactionHandlers}
					className={classNames(
						'flex flex-1 flex-col items-center justify-center self-stretch outline-none',
						className
					)}
					disabled={disabled}
					testID={`listItem__touchable--${id}`}
				>
					<View
						className={classNames(
							'relative z-10 flex flex-1 flex-row items-center justify-start self-stretch',
							densityHorizontalInsetClasses(size),
							{
								[densityVerticalInsetClasses(DENSITY_SIZE.MEDIUM)]: isSupportingTextShow && isMultiline,
								[densityVerticalInsetClasses(DENSITY_SIZE.X_SMALL)]:
									isSupportingTextShow && !isMultiline,
								['pl-[--density-inset-large]']: isLeadingShow && size === DENSITY_SIZE.X_LARGE,
								['pl-[--density-inset-small]']: isLeadingShow && size === DENSITY_SIZE.LARGE,
								['pl-[--density-inset-snug]']: isLeadingShow && size === DENSITY_SIZE.MEDIUM,
								['pl-[--density-inset-x-small]']: isLeadingShow && size === DENSITY_SIZE.SMALL,
								['pl-[--density-inset-xx-small]']: isLeadingShow && size === DENSITY_SIZE.X_SMALL,
								['pr-[--density-inset-large]']: isTrailingShow && size === DENSITY_SIZE.X_LARGE,
								['pr-[--density-inset-small]']: isTrailingShow && size === DENSITY_SIZE.LARGE,
								['pr-[--density-inset-snug]']: isTrailingShow && size === DENSITY_SIZE.MEDIUM,
								['pr-[--density-inset-x-small]']: isTrailingShow && size === DENSITY_SIZE.SMALL,
								['pr-[--density-inset-xx-small]']: isTrailingShow && size === DENSITY_SIZE.X_SMALL
							}
						)}
						testID={`listItem__main--${id}`}
					>
						{leadingElement && (
							<View
								className={classNames(
									'flex flex-col items-center justify-center',
									densityInlineClasses(densityInlineSize),
									{
										[densityHorizontalSpacingClasses(DENSITY_SIZE.SMALL)]:
											size === DENSITY_SIZE.X_LARGE,
										[densityHorizontalSpacingClasses(DENSITY_SIZE.X_SMALL)]:
											size === DENSITY_SIZE.LARGE,
										[densityHorizontalSpacingClasses(DENSITY_SIZE.XX_SMALL)]:
											XX_SMALL_DENSITY_SIZE_SCALES.includes(size),
										['justify-start']: isMultiline
									},
									'ml-0'
								)}
								testID={`listItem__leading--${id}`}
							>
								{cloneElement(leadingElement, {
									color: token.colors.onSurfaceVariant,
									size: toPlatformUnit(iconSize),
									testID: `listItem__leadingIcon--${id}`
								})}
							</View>
						)}

						<View
							className={classNames('pointer-events-none flex flex-1 flex-col justify-center', {
								['min-h-[--density-inline-medium]']: isSupportingTextShow
							})}
							testID={`listItem__mainInner--${id}`}
						>
							{headline &&
								(isValidElement(headline) ?
									cloneElement(headline, {...{active}})
								:	<AnimatedText
										className={typographyClasses(typographyType)(typographySize)}
										ellipsizeMode='tail'
										numberOfLines={1}
										style={headlineTextAnimatedStyle}
										testID={`listItem__animatedHeadlineText--${id}`}
									>
										{headline}
									</AnimatedText>)}

							{supporting &&
								(isValidElement(supporting) ? supporting : (
									<Text
										className={typographyClasses(TYPOGRAPHY.BODY, {
											colorClasses: 'color-[--color-on-surface-variant]'
										})(typographySize)}
										ellipsizeMode='tail'
										numberOfLines={supportingTextNumberOfLines}
										testID={`listItem__supportingText--${id}`}
									>
										{supporting}
									</Text>
								))}
						</View>

						{trailingElement && (
							<View
								className={classNames(
									'flex flex-col items-center justify-center',
									densityInlineClasses(densityInlineSize),
									{
										[densityHorizontalSpacingClasses(DENSITY_SIZE.SMALL)]:
											size === DENSITY_SIZE.X_LARGE,
										[densityHorizontalSpacingClasses(DENSITY_SIZE.X_SMALL)]:
											size === DENSITY_SIZE.LARGE,
										[densityHorizontalSpacingClasses(DENSITY_SIZE.XX_SMALL)]:
											XX_SMALL_DENSITY_SIZE_SCALES.includes(size),
										['justify-start']: isMultiline
									},
									'mr-0'
								)}
								testID={`listItem__trailingLayout--${id}`}
							>
								<LayoutAnimated
									animation={LAYOUT_ANIMATION.FADE}
									defaultVisible={!trailingTriggerOn}
									entry={entry}
									exit={exit}
									lazyMount={enableTrailingClose}
									testID={`listItem__trailing--${id}`}
									unmountOnHide={true}
									visible={trailingVisible}
								>
									{trailingElement}
								</LayoutAnimated>
							</View>
						)}
					</View>
				</Pressable>

				{enableUnderlay && (
					<Underlay
						{...underlayProps}
						interactionEventName={underlayEventName}
						testID={`listItem__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				)}
			</AnimatedView>

			{afterAffordance && (
				<View
					className={classNames('flex flex-1 flex-row justify-center self-end', {
						['z-10']: afterAffordanceExpanded
					})}
					testID={`listItem__afterAffordanceLayout--${id}`}
				>
					{typeof afterAffordance === 'boolean' ?
						<ListAfterAffordance
							itemKey={itemKey}
							onPrimaryAction={onPrimaryAction}
							onSecondaryPress={onSecondaryPress}
							primaryButtonDisabled={primaryButtonDisabled}
							primaryButtonLabelText={primaryButtonLabelText}
							primaryButtonLoading={primaryButtonLoading}
							primaryButtonStyle={primaryButtonStyle}
							secondaryButtonDisabled={secondaryButtonDisabled}
							secondaryButtonLabelText={secondaryButtonLabelText}
							secondaryButtonLoading={secondaryButtonLoading}
							secondaryButtonStyle={secondaryButtonStyle}
							size={size}
							testID={`listItem__listAfterAffordance--${id}`}
							visible={afterAffordanceVisible}
						/>
					:	afterAffordance}
				</View>
			)}

			{divider && (
				<View
					className='absolute bottom-0 left-0 right-0 z-20 h-[--border-small]'
					testID={`listItem__dividerLayout--${id}`}
				>
					<Divider
						orientation={ORIENTATION.HORIZONTAL}
						size={DENSITY_SIZE.LARGE}
						testID={`listItem__divider--${id}`}
					/>
				</View>
			)}
		</>
	)

	return (
		<View
			{...panResponder?.panHandlers}
			accessibilityLabel={accessibilityLabel ?? (typeof headline === 'string' ? headline : 'headline')}
			accessibilityRole='menuitem'
			className={classNames(
				'relative flex min-w-20 flex-col self-stretch overflow-hidden ',
				`${densityControlClasses(size)} w-auto`,
				shapeClasses(shape)(radius)
			)}
			tabIndex={-1}
			testID={testID ?? `listItem--${id}`}
		>
			{skeletonElement ?
				<Skeleton
					autoHideDelay={skeletonAutoHideDelay}
					orientation={ORIENTATION.HORIZONTAL}
					skeleton={skeletonElement}
					testID={`listItem__skeleton--${id}`}
				>
					{mainElement}
				</Skeleton>
			:	<View
					className='flex-1 self-stretch'
					testID={`listItem__mainLayout--${id}`}
				>
					{mainElement}
				</View>
			}
		</View>
	)
}
