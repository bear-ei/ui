import {type FC} from 'react'
import {View, type ViewStyle} from 'react-native'

import type {RenderVirtualListItemProps} from './Virtual-list-item.interface'

import {ORIENTATION} from '../../../constants'
import {toPlatformUnit} from '../../../utils'
import {AnimatedView} from '../../Animated'
import {Drag} from '../../Drag'
import {Elevation} from '../../Elevation'

export const RenderVirtualListItem: FC<RenderVirtualListItemProps> = ({
	containerAnimatedStyle,
	containerLayout,
	draggable,
	dragging,
	dragOffset,
	dragRef,
	gap = 0,
	id,
	itemElement,
	itemSize = 0,
	onDragEnd,
	onDragStart,
	onDragUpdate,
	orientation,
	shape,
	testID,
	zIndex,
	...containerProps
}) => {
	const animatedViewStyle = [
		containerAnimatedStyle,
		{
			...(orientation === ORIENTATION.VERTICAL ?
				{height: toPlatformUnit(itemSize)}
			:	{width: toPlatformUnit(itemSize)}),
			zIndex
		} as ViewStyle
	]

	const dragContentStyle = {
		...(orientation === ORIENTATION.VERTICAL ?
			{height: toPlatformUnit(itemSize - gap)}
		:	{width: toPlatformUnit(itemSize - gap)}),
		zIndex
	} as ViewStyle

	return (
		<AnimatedView
			{...containerProps}
			className='absolute bottom-0 left-0 right-0 top-0 flex flex-col'
			style={animatedViewStyle}
			testID={testID ?? `virtualListItem--${id}`}
		>
			{draggable ?
				<Drag
					height={containerLayout?.height}
					offset={dragOffset}
					onEnd={onDragEnd}
					onStart={onDragStart}
					onUpdate={onDragUpdate}
					orientation={orientation}
					ref={dragRef}
					testID={`virtualListItem__drag--${id}`}
					width={containerLayout?.width}
				>
					<View
						style={dragContentStyle}
						testID={`virtualListItem__dragContent--${id}`}
					>
						{itemElement}
						<Elevation
							level={dragging ? 2 : 0}
							shape={shape}
							testID={`virtualListItem__elevation--${id}`}
						/>
					</View>
				</Drag>
			:	itemElement}
		</AnimatedView>
	)
}
