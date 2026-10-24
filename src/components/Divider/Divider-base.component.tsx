import {useId, type FC} from 'react'

import type {DividerBaseProps} from './Divider.interface'

import {RenderDivider} from './Divider.render'

export const DividerBase: FC<DividerBaseProps> = ({orientation, size, subheaderText, ...renderDividerProps}) => {
	const id = useId()

	return (
		<RenderDivider
			{...renderDividerProps}
			id={id}
			orientation={orientation}
			size={size}
			subheaderText={subheaderText}
		/>
	)
}
