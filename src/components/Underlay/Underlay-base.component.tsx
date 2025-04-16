import {forwardRef, useId, useMemo} from 'react'
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
			render,
			...renderProps
		},
		ref
	) => {
		const id = useId()
		const active = useMemo(() => rawActive ?? defaultActive, [defaultActive, rawActive])
		const {hoverLayerAnimatedStyle, activeLayerAnimatedStyle} = useUnderlayAnimated({
			active,
			activeAnimatedType,
			activeScale,
			eventName,
			opacities
		})

		return render({...renderProps, active, activeLayerAnimatedStyle, hoverLayerAnimatedStyle, id, ref})
	}
)
