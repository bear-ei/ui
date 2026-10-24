import type {GestureResponderEvent, PanResponderInstance, TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName} from '../../../constants'
import type {HandleInteractionStateChangeOptions, InteractionHandlers} from '../../../hooks'
import type {PressableType, TouchableProps} from '../../Touchable'
import type {ListItemData, ListProps} from '../List.interface'

export interface ListItemRef extends PressableType {
	activate: () => void
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
			| 'enableTrailingClose'
			| 'divider'
			| 'enableUnderlay'
			| 'enableUnderlayActive'
			| 'focusedIndex'
			| 'gap'
			| 'onActiveKeyChange'
			| 'onAfterAffordanceActiveChange'
			| 'onSecondaryPress'
			| 'selectionType'
			| 'shape'
			| 'size'
			| 'skeletonAutoHideDelay'
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
	itemIndex: number
	itemKey: string
	onClose?: (itemKey?: string) => void
	onLoadEnd?: (itemKey?: string) => void
	onTrailingPressOut?: (event: GestureResponderEvent) => void
}

export interface RenderListItemProps extends Omit<ListItemProps, 'itemIndex'>, Pick<ListProps, 'onPrimaryAction'> {
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
	trailingElement?: React.JSX.Element
	trailingVisible?: boolean
}

export type ListItemBaseProps = ListItemProps

export interface ListItemState {
	afterAffordanceExpanded?: boolean
	eventName?: EventName
	pendingActiveEvent?: string
	pendingLoadEndEvent?: string
	status: ComponentStatus
	trailingVisible?: boolean
}

export interface HandleListItemInteractionStateChangeOptions
	extends
		HandleInteractionStateChangeOptions,
		Pick<ListItemProps, 'itemIndex' | 'itemKey' | 'onActiveKeyChange' | 'onLoadEnd' | 'type'> {}

export interface ConfirmListItemAffordanceActionOptions extends Pick<
	RenderListItemProps,
	'onAfterAffordanceActiveChange'
> {
	onClose: (itemKey?: string) => void
}

export interface RenderListItemTrailingProps extends Pick<
	RenderListItemProps,
	'afterAffordance' | 'enableTrailingClose' | 'disabled' | 'id' | 'size' | 'trailing' | 'trailingTriggerOn'
> {
	interactionHandlers: InteractionHandlers
	onTrailingHoverIn?: (eventName: EventName) => void
}

export interface UseListItemAnimatedOptions {
	active?: boolean
	afterAffordanceVisible?: boolean
	status: ComponentStatus
}

export interface TriggerListItemTrailingActionsOptions extends Pick<
	ListItemProps,
	'enableTrailingClose' | 'afterAffordance' | 'onAfterAffordanceActiveChange' | 'onPressOut'
> {
	onClose: (close?: boolean) => void
}
