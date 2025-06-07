import type {PanResponderInstance, StyleProp, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ComponentStatus, EventName, State} from '../../Common'
import type {IconButtonProps} from '../../Icon-button'
import type {TouchableProps} from '../../Touchable'
import type {ListAffordanceButtonProps} from '../List-affordance-button'
import type {ListProps} from '../List.interface'

export interface ListItemProps
	extends Partial<TouchableProps>,
		Pick<
			ListProps,
			| 'activeKey'
			| 'activeKeys'
			| 'activeTriggerEvenName'
			| 'afterAffordance'
			| 'afterAffordanceActiveKey'
			| 'afterAffordancePrimaryButtonProps'
			| 'afterAffordanceSecondaryButtonProps'
			| 'beforeAffordance'
			| 'closeTrailing'
			| 'density'
			| 'divider'
			| 'enableUnderlay'
			| 'enableUnderlayActive'
			| 'focusedIndex'
			| 'gap'
			| 'onActive'
			| 'onActiveAfterAffordance'
			| 'onCancel'
			| 'onConfirm'
			| 'selectType'
			| 'shape'
			| 'skeletonDuration'
			| 'skeletonElement'
			| 'supportingTextNumberOfLines'
			| 'trailing'
			| 'trailingTriggerEvenName'
			| 'type'
		> {
	close?: boolean

	/**
	 * Enabling ripples while using style to specify the background color can cause the ripple to be obscured, as the
	 * ripple is always one z-index level below the main container. This property is used to specify the background
	 * color when ripples are enabled.
	 */
	contentStyle?: StyleProp<ViewStyle>
	extraData?: string[]
	headline?: React.ReactNode
	indexKey?: string
	itemIndex?: number
	itemLayout?: {width?: number; height?: number}
	leading?: React.JSX.Element
	onActives?: (activeKeys?: string[]) => void
	onClose?: (indexKey?: string) => void
	onLoadEnd?: (indexKey?: string) => void
	primaryButtonProps?: ListAffordanceButtonProps
	secondaryButtonProps?: ListAffordanceButtonProps
	supporting?: string | React.JSX.Element
	trailingProps?: IconButtonProps
}

export interface RenderListItemProps extends ListItemProps {
	active?: boolean
	affordanceVisible?: boolean
	afterAffordanceVisible?: boolean
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	headlineTextAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
	leadingElement?: React.JSX.Element
	panResponder?: PanResponderInstance
	skeletonVisible?: boolean
	state?: State
	theme: DefaultTheme
	trailingElement?: React.JSX.Element
	trailingVisible?: boolean
}

export interface ListItemBaseProps extends ListItemProps {
	renderListItem: (props: RenderListItemProps) => React.JSX.Element
}

export interface ListItemState {
	eventName?: EventName
	listItemState?: State
	nextLayoutEvent?: () => void
	nextPressInEvent?: () => void
	nextPressOutEvent?: () => void
	status: ComponentStatus
	trailingVisible?: boolean
}

export interface HandleListItemStateChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<
			RenderListItemProps,
			| 'activeTriggerEvenName'
			| 'itemIndex'
			| 'indexKey'
			| 'onActive'
			| 'onLoadEnd'
			| 'selectType'
			| 'trailingTriggerEvenName'
			| 'type'
		> {}

export type HandleListItemTrailingEventOptions = {callback?: () => void}
export interface ConfirmListItemAffordanceActionOptions extends Pick<RenderListItemProps, 'onActiveAfterAffordance'> {
	onConfirm?: ListItemProps['onConfirm']
	onItemClose: (indexKey?: boolean) => void
}

export interface RenderListItemTrailingOptions
	extends Pick<
		RenderListItemProps,
		'afterAffordance' | 'closeTrailing' | 'trailing' | 'disabled' | 'trailingProps' | 'id'
	> {
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
}

export interface UseListItemAnimatedOptions {
	active?: boolean
	afterAffordanceVisible?: boolean
	onVisibilityFinished?: (visible?: boolean) => false | void
}

export interface TriggerListItemTrailingActionsOptions
	extends Pick<ListItemProps, 'closeTrailing' | 'afterAffordance' | 'onActiveAfterAffordance'> {
	onItemClose: (close?: boolean) => void
}

export type HandleListItemPanResponderReleaseOptions = Pick<ListItemProps, 'onActiveAfterAffordance' | 'disabled'>
export type ListItemContentProps = Pick<RenderListItemProps, 'type'>
export interface ListItemMainProps
	extends Pick<RenderListItemProps, 'supportingTextNumberOfLines' | 'density'>,
		ListItemContentProps {
	supportingTextShow?: boolean
}

export interface ListItemMainInnerProps extends Pick<ListItemMainProps, 'supportingTextShow' | 'type'> {
	leadingShow?: boolean
	trailingShow?: boolean
}

export type ListItemLeadingProps = Pick<RenderListItemProps, 'supportingTextNumberOfLines' | 'type'>
export interface ListItemTrailingProps extends ListItemLeadingProps {
	trailingShow?: boolean
}

export interface ListItemItemTouchableProps {
	enableFocusRing?: boolean
}
