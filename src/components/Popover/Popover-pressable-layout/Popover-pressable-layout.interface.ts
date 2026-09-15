import type {RefAttributes} from 'react'
import type {LayoutRectangle, PressableProps} from 'react-native'
import type {PressableType} from '../../Touchable'
import type {InteractionHandlers} from '../../../hooks'

export interface PopoverLayoutProps extends Omit<
	PressableProps & RefAttributes<PressableType> & InteractionHandlers,
	'children' | 'disabled' | 'hitSlop' | 'style'
> {
	containerLayout?: Partial<LayoutRectangle>
}

export type PopoverLayoutBaseProps = PopoverLayoutProps
export type RenderPopoverLayoutProps = PopoverLayoutProps
