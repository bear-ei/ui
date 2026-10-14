import type {Opacity} from './opacity.interface'

const OPACITY = {
	level0: 0,
	level1: 0.05,
	level2: 0.1,
	level3: 0.15,
	level4: 0.3,
	level5: 0.4,
	level6: 0.5,
	level7: 0.6,
	level8: 0.7,
	level9: 0.85,
	level10: 1
}

export const createOpacity = (): Opacity => OPACITY
