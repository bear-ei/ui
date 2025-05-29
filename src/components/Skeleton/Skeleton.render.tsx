import Animated from 'react-native-reanimated'
import {LAYOUT} from '../Common'
import type {RenderSkeletonProps} from './Skeleton.interface'
import {ContentItemLayout, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonContainer = Animated.createAnimatedComponent(SkeletonContainer)
export const renderSkeleton = ({
	children,
	containerAnimatedStyle,
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
					contentStyle={contentStyle}
					testID={`skeleton__contentItemLayoutVisible--${id}`}
					unmount={true}
					visible={isSkeletonVisible}
					animatedType='STANDARD'
				>
					<AnimatedSkeletonContainer
						{...containerProps}
						layoutType={layout}
						style={[style, containerAnimatedStyle]}
						testID={`skeleton__animatedSkeletonLayout--${id}`}
					>
						{skeleton}
					</AnimatedSkeletonContainer>
				</ContentItemLayout>
			)}

			<ContentItemLayout
				contentStyle={contentStyle}
				testID={`skeleton__contentItemLayoutNotVisible--${id}`}
				visible={!isSkeletonVisible}
				animatedType='STANDARD'
			>
				{children}
			</ContentItemLayout>
		</>
	)
}
