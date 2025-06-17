import type {LayoutType} from '../Common'
import type {LayoutAnimatedProps} from '../Layout-animated'

export interface LayoutProps extends LayoutAnimatedProps {
	layout?: LayoutType
}

export type RenderLayoutProps = LayoutProps
export type LayoutBaseProps = LayoutProps
