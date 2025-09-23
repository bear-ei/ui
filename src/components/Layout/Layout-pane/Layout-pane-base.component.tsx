import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {LAYOUT} from '../../Common'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import type {LayoutPaneBaseProps} from './Layout-pane.interface'
import {RenderLayoutPane} from './Layout-pane.render'

export const LayoutPaneBase = forwardRef<View, LayoutPaneBaseProps>(
	(
		{
			animatedType = LAYOUT_ANIMATED.STANDARD,
			defaultVisible = true,
			layoutType = LAYOUT.HORIZONTAL,
			...renderLayoutPaneProps
		},
		ref
	) => {
		const id = useId()

		return (
			<RenderLayoutPane
				{...renderLayoutPaneProps}
				animatedType={animatedType}
				defaultVisible={defaultVisible}
				id={id}
				layoutType={layoutType}
				ref={ref}
			/>
		)
	}
)
