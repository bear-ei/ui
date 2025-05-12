import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {SkeletonElementBase} from './Skeleton-element-base.component'
import type {SkeletonElementProps} from './Skeleton-element.interface'
import {renderSkeletonElement} from './Skeleton-element.render'

const SkeletonElementWithRef = forwardRef<View, SkeletonElementProps>((props, ref) => (
	<SkeletonElementBase
		{...props}
		ref={ref}
		renderSkeletonElement={renderSkeletonElement}
	/>
))

export const SkeletonElement = typedMemo(SkeletonElementWithRef)()
