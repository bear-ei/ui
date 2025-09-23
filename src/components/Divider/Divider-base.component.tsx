import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {DividerBaseProps} from './Divider.interface'
import {RenderDivider} from './Divider.render'

export const DividerBase = forwardRef<View, DividerBaseProps>(
	({layoutType, size, subheader, ...renderDividerProps}, ref) => {
		const id = useId()

		return (
			<RenderDivider
				{...renderDividerProps}
				id={id}
				layoutType={layoutType}
				ref={ref}
				size={size}
				subheader={subheader}
			/>
		)
	}
)
