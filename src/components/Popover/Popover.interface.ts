import type {JSX, KeyboardEvent, RefAttributes} from 'react'
import type {LayoutRectangle, MouseEvent, TextInput, View, ViewProps} from 'react-native'

import type {TriggerOn} from '../../constants'
import type {HandleStateEventChangeOptions} from '../../hooks'
import type {ThemeProps} from '../../theme'
import type {ElevationValue} from '../Elevation'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from './Popover.enum'

export type PopoverContentPosition = (typeof POPOVER_CONTENT_POSITION)[keyof typeof POPOVER_CONTENT_POSITION]
export type PopoverType = (typeof POPOVER_TYPE)[keyof typeof POPOVER_TYPE]
export interface PopoverProps
	extends ViewProps, RefAttributes<View>, Pick<LayoutAnimatedProps, 'defaultVisible' | 'visible'>, ThemeProps {
	children?: JSX.Element
	content?: string | JSX.Element
	disabled?: boolean
	elevation?: ElevationValue

	/**
	 * Called when the popover content's show/hide animation completes.
	 * This is the animation of the popover content itself, not the trigger.
	 */
	onAnimationFinished?: (visible?: boolean) => void
	onKeyDown?: (event: KeyboardEvent) => void
	onVisible?: (value?: boolean) => void
	popoverContentPosition?: PopoverContentPosition
	triggerEvent?: TriggerOn
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
	pendingRawVisibleEvent?: boolean
	pendingUnmountContentEvent?: boolean
	pendingUnmountPressableLayoutEvent?: boolean

	pendingVisibleEvent?: boolean
	visible?: boolean
}

export interface HandlePopoverStateEventChangeOptions
	extends HandleStateEventChangeOptions, Pick<PopoverProps, 'triggerEvent' | 'type' | 'onVisible'> {
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

export type UpdatePopoverContextMenuLayoutOptions = Pick<RenderPopoverProps, 'disabled' | 'onVisible'>
export interface HandlePopoverContentAnimationFinishedOptions extends Pick<
	PopoverProps,
	'onAnimationFinished' | 'type'
> {
	onUnmountContent?: () => void
	onUnmountPressableLayout?: () => void
}

export type UpdatePopoverVisibleOptions = Pick<RenderPopoverProps, 'type' | 'onVisible'>
