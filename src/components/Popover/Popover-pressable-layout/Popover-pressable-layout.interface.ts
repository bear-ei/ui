import type {RefAttributes} from 'react'
import type {LayoutRectangle, PressableProps} from 'react-native'

import type {InteractionHandlers} from '../../../hooks'
import type {PressableType} from '../../Touchable'

export interface PopoverPressableLayoutProps extends Omit<
	PressableProps & RefAttributes<PressableType> & InteractionHandlers,
	'children' | 'disabled' | 'hitSlop' | 'style'
> {
	containerLayout?: Partial<LayoutRectangle>
}

export type PopoverPressableLayoutBaseProps = PopoverPressableLayoutProps
export type RenderPopoverPressableLayoutProps = PopoverPressableLayoutProps
