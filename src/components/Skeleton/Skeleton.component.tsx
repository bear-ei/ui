import type {ViewStyle} from 'react-native'

import {useMemo} from 'react'

import type {
	SkeletonCircleProps,
	SkeletonProps,
	SkeletonRectangularProps,
	SkeletonSquareProps
} from './Skeleton.interface'

import {useTheme} from '../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, RADIUS, SHAPE} from '../../theme'
import {toPlatformUnit, typedMemo} from '../../utils'
import {SkeletonBase} from './Skeleton-base.component'
import {SkeletonElement} from './Skeleton-element'

export const Skeleton = typedMemo((props: SkeletonProps) => <SkeletonBase {...props} />)
export const SkeletonCircle = typedMemo(({className, size, style, ...props}: SkeletonCircleProps) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const skeletonElementStyle = useMemo(
		() => [
			style,
			typeof size === 'number' && ({height: toPlatformUnit(size), width: toPlatformUnit(size)} as ViewStyle)
		],
		[style, size]
	)

	return (
		<SkeletonElement
			{...props}
			className={classNames(densityInlineClasses(DENSITY_SIZE.MEDIUM), className)}
			radius={RADIUS.FULL}
			shape={SHAPE.ALL}
			style={skeletonElementStyle}
		/>
	)
})

export const SkeletonSquare = typedMemo(({className, size, style, ...props}: SkeletonSquareProps) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const skeletonElementStyle = useMemo(
		() => [
			style,
			typeof size === 'number' && ({height: toPlatformUnit(size), width: toPlatformUnit(size)} as ViewStyle)
		],
		[style, size]
	)

	return (
		<SkeletonElement
			{...props}
			className={classNames(densityInlineClasses(DENSITY_SIZE.MEDIUM), className)}
			radius={RADIUS.SMALL}
			shape={SHAPE.ALL}
			style={skeletonElementStyle}
		/>
	)
})

export const SkeletonRectangular = typedMemo(({className, size, style, ...props}: SkeletonRectangularProps) => {
	const {token} = useTheme()
	const {classNames, densityClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const skeletonElementStyle = useMemo(
		() => [
			style,
			size &&
				typeof size.width === 'number' &&
				typeof size.height === 'number' &&
				({
					height: toPlatformUnit(size.height),
					width: toPlatformUnit(size.width)
				} as ViewStyle)
		],
		[style, size]
	)

	return (
		<SkeletonElement
			{...props}
			className={classNames(
				'flex-1 self-stretch',
				densityInlineClasses(DENSITY_SIZE.MEDIUM),
				'w-auto min-w-[--density-inline-medium]',
				className
			)}
			radius={RADIUS.SMALL}
			shape={SHAPE.ALL}
			style={skeletonElementStyle}
		/>
	)
})
