import type {TriggerOn} from '@/constants'
import type {HandleStateEventChangeOptions, InteractionHandlers} from '@/hooks'
import type {ShapeType} from '@bearei/theme-token'
import type {JSX, RefAttributes} from 'react'
import type {LayoutRectangle, MouseEvent, View, ViewProps} from 'react-native'
import type {ElevationLevel} from '../Elevation'
import type {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from './Popover.enum'

export type PopoverContentPosition = (typeof POPOVER_CONTENT_POSITION)[keyof typeof POPOVER_CONTENT_POSITION]
export type PopoverType = (typeof POPOVER_TYPE)[keyof typeof POPOVER_TYPE]
export interface PopoverProps extends ViewProps, RefAttributes<View> {
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
        interactionHandlers: InteractionHandlers
        onContextMenu: (event: MouseEvent) => void
}

export type PopoverBaseProps = PopoverProps
export interface PopoverState {
        menuContainerLayout?: {x: number; y: number}
        nextVisibilityEvent?: () => void
        popoverVisible?: boolean
}

export interface HandlePopoverStateEventChangeOptions
        extends HandleStateEventChangeOptions,
                Pick<PopoverProps, 'triggerEvent' | 'type'> {
        onVisible: (value?: boolean) => void
}

export interface EmitPopoverOptions {
        containerLayout?: Partial<LayoutRectangle>
        visible?: boolean
}

export type UpdatePopoverContextMenuLayoutOptions = Pick<RenderPopoverProps, 'disabled' | 'onVisible'>
