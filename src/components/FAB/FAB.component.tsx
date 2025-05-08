import {forwardRef} from 'react'
import type {View} from 'react-native'
import {FABBase} from './FAB-base.component'
import type {FABProps} from './FAB.interface'
import {renderFAB} from './FAB.render'

const FABWithRef = forwardRef<View, FABProps>((props, ref) => (
	<FABBase
		{...props}
		ref={ref}
		renderFAB={renderFAB}
	/>
))

export const Fab = FABWithRef
