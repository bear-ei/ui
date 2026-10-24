import {useId, type FC} from 'react'

import type {LayoutPaneBaseProps} from './Layout-pane.interface'

import {ORIENTATION} from '../../../constants'
import {LAYOUT_ANIMATION} from '../../Layout-animated'
import {RenderLayoutPane} from './Layout-pane.render'

export const LayoutPaneBase: FC<LayoutPaneBaseProps> = ({
	animation = LAYOUT_ANIMATION.NONE,
	defaultVisible = true,
	orientation = ORIENTATION.HORIZONTAL,
	...renderLayoutPaneProps
}) => {
	const id = useId()

	return (
		<RenderLayoutPane
			{...renderLayoutPaneProps}
			animation={animation}
			defaultVisible={defaultVisible}
			id={id}
			orientation={orientation}
		/>
	)
}
