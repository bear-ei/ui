import {forwardRef} from 'react'
import {Platform, Pressable, View, type ViewStyle} from 'react-native'
import {useTheme} from '../../../hooks'
import {platformValue} from '../../../theme'
import type {RenderPopoverLayoutProps} from './Popover-pressable-layout.interface'

export const RenderPopoverPressableLayout = forwardRef<View, RenderPopoverLayoutProps>(
	({containerLayout, id, ...pressableProps}, ref) => {
		const {token} = useTheme()
		const {classesName} = token.classes
		const {
			height: containerHeight = 0,
			width: containerWidth = 0,
			x: containerX = 0,
			y: containerY = 0
		} = containerLayout ?? {}

		const pressableLayoutStyle = {
			height: platformValue(containerHeight),
			left: platformValue(containerX),
			top: platformValue(containerY),
			width: platformValue(containerWidth)
		} as ViewStyle

		return (
			<Pressable
				{...pressableProps}
				ref={ref}
				className={classesName('z-50 min-h-[--typography-body-small-height]', {
					['absolute']: Platform.OS !== 'web',
					['fixed']: Platform.OS === 'web'
				})}
				style={[pressableLayoutStyle]}
				testID={`popover__pressableLayout--${id}`}
			/>
		)
	}
)

RenderPopoverPressableLayout.displayName = 'RenderPopoverPressableLayout'
