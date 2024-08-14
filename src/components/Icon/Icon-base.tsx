import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {IconBaseProps} from './Icon.interface'
import {iconStyle} from './icon-style'
import {useIconAnimated} from './use-icon-animated'

export const IconBase = forwardRef<View, IconBaseProps>(
    (
        {
            disabled,
            eventName,
            fill,
            icon,
            iconStyle: style = 'outlined',
            name = 'circle',
            render,
            type = 'outlined',
            ...renderProps
        },
        ref
    ) => {
        const theme = useTheme()
        const disabledFill = theme.token.palette.convertHexToRGBA(theme.token.scheme.onSurface)(0.38)
        const id = useId()
        const SvgIcon = icon ?? iconStyle[style]?.[type]?.[name]
        const iconFill = disabled ? disabledFill : (fill ?? theme.token.scheme.onSurfaceVariant)
        const animatedStyle = useIconAnimated({eventName})
        const svgStyle = {
            minWidth: theme.adaptSize(theme.token.spacing.large),
            minHeight: theme.adaptSize(theme.token.spacing.large)
        }
        const svgIconElement = SvgIcon && (
            <SvgIcon
                fill={iconFill}
                style={svgStyle}
                height='100%'
                width='100%'
            />
        )

        return render({...renderProps, animatedStyle, fill: iconFill, id, ref, svgIconElement})
    }
)
