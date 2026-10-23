import type {GestureResponderEvent, PanResponderInstance, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName, State} from '../../../constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {PressableType, TouchableProps} from '../../Touchable'
import type {ListItemData, ListProps} from '../List.interface'

export interface ListItemRef extends PressableType {
	active: () => void
	close: () => void
}

export interface ListItemProps
	extends
		TouchableProps,
		Pick<
			ListProps,
			| 'activeKey'
			| 'activeKeys'
			| 'afterAffordance'
			| 'afterAffordanceActiveKey'
			| 'beforeAffordance'
			| 'closeTrailing'
			| 'divider'
			| 'enableUnderlay'
			| 'enableUnderlayActive'
			| 'focusedIndex'
			| 'gap'
			| 'onActive'
			| 'onActiveAfterAffordance'
			| 'onSecondaryAction'
			| 'selectType'
			| 'shape'
			| 'size'
			| 'skeletonDuration'
			| 'skeletonElement'
			| 'trailingTriggerOn'
			| 'type'
		>,
		Pick<
			ListItemData,
			| 'contentStyle'
			| 'dependencies'
			| 'headline'
			| 'leading'
			| 'primaryButtonDisabled'
			| 'primaryButtonLabelText'
			| 'primaryButtonLoading'
			| 'primaryButtonStyle'
			| 'secondaryButtonDisabled'
			| 'secondaryButtonLabelText'
			| 'secondaryButtonLoading'
			| 'secondaryButtonStyle'
			| 'supporting'
			| 'supportingTextNumberOfLines'
			| 'trailing'
		> {
	indexKey: string
	itemIndex: number
	onClose?: (indexKey?: string) => void
	onLoadEnd?: (indexKey?: string) => void
	onTrailingPressOut?: (event: GestureResponderEvent) => void
}

export interface RenderListItemProps extends Omit<ListItemProps, 'itemIndex'>, Pick<ListProps, 'onConfirm'> {
	active?: boolean
	affordanceVisible?: boolean
	afterAffordanceExpanded?: boolean
	afterAffordanceVisible?: boolean
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	headlineTextAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
	leadingElement?: React.JSX.Element
	onTrailingUnmount?: () => void
	panResponder?: PanResponderInstance
	skeletonVisible?: boolean
	state?: State
	trailingElement?: React.JSX.Element
	trailingVisible?: boolean
}

export type ListItemBaseProps = ListItemProps

export interface ListItemState {
	afterAffordanceExpanded?: boolean
	eventName?: EventName
	pendingActiveEvent?: string
	pendingLoadEnd?: string
	status: ComponentStatus
	trailingVisible?: boolean
}

export interface HandleListItemStateChangeOptions
	extends
		HandleStateEventChangeOptions,
		Pick<ListItemProps, 'itemIndex' | 'indexKey' | 'onActive' | 'onLoadEnd' | 'type'> {}

export interface ConfirmListItemAffordanceActionOptions extends Pick<RenderListItemProps, 'onActiveAfterAffordance'> {
	onClose: (indexKey?: string) => void
}

export interface RenderListItemTrailingProps extends Pick<
	RenderListItemProps,
	'afterAffordance' | 'closeTrailing' | 'disabled' | 'id' | 'size' | 'trailing' | 'trailingTriggerOn'
> {
	interactionHandlers: InteractionHandlers
	onTrailingVisible?: (eventName: EventName) => void
}

export interface UseListItemAnimatedOptions {
	active?: boolean
	afterAffordanceVisible?: boolean
	onVisibleFinished?: (visible?: boolean) => false
	status: ComponentStatus
}

export interface TriggerListItemTrailingActionsOptions extends Pick<
	ListItemProps,
	'closeTrailing' | 'afterAffordance' | 'onActiveAfterAffordance' | 'onPressOut'
> {
	onClose: (close?: boolean) => void
}

export type AffordanceLayoutProps = Pick<RenderListItemProps, 'afterAffordanceExpanded'>
