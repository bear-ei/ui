import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {DividerBaseProps} from './Divider.interface'
import {RenderDivider} from './Divider.render'

export const DividerBase = forwardRef<View, DividerBaseProps>(
	({layout, size, subheader, ...renderDividerProps}, ref) => {
		const id = useId()

		return (
			<RenderDivider
				{...renderDividerProps}
				id={id}
				layout={layout}
				ref={ref}
				size={size}
				subheader={subheader}
			/>
		)
	}
)
