import type {Token} from '@bearei/material-token'
import type {ReactNode} from 'react'
import type {Density} from '../../components'
import type {AdaptDesignOptions} from '../../utils'

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
