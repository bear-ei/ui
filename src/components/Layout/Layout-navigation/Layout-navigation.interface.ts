import {DefaultTheme} from 'styled-components'
import {LayoutAnimatedProps} from '../../Layout-animated'

export interface LayoutNavigationProps extends Omit<LayoutAnimatedProps, 'children'> {
        children?: React.ReactNode
}

export interface RenderLayoutNavigationProps extends LayoutNavigationProps {
        theme: DefaultTheme
}

export interface LayoutNavigationBaseProps extends LayoutNavigationProps {
        render: (props: RenderLayoutNavigationProps) => JSX.Element
}
