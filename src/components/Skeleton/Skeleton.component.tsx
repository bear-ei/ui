import {forwardRef, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, RADIUS, SHAPE} from '../../theme'
import {platformValue, typedMemo} from '../../utils'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement} from './Skeleton-element'
import type {
	SkeletonCircleProps,
	SkeletonProps,
	SkeletonRectangularProps,
	SkeletonSquareProps
} from './Skeleton.interface'
import type {ViewStyle} from 'react-native'

const SkeletonWithRef = forwardRef<View, SkeletonProps>((props, ref) => (
	<SkeletonBase
		{...props}
		ref={ref}
	/>
))

const CircleWithRef = forwardRef<View, SkeletonCircleProps>(
	({style, size, className, ...props}: SkeletonCircleProps, ref) => {
		const {token} = useTheme()
		const {densityClasses, classesName} = token.classes
		const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
		const skeletonElementStyle = useMemo(
			() => [
				style,
				typeof size === 'number' && ({height: platformValue(size), width: platformValue(size)} as ViewStyle)
			],
			[style, size]
		)

		return (
			<SkeletonElement
				{...props}
				className={classesName(densityInlineClasses(DENSITY_SIZE.MEDIUM), className)}
				radius={RADIUS.FULL}
				ref={ref}
				shape={SHAPE.ALL}
				style={skeletonElementStyle}
			/>
		)
	}
)

const SquareWithRef = forwardRef<View, SkeletonSquareProps>(
	({style, size, className, ...props}: SkeletonSquareProps, ref) => {
		const {token} = useTheme()
		const {densityClasses, classesName} = token.classes
		const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
		const skeletonElementStyle = useMemo(
			() => [
				style,
				typeof size === 'number' && ({height: platformValue(size), width: platformValue(size)} as ViewStyle)
			],
			[style, size]
		)

		return (
			<SkeletonElement
				{...props}
				className={classesName(densityInlineClasses(DENSITY_SIZE.MEDIUM), className)}
				ref={ref}
				shape={SHAPE.ALL}
				radius={RADIUS.SMALL}
				style={skeletonElementStyle}
			/>
		)
	}
)

const RectangularWithRef = forwardRef<View, SkeletonRectangularProps>(
	({style, size, className, ...props}: SkeletonRectangularProps, ref) => {
		const {token} = useTheme()
		const {densityClasses, classesName} = token.classes
		const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
		const skeletonElementStyle = useMemo(
			() => [
				style,
				size &&
					typeof size.width === 'number' &&
					typeof size.height === 'number' &&
					({
						height: platformValue(size.height),
						width: platformValue(size.width)
					} as ViewStyle)
			],
			[style, size]
		)

		return (
			<SkeletonElement
				{...props}
				className={classesName(
					'flex-1 self-stretch',
					densityInlineClasses(DENSITY_SIZE.MEDIUM),
					'w-auto min-w-[--density-inline-medium]',
					className
				)}
				ref={ref}
				shape={SHAPE.ALL}
				radius={RADIUS.SMALL}
				style={skeletonElementStyle}
			/>
		)
	}
)

CircleWithRef.displayName = 'Circle'
RectangularWithRef.displayName = 'Rectangular'
SkeletonWithRef.displayName = 'Skeleton'
SquareWithRef.displayName = 'Square'

export const Skeleton = typedMemo(SkeletonWithRef)
export const Circle = typedMemo(CircleWithRef)
export const Square = typedMemo(SquareWithRef)
export const Rectangular = typedMemo(RectangularWithRef)
