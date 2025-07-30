import {SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {cloneElement, forwardRef, isValidElement, useMemo, type FC} from 'react'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {LAYOUT, TRIGGER_EVENT} from '../../Common'
import {Divider} from '../../Divider'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {Skeleton} from '../../Skeleton'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance'
import {LIST_LEADING_TYPE, LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import type {ListItemRef, RenderListItemProps, RenderListItemTrailingProps} from './List-item.interface'
import {
	AfterAffordanceLayout,
	BeforeAffordanceLayout,
	Container,
	Content,
	DividerLayout,
	HeadlineText,
	Leading,
	Main,
	MainInner,
	SupportingText,
	Touchable,
	TrailingLayout
} from './List-item.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedHeadlineText = Animated.createAnimatedComponent(HeadlineText)
export const RenderListItemTrailing: FC<RenderListItemTrailingProps> = ({
	afterAffordance,
	closeTrailing,
	disabled,
	id,
	interactionHandlers,
	trailing,
	trailingProps: rawTrailingProps,
	onTrailingVisibility,
	trailingTriggerEven
}) => {
	const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
	const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
	const {disabled: isDisabled, ...restTrailingProps} = useMemo(() => rawTrailingProps ?? {}, [rawTrailingProps])
	const trailingProps = useMemo(
		() => ({
			...restTrailingProps,
			...interactionHandlers,
			...(trailingTriggerEven === TRIGGER_EVENT.HOVER && {
				onHoverIn: () => onTrailingVisibility?.(true),
				onHoverOut: () => onTrailingVisibility?.(false)
			}),
			disabled: isDisabled ?? disabled,
			testID: `listItem__trailing--${id}`,
			type: ICON_BUTTON_TYPE.STANDARD
		}),
		[
			disabled,
			id,
			interactionHandlers,
			isDisabled,
			onTrailingVisibility,
			restTrailingProps,
			trailingTriggerEven
		]
	)

	const trailingElement = useMemo(
		() => ({
			afterAffordance:
				trailing ?
					cloneElement(trailing, trailingProps)
				:	<IconButton
						{...trailingProps}
						testID={`listItem__trailingIconButton--${id}`}
						icon={
							<Icon
								iconStyle={ICON_STYLE.ROUNDED}
								name={ICON_NAME.MORE_HORIZ}
								testID={`listItem__trailingIconMoreHoriz--${id}`}
								type={ICON_TYPE.OUTLINED}
							/>
						}
					/>,
			closeTrailing:
				trailing ?
					cloneElement(trailing, trailingProps)
				:	<IconButton
						{...trailingProps}
						testID={`listItem__trailingIconButton--${id}`}
						icon={
							<Icon
								iconStyle={ICON_STYLE.ROUNDED}
								name={ICON_NAME.CLOSE}
								testID={`listItem__trailingIconClose--${id}`}
								type={ICON_TYPE.OUTLINED}
							/>
						}
					/>,
			standard: trailing ? cloneElement(trailing, trailingProps) : undefined
		}),
		[id, trailing, trailingProps]
	)

	return trailingElement[trailingType]
}

export const RenderListItem = forwardRef<ListItemRef, RenderListItemProps>(
	(
		{
			accessibilityLabel,
			active,
			afterAffordance,
			afterAffordanceExpanded,
			afterAffordancePrimaryButtonProps,
			afterAffordanceSecondaryButtonProps,
			afterAffordanceVisible,
			beforeAffordance,
			contentAnimatedStyle,
			contentStyle,
			density,
			disabled,
			divider,
			enableUnderlay,
			enableUnderlayActive,
			eventName,
			headline,
			headlineTextAnimatedStyle,
			id,
			indexKey,
			interactionHandlers,
			leadingElement,
			leadingType,
			onCancel,
			onConfirm,
			panResponder,
			selectType,
			shape,
			skeletonDuration = 300,
			skeletonElement,
			supporting,
			supportingTextNumberOfLines,
			testID,
			trailingElement,
			trailingTriggerEven,
			trailingVisible,
			type = LIST_TYPE.STANDARD,
			...touchableProps
		},
		ref
	) => {
		const theme = useTheme()
		const activeColor = theme.token.scheme.secondaryContainer
		const isSupportingTextShow = !!supporting
		const isTrailingShow = !!trailingElement
		const isUnmountTrailing = trailingTriggerEven === TRIGGER_EVENT.HOVER
		const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
		const underlayProps = useMemo(
			() =>
				selectType &&
				[LIST_SELECT_TYPE.SINGLE, LIST_SELECT_TYPE.MULTIPLE].includes(selectType) &&
				enableUnderlayActive && {
					active,
					activeAnimatedType: ACTIVE_ANIMATED.SCALE_X,
					activeColor
				},
			[active, activeColor, enableUnderlayActive, selectType]
		)

		return (
			<Container
				{...panResponder?.panHandlers}
				accessibilityLabel={
					accessibilityLabel ?? (typeof headline === 'string' ? headline : 'headline')
				}
				accessibilityRole='menuitem'
				density={density}
				shape={shape}
				tabIndex={-1}
				testID={testID ?? `listItem--${id}`}
				type={type}
			>
				<Skeleton
					duration={skeletonDuration}
					layout={LAYOUT.HORIZONTAL}
					skeleton={skeletonDuration ? skeletonElement : undefined}
					testID={`listItem__skeleton--${id}`}
				>
					{beforeAffordance && (
						<BeforeAffordanceLayout
							testID={`listItem__beforeAffordanceContainer--${id}`}
						>
							{beforeAffordance}
						</BeforeAffordanceLayout>
					)}

					<AnimatedContent
						style={[contentStyle, contentAnimatedStyle]}
						testID={`listItem__animatedContent--${id}`}
						type={type}
					>
						<Touchable
							{...touchableProps}
							{...interactionHandlers}
							disabled={disabled}
							ref={ref}
							testID={`listItem__touchable--${id}`}
						>
							<Main
								density={density}
								supportingTextNumberOfLines={
									supportingTextNumberOfLines
								}
								supportingTextShow={isSupportingTextShow}
								testID={`listItem__main--${id}`}
								type={type}
							>
								{leadingElement && (
									<Leading
										supportingTextNumberOfLines={
											supportingTextNumberOfLines
										}
										type={type}
										testID={`listItem__Leading--${id}`}
									>
										{(
											leadingType ===
											LIST_LEADING_TYPE.ICON
										) ?
											cloneElement(leadingElement, {
												type:
													active ?
														ICON_TYPE.FILLED
													:	ICON_TYPE.OUTLINED
											})
										:	leadingElement}
									</Leading>
								)}

								<MainInner
									leadingShow={!!leadingElement}
									supportingTextShow={isSupportingTextShow}
									testID={`listItem__mainInner--${id}`}
									trailingShow={isTrailingShow}
									type={type}
								>
									{headline &&
										(isValidElement(headline) ? headline : (
											<AnimatedHeadlineText
												ellipsizeMode='tail'
												numberOfLines={1}
												size={SIZE.LARGE}
												style={[
													headlineTextAnimatedStyle
												]}
												testID={`listItem__animatedHeadlineText--${id}`}
												type={TYPOGRAPHY.BODY}
											>
												{headline}
											</AnimatedHeadlineText>
										))}

									{supporting &&
										(isValidElement(supporting) ? supporting
										:	<SupportingText
												ellipsizeMode='tail'
												numberOfLines={
													supportingTextNumberOfLines
												}
												size={SIZE.MEDIUM}
												testID={`listItem__supportingText--${id}`}
												type={TYPOGRAPHY.BODY}
											>
												{supporting}
											</SupportingText>)}
								</MainInner>

								{trailingElement && (
									<TrailingLayout
										defaultVisible={!trailingTriggerEven}
										lazy={true}
										supportingTextNumberOfLines={
											supportingTextNumberOfLines
										}
										testID={`listItem__trailingLayout--${id}`}
										trailingShow={isTrailingShow}
										type={type}
										unmount={isUnmountTrailing}
										visible={trailingVisible}
									>
										{trailingElement}
									</TrailingLayout>
								)}
							</Main>
						</Touchable>

						{enableUnderlay && (
							<Underlay
								{...underlayProps}
								eventName={eventName}
								testID={`listItem__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						)}
					</AnimatedContent>

					{afterAffordance && (
						<AfterAffordanceLayout
							afterAffordanceExpanded={afterAffordanceExpanded}
							testID={`listItem__afterAffordanceLayout--${id}`}
						>
							{typeof afterAffordance === 'boolean' ?
								<ListAfterAffordance
									indexKey={indexKey}
									onCancel={onCancel}
									onConfirm={onConfirm}
									primaryButtonProps={
										afterAffordancePrimaryButtonProps
									}
									secondaryButtonProps={
										afterAffordanceSecondaryButtonProps
									}
									testID={`listItem__listAfterAffordance--${id}`}
									visible={afterAffordanceVisible}
								/>
							:	afterAffordance}
						</AfterAffordanceLayout>
					)}

					{divider && (
						<DividerLayout testID={`listItem__dividerLayout--${id}`}>
							<Divider
								layout={LAYOUT.HORIZONTAL}
								size={SIZE.LARGE}
								testID={`listItem__divider--${id}`}
							/>
						</DividerLayout>
					)}
				</Skeleton>
			</Container>
		)
	}
)
