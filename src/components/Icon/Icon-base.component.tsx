import {hexToRGBA} from '@bearei/element-token'
import {forwardRef, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import type {IconBaseProps} from './Icon.interface'
import {RenderIcon} from './Icon.render'
import {ICON_NAME, ICON_TYPE, rounded} from './icon'

export const IconBase = forwardRef<View, IconBaseProps>(
	(
		{
			disabled,
			fill,
			icon,
			name = ICON_NAME.CIRCLE,
			svgStyle,
			type = ICON_TYPE.OUTLINED,
			...renderIconProps
		},
		ref
	) => {
		const id = useId()
		const theme = useTheme()
		const disabledFill = hexToRGBA(theme.token.scheme.onSurface)(theme.token.opacity.level5)
		const IconComponent = icon ?? rounded[type]?.[name]
		const iconFill = disabled ? disabledFill : (fill ?? theme.token.scheme.onSurfaceVariant)
		const iconElement = useMemo(
			() =>
				IconComponent && (
					<IconComponent
						fill={iconFill}
						height='100%'
						style={svgStyle}
						width='100%'
					/>
				),
			[IconComponent, iconFill, svgStyle]
		)

		return (
			<RenderIcon
				{...renderIconProps}
				iconElement={iconElement}
				id={id}
				name={name}
				ref={ref}
			/>
		)
	}
)
