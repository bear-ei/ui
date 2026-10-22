import {useId, type FC} from 'react'

import type {LayoutPaneBaseProps} from './Layout-pane.interface'

import {LAYOUT} from '../../../constants'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {RenderLayoutPane} from './Layout-pane.render'

export const LayoutPaneBase: FC<LayoutPaneBaseProps> = ({
	animatedType = LAYOUT_ANIMATED.NONE,
	defaultVisible = true,
	layoutType = LAYOUT.HORIZONTAL,
	...renderLayoutPaneProps
}) => {
	const id = useId()

	return (
		<RenderLayoutPane
			{...renderLayoutPaneProps}
			animatedType={animatedType}
			defaultVisible={defaultVisible}
			id={id}
			layoutType={layoutType}
		/>
	)
}

LayoutPaneBase.displayName = 'LayoutPaneBase'
