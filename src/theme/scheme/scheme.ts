import type {Contrast} from '../color'
import type {Palette} from '../palette'
import type {ColorMap, Scheme} from './scheme.interface'

const createColorMap = (palette: Palette, scheme: Scheme, contrast: Contrast): ColorMap => palette[scheme][contrast]

export {createColorMap}
