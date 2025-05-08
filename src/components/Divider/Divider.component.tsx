import {forwardRef} from 'react'
import type {View} from 'react-native'
import {DividerBase} from './Divider-base.component'
import type {DividerProps} from './Divider.interface'
import {renderDivider} from './Divider.render'

const DividerWithRef = forwardRef<View, DividerProps>((props, ref) => (
	<DividerBase
		{...props}
		ref={ref}
		renderDivider={renderDivider}
	/>
))

export const Divider = DividerWithRef
