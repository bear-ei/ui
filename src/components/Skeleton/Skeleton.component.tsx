import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {LAYOUT} from '../Common'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement, SkeletonElementProps} from './Skeleton-element'
import type {RenderSkeletonProps, SkeletonComponent, SkeletonProps} from './Skeleton.interface'
import {ContentItemLayout, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonLayout = Animated.createAnimatedComponent(SkeletonContainer)
const render = ({
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
	const skeletonVisible = !!(skeleton && visible)

	return (
		<>
			{skeleton && (
				<ContentItemLayout
					contentSize={contentSize}
					contentStyle={contentStyle}
					testID={`skeleton__contentItemLayoutAnimated--${id}`}
					unmount={true}
					visible={skeletonVisible}
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
				testID={`skeleton__contentItemLayoutAnimated--${id}`}
				visible={!skeletonVisible}
			>
				{children}
			</ContentItemLayout>
		</>
	)
}

const ForwardRefSkeleton = forwardRef<View, SkeletonProps>((props, ref) => (
	<SkeletonBase
		{...props}
		ref={ref}
		render={render}
	/>
))

const Circle: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
	const theme = useTheme()
	const {shape = SHAPE.FULL, size, style, ...skeletonElementProps} = props
	const defaultSize = theme.adaptSize(theme.token.spacing.extraSmall * 10)
	const circleSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
	const circleStyle = {width: circleSize, height: circleSize}

	return (
		<SkeletonElement
			{...skeletonElementProps}
			shape={shape}
			style={[circleStyle, style]}
		/>
	)
}

const Square: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
	const theme = useTheme()
	const {shape = SHAPE.SMALL, size, style, ...skeletonElementProps} = props
	const defaultSize = theme.adaptSize(theme.token.spacing.extraSmall * 10)
	const squareSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
	const squareStyle = {width: squareSize, height: squareSize}

	return (
		<SkeletonElement
			{...skeletonElementProps}
			shape={shape}
			style={[squareStyle, style]}
		/>
	)
}

const Rectangular: FC<SkeletonElementProps> = (props: SkeletonElementProps) => {
	const theme = useTheme()
	const {shape = SHAPE.SMALL, style, size, ...skeletonElementProps} = props
	const defaultSize = theme.adaptSize(theme.token.spacing.extraSmall * 10)
	const squareSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
	const rectangularStyle =
		typeof size === 'object' ?
			{minWidth: size.width ?? squareSize, height: size.height ?? squareSize, flex: 1}
		:	{minWidth: squareSize, height: squareSize, flex: 1}

	return (
		<SkeletonElement
			{...skeletonElementProps}
			shape={shape}
			style={[rectangularStyle, style]}
		/>
	)
}

Object.defineProperty(ForwardRefSkeleton, 'Circle', {value: Circle})
Object.defineProperty(ForwardRefSkeleton, 'Rectangular', {value: Rectangular})
Object.defineProperty(ForwardRefSkeleton, 'Square', {value: Square})

export const Skeleton = ForwardRefSkeleton as FC<SkeletonProps> as SkeletonComponent
