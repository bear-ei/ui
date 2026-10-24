import {type FC} from 'react'
import {View} from 'react-native'

import type {RenderUnderlayProps} from './Underlay.interface'

import {useTheme} from '../../hooks'
import {RADIUS, SHAPE} from '../../theme'
import {AnimatedView} from '../Animated'

export const RenderUnderlay: FC<RenderUnderlayProps> = ({
	active,
	activeColor,
	activeLayerAnimatedStyle,
	activeRadius,
	hoverLayerAnimatedStyle,
	id,
	interactionHandlers,
	radius = RADIUS.NONE,
	shape = SHAPE.ALL,
	testID,
	underlayColor,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName, shapeClasses} = token.classes
	const radiusClasses = shapeClasses(shape)
	const {onLayout} = interactionHandlers
	const activeLayerStyle = [{...(activeColor && {backgroundColor: activeColor})}, activeLayerAnimatedStyle]
	const hoverLayerStyle = [{...(underlayColor && {backgroundColor: underlayColor})}, hoverLayerAnimatedStyle]

	return (
		<View
			{...containerProps}
			className={classesName(
				'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10 flex flex-col items-center justify-center overflow-hidden',
				radiusClasses(radius)
			)}
			onLayout={onLayout}
			testID={testID ?? `underlay--${id}`}
		>
			<AnimatedView
				className='absolute bottom-0 left-0 right-0 top-0 z-20'
				style={hoverLayerStyle}
				testID={`underlay__hoverLayer--${id}`}
			/>

			{typeof active === 'boolean' && activeColor && (
				<AnimatedView
					className={classesName(
						'absolute bottom-0 left-0 right-0 top-0 z-10',
						radiusClasses(activeRadius ?? radius)
					)}
					style={activeLayerStyle}
					testID={`underlay__activeLayer--${id}`}
				/>
			)}
		</View>
	)
}
