import {forwardRef, useMemo} from 'react'
import {View} from 'react-native'

import {useTheme} from '../../hooks'
import {RADIUS, SHAPE} from '../../theme'
import {AnimatedView} from '../Animated'

import type {RenderUnderlayProps} from './Underlay.interface'

export const RenderUnderlay = forwardRef<View, RenderUnderlayProps>(
	(
		{
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
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName, shapeClasses} = token.classes
		const {onLayout} = interactionHandlers
		const activeLayerStyle = useMemo(
			() => [{...(activeColor && {backgroundColor: activeColor})}, activeLayerAnimatedStyle],
			[activeColor, activeLayerAnimatedStyle]
		)

		const hoverLayerStyle = useMemo(
			() => [{...(underlayColor && {backgroundColor: underlayColor})}, hoverLayerAnimatedStyle],
			[underlayColor, hoverLayerAnimatedStyle]
		)

		return (
			<View
				{...containerProps}
				onLayout={onLayout}
				ref={ref}
				className={classesName(
					'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10 flex flex-col items-center justify-center overflow-hidden',
					shapeClasses(radius)(shape)
				)}
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
							shapeClasses(activeRadius ?? radius)(shape)
						)}
						style={activeLayerStyle}
						testID={`underlay__activeLayer--${id}`}
					/>
				)}
			</View>
		)
	}
)

RenderUnderlay.displayName = 'RenderUnderlay'
