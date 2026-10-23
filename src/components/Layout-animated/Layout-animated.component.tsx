import type {LayoutAnimatedProps} from './Layout-animated.interface'

import {typedMemo} from '../../utils'
import {LayoutAnimatedBase} from './Layout-animated-base.component'

export const LayoutAnimated = typedMemo((props: LayoutAnimatedProps) => <LayoutAnimatedBase {...props} />)

