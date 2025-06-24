import type {DefaultTheme} from 'styled-components/native'
import {DENSITY_SCALE, type Density} from '../../components'

export const getScaledSpacing = (density?: Density | number) => (theme: DefaultTheme) =>
	(typeof density === 'number' ? density : DENSITY_SCALE[density ?? theme.density]) *
	theme.token.spacing.extraSmall
