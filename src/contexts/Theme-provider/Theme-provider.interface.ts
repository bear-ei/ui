import {Token} from '@bearei/material-token'
import {ReactNode} from 'react'
import {AdaptDesignOptions} from '../../utils'
import {Density} from './Theme-provider.enum'

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
