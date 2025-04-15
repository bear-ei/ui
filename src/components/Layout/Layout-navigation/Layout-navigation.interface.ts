import type {DefaultTheme} from 'styled-components'
import type {LayoutAnimatedProps} from '../../Layout-animated'

export type LayoutNavigationProps = LayoutAnimatedProps
export interface RenderLayoutNavigationProps extends LayoutNavigationProps {
	theme: DefaultTheme
}

export interface LayoutNavigationBaseProps extends LayoutNavigationProps {
	render: (props: RenderLayoutNavigationProps) => React.JSX.Element
}
