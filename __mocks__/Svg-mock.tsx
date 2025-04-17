import React from 'react'
import {View} from 'react-native'
import type {SvgProps} from 'react-native-svg'

const SvgMock = (props: SvgProps) => (
	<View
		testID='svg-icon'
		{...props}
	/>
)

export default SvgMock
