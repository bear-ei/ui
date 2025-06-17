import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {UnderlayBase} from './Underlay-base.component'
import type {UnderlayProps} from './Underlay.interface'

const UnderlayWithRef = forwardRef<View, UnderlayProps>((props, ref) => (
	<UnderlayBase
		{...props}
		ref={ref}
	/>
))

export const Underlay = typedMemo(UnderlayWithRef)()
