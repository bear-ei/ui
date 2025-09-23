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
			dragRef,
			gap,
			id,
			itemElement,
			itemSize = 0,
			layoutType,
			offset,
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
			layoutType={layoutType}
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
					layoutType={layoutType}
					offset={offset}
					onEnd={onDragEnd}
					onStart={onDragStart}
					onUpdate={onDragUpdate}
					testID={`virtualListItem__drag--${id}`}
					width={containerLayout?.width}
					ref={dragRef}
				>
					<DragContent
						gap={gap}
						itemSize={itemSize}
						layoutType={layoutType}
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
