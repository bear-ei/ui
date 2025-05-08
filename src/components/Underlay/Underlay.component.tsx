import {forwardRef} from 'react'
import type {View} from 'react-native'
import {UnderlayBase} from './Underlay-base.component'
import type {UnderlayProps} from './Underlay.interface'
import {renderUnderlay} from './Underlay.render'

const UnderlayWithRef = forwardRef<View, UnderlayProps>((props, ref) => (
	<UnderlayBase
		{...props}
		ref={ref}
		renderUnderlay={renderUnderlay}
	/>
))

export const Underlay = UnderlayWithRef
