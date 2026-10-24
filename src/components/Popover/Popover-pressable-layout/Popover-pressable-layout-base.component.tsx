import {useId, type FC} from 'react'

import type {PopoverPressableLayoutBaseProps} from './Popover-pressable-layout.interface'

import {RenderPopoverPressableLayout} from './Popover-pressable-layout.render'

export const PopoverPressableLayoutBase: FC<PopoverPressableLayoutBaseProps> = props => {
	const id = useId()

	return (
		<RenderPopoverPressableLayout
			{...props}
			id={id}
		/>
	)
}
