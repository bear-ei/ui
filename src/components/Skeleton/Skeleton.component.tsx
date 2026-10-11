import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {typedMemo} from '../../utils'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement} from './Skeleton-element'
import type {
	SkeletonCircleProps,
	SkeletonProps,
	SkeletonRectangularProps,
	SkeletonSquareProps
} from './Skeleton.interface'
import {DENSITY_SIZE, DENSITY_TYPE, platformValue, RADIUS, SHAPE} from '../../theme'
import {useTheme} from '../../hooks'

const SkeletonWithRef = forwardRef<View, SkeletonProps>((props, ref) => (
	<SkeletonBase
		{...props}
		ref={ref}
	/>
))

export const Circle = forwardRef<View, SkeletonCircleProps>(({style, size, ...props}: SkeletonCircleProps, ref) => {
	const {token} = useTheme()
	const {densityClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
	const skeletonElementStyle = {
		...(typeof size === 'number' && {height: platformValue(size), width: platformValue(size)})
	} as ViewStyle

	return (
		<SkeletonElement
			{...props}
			className={densityInlineClasses(DENSITY_SIZE.MEDIUM)}
			ref={ref}
			shape={SHAPE.ALL}
			radius={RADIUS.FULL}
			style={[style, skeletonElementStyle]}
		/>
	)
})

export const Square = forwardRef<View, SkeletonSquareProps>(({style, size, ...props}: SkeletonSquareProps, ref) => {
	const {token} = useTheme()
	const {densityClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
	const skeletonElementStyle = {
		...(typeof size === 'number' && {height: platformValue(size), width: platformValue(size)})
	} as ViewStyle

	return (
		<SkeletonElement
			{...props}
			className={densityInlineClasses(DENSITY_SIZE.MEDIUM)}
			ref={ref}
			shape={SHAPE.ALL}
			radius={RADIUS.SMALL}
			style={[style, skeletonElementStyle]}
		/>
	)
})

export const Rectangular = forwardRef<View, SkeletonRectangularProps>(
	({style, size, ...props}: SkeletonRectangularProps, ref) => {
		const {token} = useTheme()
		const {densityClasses, classesName} = token.classes
		const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
		const skeletonElementStyle = {
			...(size &&
				typeof size.width === 'number' &&
				typeof size.height === 'number' && {
					height: platformValue(size.height),
					width: platformValue(size.width)
				})
		} as ViewStyle

		return (
			<SkeletonElement
				{...props}
				className={classesName(
					'flex-1 self-stretch',
					densityInlineClasses(DENSITY_SIZE.MEDIUM),
					'w-auto min-w-[--density-inline-medium]'
				)}
				ref={ref}
				shape={SHAPE.ALL}
				radius={RADIUS.SMALL}
				style={[style, skeletonElementStyle]}
			/>
		)
	}
)

Circle.displayName = 'Circle'
Rectangular.displayName = 'Rectangular'
SkeletonWithRef.displayName = 'SkeletonWithRef'
Square.displayName = 'Square'

export const Skeleton = typedMemo(SkeletonWithRef)()
