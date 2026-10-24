import {type FC} from 'react'
import {View} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'

import type {RenderDragProps} from './Drag.interface'

import {AnimatedView} from '../Animated'

export const RenderDrag: FC<RenderDragProps> = ({
	animatedStyle,
	children,
	id,
	interactionHandlers,
	panGesture,
	testID,
	...containerProps
}) => {
	const {onLayout} = interactionHandlers

	return (
		<View
			{...containerProps}
			className='pointer-events-box-none absolute bottom-0 left-0 right-0 top-0 z-40 min-h-[--density-inline-xx-small] min-w-[--density-inline-xx-small]'
			onLayout={onLayout}
			testID={testID ?? `drag--${id}`}
		>
			<GestureDetector gesture={panGesture}>
				<AnimatedView
					className='absolute bottom-0 left-0 right-0 top-0 z-40'
					style={animatedStyle}
					testID={`drag__content--${id}`}
				>
					{children}
				</AnimatedView>
			</GestureDetector>
		</View>
	)
}
