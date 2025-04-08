import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {IconName, IconStyle, IconType} from './Icon.enum'
import {IconBaseProps} from './Icon.interface'
import {iconStyle} from './icon-style'
import {useIconAnimated} from './use-icon-animated.hook'

export const IconBase = forwardRef<View, IconBaseProps>(
        (
                {
                        disabled,
                        eventName,
                        fill,
                        icon,
                        iconStyle: style = IconStyle.ROUNDED,
                        name = IconName.CIRCLE,
                        render,
                        svgStyle,
                        type = IconType.OUTLINED,
                        ...renderProps
                },
                ref
        ) => {
                const id = useId()
                const theme = useTheme()
                const disabledFill = theme.token.palette.hexToRGBA(theme.token.scheme.onSurface)(
                        theme.token.opacity.level5
                )

                const SvgIcon = icon ?? iconStyle[style]?.[type]?.[name]
                const iconFill = disabled ? disabledFill : (fill ?? theme.token.scheme.onSurfaceVariant)
                const {containerAnimatedStyle} = useIconAnimated({eventName})
                const svgIconElement = SvgIcon && (
                        <SvgIcon
                                fill={iconFill}
                                height='100%'
                                style={svgStyle}
                                width='100%'
                        />
                )

                return render({...renderProps, containerAnimatedStyle, ref, svgIconElement, id})
        }
)
