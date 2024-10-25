import {Token} from '@bearei/material-token'
import {ReactNode} from 'react'
import {AdaptDesignOptions} from '../../utils'

export interface ThemeProps {
        children?: ReactNode
        designOptions?: AdaptDesignOptions
        story?: boolean
        token?: Token
}

export interface ThemeContainerProps {
        story?: boolean
}
