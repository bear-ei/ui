import {useId, type FC} from 'react'

import type {LayoutNavigationBaseProps} from './Layout-navigation.interface'

import {LAYOUT_ANIMATION} from '../../Layout-animated'
import {RenderLayoutNavigation} from './Layout-navigation.render'

export const LayoutNavigationBase: FC<LayoutNavigationBaseProps> = ({
	animation = LAYOUT_ANIMATION.NONE,
	defaultVisible = true,
	...renderLayoutNavigationProps
}) => {
	const id = useId()

	return (
		<RenderLayoutNavigation
			{...renderLayoutNavigationProps}
			animation={animation}
			defaultVisible={defaultVisible}
			id={id}
		/>
	)
}
