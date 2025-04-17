import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {SkeletonElementBaseProps} from './Skeleton-element.interface'

export const SkeletonElementBase = forwardRef<View, SkeletonElementBaseProps>(({render, ...renderProps}, ref) => {
	const id = useId()

	return render({...renderProps, ref, id})
})
