import type {SkeletonElementProps} from './Skeleton-element.interface'

import {typedMemo} from '../../../utils'
import {SkeletonElementBase} from './Skeleton-element-base.component'

export const SkeletonElement = typedMemo((props: SkeletonElementProps) => <SkeletonElementBase {...props} />)
