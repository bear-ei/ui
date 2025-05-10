import {forwardRef, memo, type FC} from 'react'
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

export const Fab = memo(FABWithRef) as FC<FABProps>
