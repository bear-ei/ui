import {DURATION} from '@bearei/material-token'
import {forwardRef, memo} from 'react'
import type {View} from 'react-native'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {handleVirtualListItemPropsEqual} from './Virtual-list-item-handle'
import type {RenderVirtualListItemProps, VirtualListItemProps} from './Virtual-list-item.interface'
import {ContainerLayout} from './Virtual-list-item.styles'

const renderVirtualListItem = ({
	containerAnimatedStyle,
	id,
	itemElement,
	itemSize = 0,
	onUnmount,
	testID,
	visible,
	...containerProps
}: RenderVirtualListItemProps) => (
	<ContainerLayout
		{...containerProps}
		exit={{duration: DURATION.SHORT_2}}
		itemSize={itemSize}
		onUnmount={onUnmount}
		style={[containerAnimatedStyle]}
		testID={testID ?? `virtualListItem--${id}`}
		unmount={true}
		visible={visible}
	>
		{itemElement}
	</ContainerLayout>
)

const ForwardRefVirtualListItem = forwardRef<View, VirtualListItemProps>((props, ref) => (
	<VirtualListItemBase
		{...props}
		ref={ref}
		renderVirtualListItem={renderVirtualListItem}
	/>
))

export const VirtualListItem = memo(ForwardRefVirtualListItem, (prevProps, nextProps) =>
	handleVirtualListItemPropsEqual(prevProps)(nextProps)
)
