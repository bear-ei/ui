import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {ElevationBase} from './Elevation-base.component'
import type {ElevationProps} from './Elevation.interface'
import {renderElevation} from './Elevation.render'

const ElevationWithRef = forwardRef<View, ElevationProps>((props, ref) => (
	<ElevationBase
		{...props}
		ref={ref}
		renderElevation={renderElevation}
	/>
))

export const Elevation = typedMemo(ElevationWithRef)()
