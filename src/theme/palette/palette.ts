import {navy} from '../color'
import {PALETTE} from './palette.enum'
import type {Palette, PaletteType} from './palette.interface'

const THEME_PALETTES = {[PALETTE.NAVY]: navy}

export const createPalette = (palette: PaletteType = PALETTE.NAVY): Palette => THEME_PALETTES[palette]
