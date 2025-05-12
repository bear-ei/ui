import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {UnderlayBaseProps} from './Underlay.interface'
import {useUnderlayAnimated} from './use-underlay-animated.hook'

export const UnderlayBase = forwardRef<View, UnderlayBaseProps>(
	(
		{
			active: rawActive,
			activeAnimatedType,
			activeScale,
			defaultActive,
			eventName,
			opacities,
			renderUnderlay,
			...renderUnderlayProps
		},
		ref
	) => {
		const id = useId()
		const isActive = rawActive ?? defaultActive
		const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
			active: isActive,
			activeAnimatedType,
			activeScale,
			eventName,
			opacities
		})

		return renderUnderlay({
			...renderUnderlayProps,
			active: isActive,
			activeLayerAnimatedStyle,
			hoverLayerAnimatedStyle,
			id,
			ref
		})
	}
)
