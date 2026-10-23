import {useId, type FC} from 'react'

import type {DividerBaseProps} from './Divider.interface'

import {RenderDivider} from './Divider.render'

export const DividerBase: FC<DividerBaseProps> = ({layoutType, size, subheader, ...renderDividerProps}) => {
	const id = useId()

	return (
		<RenderDivider
			{...renderDividerProps}
			id={id}
			layoutType={layoutType}
			size={size}
			subheader={subheader}
		/>
	)
}
