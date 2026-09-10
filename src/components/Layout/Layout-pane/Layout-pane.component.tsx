import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LayoutPaneBase} from './Layout-pane-base.component'
import type {LayoutPaneProps} from './Layout-pane.interface'

const LayoutPaneWithRef = forwardRef<View, LayoutPaneProps>((props, ref) => (
	<LayoutPaneBase
		{...props}
		ref={ref}
	/>
))

LayoutPaneWithRef.displayName = 'LayoutPaneWithRef'

export const LayoutPane = typedMemo(LayoutPaneWithRef)()
