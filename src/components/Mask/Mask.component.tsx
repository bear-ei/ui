import {forwardRef} from 'react'
import type {View} from 'react-native'
import {MaskBase} from './Mask-base.component'
import type {MaskProps} from './Mask.interface'
import {renderMask} from './Mask.render'

const MaskWithRef = forwardRef<View, MaskProps>((props, ref) => (
	<MaskBase
		{...props}
		ref={ref}
		renderMask={renderMask}
	/>
))

export const Mask = MaskWithRef
