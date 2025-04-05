import {Token} from '@bearei/material-token'
import {ReactNode} from 'react'
import {AdaptDesignOptions} from '../../utils'

export interface ThemeProps {
        children?: ReactNode
        densityScale?: 0 | -1 | -2 | -3
        designOptions?: AdaptDesignOptions
        story?: boolean
        token?: Token
}

export interface ThemeContainerProps {
        enableFocusRing?: boolean
        story?: boolean
}
