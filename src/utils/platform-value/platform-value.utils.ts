import {Platform} from 'react-native'
import {pxToRem} from '../px-to-rem'

export const platformValue = (value: number) => {
	'worklet'

	return Platform.select<string | number>({default: value, web: `${pxToRem()(value)}rem`})
}
