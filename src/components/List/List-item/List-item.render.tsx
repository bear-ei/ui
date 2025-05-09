import {SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement, isValidElement} from 'react'
import type {ViewProps} from 'react-native'
import Animated from 'react-native-reanimated'
import {DENSITY_SCALE, LAYOUT} from '../../Common'
import {Divider} from '../../Divider'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {ICON_BUTTON_TYPE, IconButton} from '../../Icon-button'
import {Skeleton} from '../../Skeleton'
import {Touchable} from '../../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {ListAfterAffordance} from '../List-after-affordance'
import {LIST_SELECT_TYPE, LIST_TYPE} from '../List.enum'
import type {RenderListItemProps, RenderListItemTrailingOptions} from './List-item.interface'
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
	TrailingLayoutAnimated
} from './List-item.styles'

export const renderListItemTrailing = ({
	afterAffordance,
	closeTrailing,
	disabled,
	id,
	interactionHandlers,
	trailing,
	trailingProps: rawTrailingProps = {}
}: RenderListItemTrailingOptions) => {
	const standardTrailing = closeTrailing ? 'closeTrailing' : 'standard'
	const trailingType = afterAffordance ? 'afterAffordance' : standardTrailing
	const {disabled: isDisabled, ...restTrailingProps} = rawTrailingProps
	const trailingProps = {
		...interactionHandlers,
		...restTrailingProps,
		disabled: isDisabled ?? disabled,
		pointerEvents: 'box-only' as ViewProps['pointerEvents'],
		testID: `listItem__trailing--${id}`,
		type: ICON_BUTTON_TYPE.STANDARD
	}

	const trailingElement = {
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
	}

	return trailingElement[trailingType]
}

const AnimatedContent = Animated.createAnimatedComponent(Content)
const AnimatedHeadlineText = Animated.createAnimatedComponent(HeadlineText)
export const renderListItem = ({
	active,
	affordanceVisible,
	afterAffordance,
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
	onCancel,
	onConfirm,
	panResponder,
	ref,
	selectType,
	shape,
	skeletonDuration = 150,
	skeletonElement,
	supporting,
	supportingTextNumberOfLines,
	testID,
	theme,
	trailingElement,
	trailingTriggerEvenName,
	trailingVisible,
	type = LIST_TYPE.STANDARD,
	...mainProps
}: RenderListItemProps) => {
	const activeColor = theme.token.scheme.secondaryContainer
	const densityScale = DENSITY_SCALE[density ?? theme.density] * theme.token.spacing.extraSmall
	const isSupportingTextShow = !!supporting
	const isTrailingShow = !!trailingElement
	const underlayColor = active ? theme.token.scheme.onSecondaryContainer : theme.token.scheme.onSurface
	const underlayProps = selectType &&
		[LIST_SELECT_TYPE.SINGLE, LIST_SELECT_TYPE.MULTIPLE].includes(selectType) &&
		enableUnderlayActive && {
			active,
			activeAnimatedType: ACTIVE_ANIMATED.FADE,
			activeColor
		}

	const contentSize = {
		[LIST_TYPE.MENU]: {height: theme.adaptSize(theme.token.spacing.extraSmall * 12 + densityScale)},
		[LIST_TYPE.STANDARD]: {height: theme.adaptSize(theme.token.spacing.extraSmall * 14 + densityScale)}
	}

	return (
		<Container
			{...panResponder?.panHandlers}
			accessibilityLabel={typeof headline === 'string' ? headline : 'headline'}
			accessibilityRole='list'
			shape={shape}
			testID={testID ?? `listItem--${id}`}
			type={type}
		>
			<Skeleton
				contentSize={contentSize[type]}
				duration={skeletonDuration}
				layout={LAYOUT.HORIZONTAL}
				skeleton={skeletonDuration ? skeletonElement : undefined}
				testID={`listItem__skeleton--${id}`}
			>
				{beforeAffordance && (
					<BeforeAffordanceLayout testID={`listItem__beforeAffordanceContainer--${id}`}>
						{beforeAffordance}
					</BeforeAffordanceLayout>
				)}

				<AnimatedContent
					style={[contentStyle, contentAnimatedStyle]}
					testID={`listItem__animatedContent--${id}`}
					type={type}
				>
					<Touchable
						{...interactionHandlers}
						disabled={disabled}
						enableTouchableRipple={true}
						ref={ref}
						testID={`listItem__touchable--${id}`}
						underlayColor={underlayColor}
					>
						<Main
							{...mainProps}
							density={density}
							supportingTextNumberOfLines={supportingTextNumberOfLines}
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
									{leadingElement}
								</Leading>
							)}

							<MainInner
								leadingShow={!!leadingElement}
								pointerEvents='none'
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
									(isValidElement(supporting) ? supporting : (
										<SupportingText
											ellipsizeMode='tail'
											numberOfLines={
												supportingTextNumberOfLines
											}
											size={SIZE.MEDIUM}
											testID={`listItem__supportingText--${id}`}
											type={TYPOGRAPHY.BODY}
										>
											{supporting}
										</SupportingText>
									))}
							</MainInner>

							{trailingElement && (
								<TrailingLayoutAnimated
									defaultVisible={!trailingTriggerEvenName}
									supportingTextNumberOfLines={
										supportingTextNumberOfLines
									}
									testID={`listItem__trailingLayoutAnimated--${id}`}
									trailingShow={isTrailingShow}
									type={type}
									unmount={true}
									visible={trailingVisible}
								>
									{trailingElement}
								</TrailingLayoutAnimated>
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

				{afterAffordance && affordanceVisible && (
					<AfterAffordanceLayout testID={`listItem__afterAffordanceLayout--${id}`}>
						{typeof afterAffordance === 'boolean' ?
							<ListAfterAffordance
								indexKey={indexKey}
								onCancel={onCancel}
								onConfirm={onConfirm}
								primaryButtonProps={afterAffordancePrimaryButtonProps}
								secondaryButtonProps={
									afterAffordanceSecondaryButtonProps
								}
								visible={afterAffordanceVisible}
								testID={`listItem__listAfterAffordance--${id}`}
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
