import {DURATION} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'
import {ContainerLayout} from './Virtual-list-item.styles'

export const RenderVirtualListItem = forwardRef<View, RenderVirtualListItemProps>(
	(
		{containerAnimatedStyle, id, itemElement, itemSize = 0, onUnmount, testID, visible, ...containerProps},
		ref
	) => (
		<ContainerLayout
			{...containerProps}
			exit={{duration: DURATION.SHORT_2}}
			itemSize={itemSize}
			onUnmount={onUnmount}
			ref={ref}
			style={[containerAnimatedStyle]}
			testID={testID ?? `virtualListItem--${id}`}
			unmount={true}
			visible={visible}
		>
			{itemElement}
		</ContainerLayout>
	)
)
