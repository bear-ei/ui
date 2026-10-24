import type {Orientation} from '../../constants'
import type {LayoutAnimatedProps} from '../Layout-animated'

export interface LayoutProps extends LayoutAnimatedProps {
	orientation?: Orientation
}

export type RenderLayoutProps = LayoutProps
export type LayoutBaseProps = LayoutProps
