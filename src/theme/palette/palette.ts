import {navy} from '../color'
import {PALETTE} from './palette.enum'
import type {Palette, PaletteType} from './palette.interface'

export const createPalette = (palette = PALETTE.NAVY as PaletteType) => {
	const themePalette = {[PALETTE.NAVY]: navy} as Record<PaletteType, Palette>

	return themePalette[palette]
}
