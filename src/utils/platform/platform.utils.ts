import {Platform} from 'react-native'

const pxToRem = (px: number, basePX = 16) => px / basePX
export const platformValue = (value: number) => {
	'worklet'

	return Platform.select<string | number>({default: value, web: `${pxToRem(value)}rem`})
}
