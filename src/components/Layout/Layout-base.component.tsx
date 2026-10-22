import {useId, type FC} from 'react'

import type {LayoutBaseProps} from './Layout.interface'

import {LAYOUT} from '../../constants'
import {LAYOUT_ANIMATED} from '../Layout-animated'
import {RenderLayout} from './Layout.render'

export const LayoutBase: FC<LayoutBaseProps> = ({
	animatedType = LAYOUT_ANIMATED.NONE,
	defaultVisible = true,
	layoutType = LAYOUT.HORIZONTAL,
	...renderLayoutProps
}) => {
	const id = useId()

	return (
		<RenderLayout
			{...renderLayoutProps}
			animatedType={animatedType}
			defaultVisible={defaultVisible}
			id={id}
			layoutType={layoutType}
		/>
	)
}
LayoutBase.displayName = 'LayoutBase'
