import type {Contrast} from '../color'
import type {Palette} from '../palette'
import type {ColorScheme, Scheme} from './scheme.interface'

const createColorScheme =
	(palette: Palette) =>
	(scheme: Scheme) =>
	(contrast: Contrast): ColorScheme =>
		palette[scheme][contrast]

const hexToRGBA =
	(color: string) =>
	(opacity = 1) => {
		if (!/^#([A-Fa-f0-9]{2}){3}$/.test(color)) {
			throw new Error("Invalid color format. Expected '#RRGGBB'.")
		}

		const blue = parseInt(color.slice(5, 7), 16)
		const green = parseInt(color.slice(3, 5), 16)
		const red = parseInt(color.slice(1, 3), 16)

		return `rgba(${red}, ${green}, ${blue}, ${opacity})`
	}

export {createColorScheme, hexToRGBA}
