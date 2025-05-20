import {View} from 'react-native'
import type {SvgProps} from 'react-native-svg'

export const SvgMock = (props: SvgProps) => (
	<View
		testID='svg-icon'
		{...props}
	/>
)
