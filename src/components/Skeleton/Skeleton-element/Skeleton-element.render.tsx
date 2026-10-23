import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderSkeletonElementProps} from './Skeleton-element.interface'

import {LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../../theme'

export const RenderSkeletonElement: FC<RenderSkeletonElementProps> = ({
	children,
	className,
	id,
	layoutType,
	radius,
	shape,
	testID,
	...props
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses, shapeClasses} = token.classes
	const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)
	const isChildren = !!children

	return (
		<View
			{...props}
			className={classesName(
				'flex min-h-[--density-inline-x-small] min-w-[--density-inline-x-small] gap-[--density-spacing-x-small]',
				densityInlineClasses(DENSITY_SIZE.X_SMALL),
				shapeClasses(shape, radius),
				{
					['bg-[--color-on-surface] opacity-[--opacity-level2]']: !isChildren,
					['bg-transparent']: isChildren,
					['flex-col justify-center']: layoutType === LAYOUT.VERTICAL,
					['flex-row items-center']: layoutType === LAYOUT.HORIZONTAL
				},
				className
			)}
			testID={testID ?? `skeletonElement--${id}`}
		>
			{children}
		</View>
	)
}
