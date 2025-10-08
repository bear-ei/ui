import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Drag} from '../../Drag'
import {Elevation} from '../../Elevation'
import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'
import {Container, DragContent} from './Virtual-list-item.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
export const RenderVirtualListItem = forwardRef<View, RenderVirtualListItemProps>(
	(
		{
			containerAnimatedStyle,
			containerLayout,
			draggable,
			dragging,
			dragOffset,
			dragRef,
			gap,
			id,
			itemElement,
			itemSize = 0,
			layoutType,
			onDragEnd,
			onDragStart,
			onDragUpdate,
			shape,
			testID,
			zIndex,
			...containerProps
		},
		ref
	) => (
		<AnimatedContainer
			{...containerProps}
			itemSize={itemSize}
			layoutType={layoutType}
			ref={ref}
			style={[containerAnimatedStyle]}
			testID={testID ?? `virtualListItem--${id}`}
			zIndex={zIndex}
		>
			{draggable ?
				<Drag
					height={containerLayout?.height}
					layoutType={layoutType}
					offset={dragOffset}
					onEnd={onDragEnd}
					onStart={onDragStart}
					onUpdate={onDragUpdate}
					ref={dragRef}
					testID={`virtualListItem__drag--${id}`}
					width={containerLayout?.width}
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
		</AnimatedContainer>
	)
)
