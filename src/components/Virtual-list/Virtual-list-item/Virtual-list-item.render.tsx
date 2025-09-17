import {DURATION} from '@bearei/element-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {Drag} from '../../Drag'
import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'
import {Container, DragContent} from './Virtual-list-item.styles'

export const RenderVirtualListItem = forwardRef<View, RenderVirtualListItemProps>(
	(
		{
			containerAnimatedStyle,
			containerLayout,
			draggable,
			id,
			itemElement,
			itemSize = 0,
			layout,
			onDragStart,
			onDragUpdate,
			onUnmount,
			testID,
			visible,
			...containerProps
		},
		ref
	) => {
		return (
			<Container
				{...containerProps}
				exit={{duration: DURATION.SHORT_2}}
				itemSize={itemSize}
				layout={layout}
				onUnmount={onUnmount}
				ref={ref}
				style={[containerAnimatedStyle]}
				testID={testID ?? `virtualListItem--${id}`}
				unmount={true}
				visible={visible}
			>
				{draggable ?
					<Drag
						height={containerLayout?.height}
						onStart={onDragStart}
						onUpdate={onDragUpdate}
						testID={`virtualListItem__drag--${id}`}
						width={containerLayout?.width}
					>
						<DragContent
							containerLayout={containerLayout}
							itemSize={itemSize}
							layout={layout}
							testID={`virtualListItem__dragContent--${id}`}
						>
							{itemElement}
						</DragContent>
					</Drag>
				:	itemElement}
			</Container>
		)
	}
)
