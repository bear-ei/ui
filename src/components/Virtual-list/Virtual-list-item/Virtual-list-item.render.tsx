import {DURATION} from '@bearei/material-token'
import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'
import {ContainerLayout} from './Virtual-list-item.styles'

export const renderVirtualListItem = ({
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
