import {SHAPE} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {LAYOUT} from '../Common'
import {SkeletonBase} from './Skeleton-base.component'
import type {SkeletonElementProps} from './Skeleton-element'
import {SkeletonElement} from './Skeleton-element'
import type {RenderSkeletonProps, SkeletonComponent, SkeletonProps} from './Skeleton.interface'
import {ContentItemLayout, SkeletonContainer} from './Skeleton.styles'

const AnimatedSkeletonLayout = Animated.createAnimatedComponent(SkeletonContainer)
const renderSkeleton = ({
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
					testID={`skeleton__contentItemLayoutAnimatedVisible--${id}`}
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
				testID={`skeleton__contentItemLayoutAnimatedNotVisible--${id}`}
				visible={!isSkeletonVisible}
			>
				{children}
			</ContentItemLayout>
		</>
	)
}

const SkeletonWithRef = forwardRef<View, SkeletonProps>((props, ref) => (
	<SkeletonBase
		{...props}
		ref={ref}
		renderSkeleton={renderSkeleton}
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

Object.defineProperty(SkeletonWithRef, 'Circle', {value: Circle})
Object.defineProperty(SkeletonWithRef, 'Rectangular', {value: Rectangular})
Object.defineProperty(SkeletonWithRef, 'Square', {value: Square})

export const Skeleton = SkeletonWithRef as FC<SkeletonProps> as SkeletonComponent
