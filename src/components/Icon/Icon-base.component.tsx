import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {ICON_NAME, ICON_STYLE, ICON_TYPE} from './Icon.enum'
import type {IconBaseProps} from './Icon.interface'
import {iconStyleConfig} from './icon-style'
import {useIconAnimated} from './use-icon-animated.hook'

export const IconBase = forwardRef<View, IconBaseProps>(
	(
		{
			disabled,
			eventName,
			fill,
			icon,
			iconStyle: style = ICON_STYLE.ROUNDED,
			name = ICON_NAME.CIRCLE,
			renderIcon,
			svgStyle,
			testID,
			type = ICON_TYPE.OUTLINED,
			...renderProps
		},
		ref
	) => {
		const id = useId()
		const theme = useTheme()
		const disabledFill = theme.token.palette.hexToRGBA(theme.token.scheme.onSurface)(
			theme.token.opacity.level5
		)

		const IconComponent = icon ?? iconStyleConfig[style]?.[type]?.[name]
		const iconFill = disabled ? disabledFill : (fill ?? theme.token.scheme.onSurfaceVariant)
		const {containerAnimatedStyle} = useIconAnimated({eventName})
		const svgIconElement = IconComponent && (
			<IconComponent
				fill={iconFill}
				height='100%'
				style={svgStyle}
				width='100%'
			/>
		)

		return renderIcon({...renderProps, containerAnimatedStyle, ref, svgIconElement, testID: testID ?? id})
	}
)
