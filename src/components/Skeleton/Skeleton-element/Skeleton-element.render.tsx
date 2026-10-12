import {forwardRef} from 'react'
import {View} from 'react-native'
import {LAYOUT} from '../../../constants'
import type {RenderSkeletonElementProps} from './Skeleton-element.interface'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE} from '../../../theme'

export const RenderSkeletonElement = forwardRef<View, RenderSkeletonElementProps>(
	({children, id, testID, layoutType, className, shape, radius, ...props}, ref) => {
		const {token} = useTheme()
		const {classesName, densityClasses, shapeClasses} = token.classes
		const densityInlineClasses = densityClasses(DENSITY_TYPE.INLINE)()
		const isChildren = !!children

		return (
			<View
				{...props}
				ref={ref}
				testID={testID ?? `skeletonElement--${id}`}
				className={classesName(
					'flex min-h-[--density-inline-x-small] min-w-[--density-inline-x-small] gap-[--density-spacing-x-small]',
					densityInlineClasses(DENSITY_SIZE.X_SMALL),
					shapeClasses(radius)(shape),
					{
						['bg-[--color-on-surface] opacity-[--opacity-level2]']: !isChildren,
						['bg-transparent']: isChildren,
						['flex-col justify-center']: layoutType === LAYOUT.VERTICAL,
						['flex-row items-center']: layoutType === LAYOUT.HORIZONTAL
					},
					className
				)}
			>
				{children}
			</View>
		)
	}
)

RenderSkeletonElement.displayName = 'RenderSkeletonElement'
