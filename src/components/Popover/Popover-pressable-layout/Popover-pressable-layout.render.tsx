import {forwardRef, useMemo} from 'react'
import {Platform, Pressable, View, type ViewStyle} from 'react-native'
import {useTheme} from '../../../hooks'
import type {RenderPopoverLayoutProps} from './Popover-pressable-layout.interface'
import {platformValue} from '../../../utils'

export const RenderPopoverPressableLayout = forwardRef<View, RenderPopoverLayoutProps>(
	({containerLayout, id, className, ...pressableProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const {
			height: containerHeight = 0,
			width: containerWidth = 0,
			x: containerX = 0,
			y: containerY = 0
		} = containerLayout ?? {}

		const pressableLayoutStyle = useMemo(
			() =>
				({
					height: platformValue(containerHeight),
					left: platformValue(containerX),
					top: platformValue(containerY),
					width: platformValue(containerWidth)
				}) as ViewStyle,
			[containerWidth, containerX, containerY, containerHeight]
		)

		return (
			<Pressable
				{...pressableProps}
				ref={ref}
				className={classesName(
					'z-50 min-h-[--typography-body-small-height]',
					{
						['absolute']: Platform.OS !== 'web',
						['fixed']: Platform.OS === 'web'
					},
					className
				)}
				style={pressableLayoutStyle}
				testID={`popover__pressableLayout--${id}`}
			/>
		)
	}
)

RenderPopoverPressableLayout.displayName = 'RenderPopoverPressableLayout'
