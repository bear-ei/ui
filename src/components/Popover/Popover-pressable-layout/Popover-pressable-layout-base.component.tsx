import {useId, type FC} from 'react'

import type {PopoverLayoutBaseProps} from './Popover-pressable-layout.interface'

import {RenderPopoverPressableLayout} from './Popover-pressable-layout.render'

export const PopoverPressableLayoutBase: FC<PopoverLayoutBaseProps> = props => {
	const id = useId()

	return (
		<RenderPopoverPressableLayout
			{...props}
			id={id}
		/>
	)
}
