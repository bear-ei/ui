import {DefaultTheme} from 'styled-components'
import {LayoutAnimatedProps} from '../../Layout-animated'

export type LayoutNavigationProps = LayoutAnimatedProps
export interface RenderLayoutNavigationProps extends LayoutNavigationProps {
        theme: DefaultTheme
}

export interface LayoutNavigationBaseProps extends LayoutNavigationProps {
        render: (props: RenderLayoutNavigationProps) => JSX.Element
}
