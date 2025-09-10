import type {Token} from '@bearei/element-token'
import type {ReactNode} from 'react'
import type {AdaptDesignOptions} from '../../utils'

export interface ThemeProps {
	children?: ReactNode
	density?: number
	designOptions?: AdaptDesignOptions
	story?: boolean
	token?: Token
}

export interface ThemeContainerProps {
	story?: boolean
}
