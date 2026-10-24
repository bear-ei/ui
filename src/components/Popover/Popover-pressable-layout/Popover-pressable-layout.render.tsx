import {type FC} from 'react'
import {Platform, Pressable, type ViewStyle} from 'react-native'

import type {RenderPopoverPressableLayoutProps} from './Popover-pressable-layout.interface'

import {useTheme} from '../../../hooks'
import {toPlatformUnit} from '../../../utils'

export const RenderPopoverPressableLayout: FC<RenderPopoverPressableLayoutProps> = ({
	className,
	containerLayout,
	id,
	...pressableProps
}) => {
	const {token} = useTheme()
	const {classNames} = token.classes
	const {
		height: containerHeight = 0,
		width: containerWidth = 0,
		x: containerX = 0,
		y: containerY = 0
	} = containerLayout ?? {}

	const pressableLayoutStyle = {
		height: toPlatformUnit(containerHeight),
		left: toPlatformUnit(containerX),
		top: toPlatformUnit(containerY),
		width: toPlatformUnit(containerWidth)
	} as ViewStyle

	return (
		<Pressable
			{...pressableProps}
			className={classNames(
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
