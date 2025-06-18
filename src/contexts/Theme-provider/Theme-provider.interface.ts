import type {Token} from '@bearei/element-token'
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
	story?: boolean
}
