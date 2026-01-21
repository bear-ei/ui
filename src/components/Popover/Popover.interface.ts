import type {EventName, TriggerOn} from '@/constants'
import type {HandleStateEventChangeOptions} from '@/hooks'
import type {ShapeType} from '@bearei/theme-token'
import type {JSX, RefAttributes} from 'react'
import type {LayoutRectangle, MouseEvent, TextInput, View, ViewProps} from 'react-native'
import type {ElevationLevel} from '../Elevation'
import type {LayoutAnimatedProps} from '../Layout-animated'
import type {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from './Popover.enum'

export type PopoverContentPosition = (typeof POPOVER_CONTENT_POSITION)[keyof typeof POPOVER_CONTENT_POSITION]
export type PopoverType = (typeof POPOVER_TYPE)[keyof typeof POPOVER_TYPE]
export interface PopoverProps extends ViewProps, RefAttributes<View>, Omit<LayoutAnimatedProps, 'style'> {
        children?: JSX.Element
        content?: string | JSX.Element
        defaultVisible?: boolean
        delay?: number
        disabled?: boolean
        elevation?: ElevationLevel
        onKeyDown?: (event: React.KeyboardEvent) => void
        onVisible?: (value?: boolean) => void
        popoverContentPosition?: PopoverContentPosition
        shape?: ShapeType
        triggerEvent?: TriggerOn
        type?: PopoverType
        visible?: boolean
}

export interface RenderPopoverProps extends PopoverProps {
        onContextMenu: (event: MouseEvent) => void
}

export type PopoverBaseProps = PopoverProps
export interface PopoverState {
        eventName?: EventName
        contextMenuLayout?: {x: number; y: number}
        elevation?: ElevationLevel
        nextAnimationFinishedEvent?: () => void
        nextEmitContentEvent?: () => void
        nextUnmountContentEvent?: () => void
        nextUnmountPressableLayoutEvent?: () => void
        nextVisibleEvent?: () => void
        visible?: boolean
}

export interface HandlePopoverStateEventChangeOptions
        extends HandleStateEventChangeOptions,
                Pick<PopoverProps, 'triggerEvent' | 'type'> {
        childrenRef: React.RefObject<TextInput | null>
        containerRef: React.RefObject<View | null>
        onEmitContent: (options: EmitPopoverOptions) => void
        onUnmountContent: () => void
        onUnmountPressableLayout: () => void
        onVisible: (value?: boolean) => void
}

export interface EmitPopoverOptions {
        children?: JSX.Element
        containerLayout?: Partial<LayoutRectangle>
        defaultVisible?: boolean
        visible?: boolean
}

export type UpdatePopoverContextMenuLayoutOptions = Pick<RenderPopoverProps, 'disabled' | 'onVisible'>

export interface HandlePopoverContentAnimationFinishedOptions
        extends Pick<PopoverProps, 'onAnimationFinished' | 'type'> {
        onUnmountContent?: () => void
        onUnmountPressableLayout?: () => void
}

export type UpdatePopoverVisibleOptions = Pick<RenderPopoverProps, 'type' | 'onVisible'>
