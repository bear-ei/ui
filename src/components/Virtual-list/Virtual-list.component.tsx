import type {ForwardedRef} from 'react'
import {forwardRef} from 'react'
import Animated from 'react-native-reanimated'
import {VirtualListBase} from './Virtual-list-base.component'
import type {VirtualListProps} from './Virtual-list.interface'
import {renderVirtualList} from './Virtual-list.render'

const VirtualListInner = <T,>(props: VirtualListProps<T>, ref: ForwardedRef<Animated.ScrollView>) => (
	<VirtualListBase
		{...props}
		ref={ref}
		renderVirtualList={renderVirtualList}
	/>
)

const VirtualListWithRef = forwardRef(VirtualListInner) as <T>(
	props: VirtualListProps<T> & {ref?: ForwardedRef<Animated.ScrollView>}
) => ReturnType<typeof VirtualListInner>

export const VirtualList = VirtualListWithRef
