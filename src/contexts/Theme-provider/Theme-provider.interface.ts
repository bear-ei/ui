import {Token} from '@bearei/material-token'
import {ReactNode} from 'react'
import {Density} from '../../components'
import {AdaptDesignOptions} from '../../utils'

export interface ThemeProps {
        children?: ReactNode
        density?: Density
        designOptions?: AdaptDesignOptions
        story?: boolean
        token?: Token
}

export interface ThemeContainerProps {
        enableFocusRing?: boolean
        story?: boolean
}
