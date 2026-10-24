import type {Updater} from 'use-immer'

import {type ScaledSize} from 'react-native'

export const handleWindowScaledSizeChange =
	(setState: Updater<ScaledSize>) =>
	({window}: {window: ScaledSize}) => {
		const {fontScale, height, scale, width} = window

		setState(draft => {
			draft.fontScale = fontScale
			draft.height = height
			draft.scale = scale
			draft.width = width
		})
	}
