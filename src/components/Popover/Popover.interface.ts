import type {JSX, KeyboardEvent, RefAttributes} from 'react'
import type {LayoutRectangle, MouseEvent, TextInput, View, ViewProps} from 'react-native'

import type {TriggerOn} from '../../constants'
import type {HandleInteractionStateChangeOptions} from '../../hooks'
import type {ThemeableProps} from '../../theme'
import type {ElevationValue} from '../Elevation'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from './Popover.enum'

export type PopoverContentPosition = (typeof POPOVER_CONTENT_POSITION)[keyof typeof POPOVER_CONTENT_POSITION]
export type PopoverType = (typeof POPOVER_TYPE)[keyof typeof POPOVER_TYPE]
export interface PopoverProps
	extends ViewProps, RefAttributes<View>, Pick<LayoutAnimatedProps, 'defaultVisible' | 'visible'>, ThemeableProps {
	children?: JSX.Element
	content?: string | JSX.Element
	contentPosition?: PopoverContentPosition
	disabled?: boolean
	elevation?: ElevationValue

	/**
	 * Called when the popover content's show/hide animation completes.
	 * This is the animation of the popover content itself, not the trigger.
	 */
	onAnimationFinished?: (visible?: boolean) => void
	onKeyDown?: (event: KeyboardEvent) => void
	onVisibleChange?: (visible?: boolean) => void
	triggerOn?: TriggerOn
	type?: PopoverType
}

export interface RenderPopoverProps extends PopoverProps {
	onContextMenu: (event: MouseEvent) => void
}

export type PopoverBaseProps = PopoverProps
export interface PopoverState {
	contextMenuLayout?: {x: number; y: number}
	elevation?: ElevationValue
	pendingAnimationFinishedEvent?: boolean
	pendingEmitContentEvent?: EmitPopoverEvent
	pendingUnmountContentEvent?: boolean
	pendingUnmountPressableLayoutEvent?: boolean

	/**
	 * Fires when `draft.visible` actually changes (set by `updatePopoverVisible`).
	 * Consumed by the user's `rawOnVisibleChange` prop — the "value has changed"
	 * notification, in line with `pendingActiveEvent` / `pendingCloseEvent` /
	 * `pendingChangeTextEvent` etc.
	 */
	pendingVisibleEvent?: boolean

	/**
	 * Fires when a trigger event (hover / press / etc.) requests a visibility
	 * change. Consumed by the internal `onVisibleChange` wrapper (debounce/immediate
	 * branch, `updatePopoverVisible`, cross-component coordination).
	 *
	 * ⚠️ NOT the user-facing callback — see `pendingVisibleEvent`.
	 */
	pendingVisibleRequestEvent?: boolean
	visible?: boolean
}

export interface HandlePopoverInteractionStateChangeOptions
	extends HandleInteractionStateChangeOptions, Pick<PopoverProps, 'triggerOn' | 'type' | 'onVisibleChange'> {
	childrenRef: React.RefObject<TextInput | null>
	containerRef: React.RefObject<View | null>
	onEmitContent?: (event: EmitPopoverEvent) => void
	onUnmountContent?: () => void
	onUnmountPressableLayout?: () => void
}

export interface EmitPopoverEvent {
	containerLayout?: Partial<LayoutRectangle>
	visible?: boolean
}

export type HandlePopoverContextMenuOptions = Pick<RenderPopoverProps, 'disabled' | 'onVisibleChange'>
export interface HandlePopoverContentAnimationFinishedOptions extends Pick<
	PopoverProps,
	'onAnimationFinished' | 'type'
> {
	onUnmountContent?: () => void
	onUnmountPressableLayout?: () => void
}

export type UpdatePopoverVisibleOptions = Pick<RenderPopoverProps, 'type' | 'onVisibleChange'>
