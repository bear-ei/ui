import {pxToRem} from '@bearei/theme-token'
import {Platform} from 'react-native'

export const platformValue = (value: number) => {
	'worklet'

	return Platform.select<string | number>({default: value, web: `${pxToRem()(value)}rem`})
}
