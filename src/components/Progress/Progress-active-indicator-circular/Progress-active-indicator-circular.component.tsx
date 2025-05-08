import {forwardRef} from 'react'
import type {View} from 'react-native'
import {ProgressActiveIndicatorCircularBase} from './Progress-active-indicator-circular-base.component'
import type {ProgressActiveIndicatorCircularProps} from './Progress-active-indicator-circular.interface'
import {renderProgressActiveIndicatorCircular} from './Progress-active-indicator-circular.render'

const ProgressActiveIndicatorCircularWithRef = forwardRef<View, ProgressActiveIndicatorCircularProps>((props, ref) => (
	<ProgressActiveIndicatorCircularBase
		{...props}
		ref={ref}
		renderProgressActiveIndicatorCircular={renderProgressActiveIndicatorCircular}
	/>
))

export const ProgressActiveIndicatorCircular = ProgressActiveIndicatorCircularWithRef
