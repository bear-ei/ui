import Animated from 'react-native-reanimated'
import {LAYOUT} from '../Common'
import type {RenderSkeletonProps} from './Skeleton.interface'
import {ContentItemLayout, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonLayout = Animated.createAnimatedComponent(SkeletonContainer)
export const renderSkeleton = ({
	children,
	containerAnimatedStyle,
	contentSize,
	contentStyle,
	id,
	layout = LAYOUT.HORIZONTAL,
	skeleton,
	style,
	visible,
	...containerProps
}: RenderSkeletonProps) => {
	const isSkeletonVisible = !!(skeleton && visible)

	return (
		<>
			{skeleton && (
				<ContentItemLayout
					contentSize={contentSize}
					contentStyle={contentStyle}
					testID={`skeleton__contentItemLayoutVisible--${id}`}
					unmount={true}
					visible={isSkeletonVisible}
				>
					<AnimatedSkeletonLayout
						{...containerProps}
						layoutType={layout}
						style={[style, containerAnimatedStyle]}
						testID={`skeleton__animatedSkeletonLayout--${id}`}
					>
						{skeleton}
					</AnimatedSkeletonLayout>
				</ContentItemLayout>
			)}

			<ContentItemLayout
				contentSize={contentSize}
				contentStyle={contentStyle}
				testID={`skeleton__contentItemLayoutNotVisible--${id}`}
				visible={!isSkeletonVisible}
			>
				{children}
			</ContentItemLayout>
		</>
	)
}
