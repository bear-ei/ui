import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LAYOUT} from '../Common'
import type {RenderSkeletonProps} from './Skeleton.interface'
import {ContentItemLayout, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonContainer = Animated.createAnimatedComponent(SkeletonContainer)
export const RenderSkeleton = forwardRef<View, RenderSkeletonProps>(
	(
		{
			children,
			containerAnimatedStyle,
			id,
			layout = LAYOUT.HORIZONTAL,
			skeleton,
			style,
			visible,
			...containerProps
		},
		ref
	) => {
		const isSkeletonVisible = !!(skeleton && visible)

		return (
			<>
				{skeleton && (
					<ContentItemLayout
						lazy={true}
						testID={`skeleton__contentItemLayoutVisible--${id}`}
						unmount={true}
						visible={isSkeletonVisible}
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
					lazy={true}
					ref={ref}
					testID={`skeleton__contentItemLayoutNotVisible--${id}`}
					visible={!isSkeletonVisible}
				>
					{children}
				</ContentItemLayout>
			</>
		)
	}
)
