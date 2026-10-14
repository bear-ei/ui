import {type ScaledSize} from 'react-native'
import type {Updater} from 'use-immer'

export const updateWindowScaledSize =
	(setState: Updater<ScaledSize>) =>
	({window}: {window: ScaledSize}) => {
		const {width, height, scale, fontScale} = window

		setState(draft => {
			draft.fontScale = fontScale
			draft.height = height
			draft.scale = scale
			draft.width = width
		})
	}
