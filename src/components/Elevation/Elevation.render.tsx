import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderElevationProps} from './Elevation.interface'

import {useTheme} from '../../hooks'
import {SHAPE} from '../../theme'
import {AnimatedView} from '../Animated'

export const RenderElevation: FC<RenderElevationProps> = ({
	className,
	id,
	radius,
	shadowAnimatedStyle,
	shape = SHAPE.ALL,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName, shapeClasses} = token.classes

	return (
		<View
			{...containerProps}
			className={classesName(
				'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-20 flex flex-col items-center justify-center bg-transparent',
				className
			)}

			testID={testID ?? `elevation--${id}`}
		>
			<AnimatedView
				className={classesName('flex-1 self-stretch', shapeClasses(shape, radius))}
				style={shadowAnimatedStyle}
				testID={`elevation__shadow--${id}`}
			/>
		</View>
	)
}
