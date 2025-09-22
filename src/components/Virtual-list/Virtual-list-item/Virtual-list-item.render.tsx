import {DURATION} from '@bearei/element-token'
import {forwardRef} from 'react'
import {View} from 'react-native'
import {Drag} from '../../Drag'
import {Elevation} from '../../Elevation'
import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'
import {Container, DragContent} from './Virtual-list-item.styles'

export const RenderVirtualListItem = forwardRef<View, RenderVirtualListItemProps>(
	(
		{
			containerAnimatedStyle,
			containerLayout,
			draggable,
			dragging,
			gap,
			id,
			itemElement,
			itemSize = 0,
			layout,
			onDragEnd,
			onDragStart,
			onDragUpdate,
			onUnmount,
			shape,
			testID,
			visible,
			...containerProps
		},
		ref
	) => (
		<Container
			{...containerProps}
			dragging={dragging}
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
					onEnd={onDragEnd}
					onStart={onDragStart}
					onUpdate={onDragUpdate}
					testID={`virtualListItem__drag--${id}`}
					width={containerLayout?.width}
				>
					<DragContent
						containerLayout={containerLayout}
						gap={gap}
						itemSize={itemSize}
						layout={layout}
						testID={`virtualListItem__dragContent--${id}`}
					>
						{itemElement}
						<Elevation
							level={dragging ? 2 : 0}
							shape={shape}
							testID={`virtualListItem__elevation--${id}`}
						/>
					</DragContent>
				</Drag>
			:	itemElement}
		</Container>
	)
)
