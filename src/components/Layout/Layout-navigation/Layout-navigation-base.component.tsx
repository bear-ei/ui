import {useId, type FC} from 'react'

import type {LayoutNavigationBaseProps} from './Layout-navigation.interface'

import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {RenderLayoutNavigation} from './Layout-navigation.render'

export const LayoutNavigationBase: FC<LayoutNavigationBaseProps> = ({
	animatedType = LAYOUT_ANIMATED.NONE,
	defaultVisible = true,
	...renderLayoutNavigationProps
}) => {
	const id = useId()

	return (
		<RenderLayoutNavigation
			{...renderLayoutNavigationProps}
			animatedType={animatedType}
			defaultVisible={defaultVisible}
			id={id}
		/>
	)
}


