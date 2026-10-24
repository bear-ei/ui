import {useId, type FC} from 'react'

import type {LayoutBaseProps} from './Layout.interface'

import {ORIENTATION} from '../../constants'
import {LAYOUT_ANIMATION} from '../Layout-animated'
import {RenderLayout} from './Layout.render'

export const LayoutBase: FC<LayoutBaseProps> = ({
	animation = LAYOUT_ANIMATION.NONE,
	defaultVisible = true,
	orientation = ORIENTATION.HORIZONTAL,
	...renderLayoutProps
}) => {
	const id = useId()

	return (
		<RenderLayout
			{...renderLayoutProps}
			animation={animation}
			defaultVisible={defaultVisible}
			id={id}
			orientation={orientation}
		/>
	)
}
