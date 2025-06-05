import {SHAPE} from '@bearei/material-token'
import {forwardRef, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {typedMemo} from '../../utils'
import {SkeletonBase} from './Skeleton-base.component'
import type {SkeletonElementProps} from './Skeleton-element'
import {SkeletonElement} from './Skeleton-element'
import type {SkeletonProps} from './Skeleton.interface'
import {renderSkeleton} from './Skeleton.render'

const SkeletonWithRef = forwardRef<View, SkeletonProps>((props, ref) => (
	<SkeletonBase
		{...props}
		ref={ref}
		renderSkeleton={renderSkeleton}
	/>
))

const Circle = forwardRef<View, SkeletonElementProps>((props: SkeletonElementProps, ref) => {
	const theme = useTheme()
	const {shape = SHAPE.FULL, size, style, ...skeletonElementProps} = props
	const defaultSize = theme.adaptSize(theme.token.spacing.extraSmall * 10)
	const circleSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
	const circleStyle = useMemo(() => ({width: circleSize, height: circleSize}), [circleSize])

	return (
		<SkeletonElement
			{...skeletonElementProps}
			ref={ref}
			shape={shape}
			style={[circleStyle, style]}
		/>
	)
})

const Square = forwardRef<View, SkeletonElementProps>((props: SkeletonElementProps, ref) => {
	const theme = useTheme()
	const {shape = SHAPE.SMALL, size, style, ...skeletonElementProps} = props
	const defaultSize = theme.adaptSize(theme.token.spacing.extraSmall * 10)
	const squareSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
	const squareStyle = useMemo(() => ({width: squareSize, height: squareSize}), [squareSize])

	return (
		<SkeletonElement
			{...skeletonElementProps}
			ref={ref}
			shape={shape}
			style={[squareStyle, style]}
		/>
	)
})

const Rectangular = forwardRef<View, SkeletonElementProps>((props: SkeletonElementProps, ref) => {
	const theme = useTheme()
	const {shape = SHAPE.SMALL, style, size, ...skeletonElementProps} = props
	const defaultSize = theme.adaptSize(theme.token.spacing.extraSmall * 10)
	const squareSize = typeof size === 'number' ? (size ?? defaultSize) : defaultSize
	const rectangularStyle = useMemo(
		() =>
			typeof size === 'object' ?
				{minWidth: size.width ?? squareSize, height: size.height ?? squareSize, flex: 1}
			:	{minWidth: squareSize, height: squareSize, flex: 1},
		[size, squareSize]
	)

	return (
		<SkeletonElement
			{...skeletonElementProps}
			ref={ref}
			shape={shape}
			style={[rectangularStyle, style]}
		/>
	)
})

export const Skeleton = Object.assign(typedMemo(SkeletonWithRef)(), {
	Circle: typedMemo(Circle)(),
	Rectangular: typedMemo(Rectangular)(),
	Square: typedMemo(Square)()
})
