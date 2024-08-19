import {Token} from '@bearei/ui-token'
import {ReactNode} from 'react'
import {AdaptDesignOptions} from '../../util'

export interface ThemeProps {
    children?: ReactNode
    designOptions?: AdaptDesignOptions
    story?: boolean
    token?: Token
}

export interface ThemeContainerProps {
    story?: boolean
}
