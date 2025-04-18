import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {LayoutAnimated} from './Layout-animated.component'

describe('LayoutAnimated', () => {
	it('should render LayoutAnimated with default testID', () => {
		const {getByTestId} = renderWithTheme(
			<LayoutAnimated testID='default'>
				<Text>Test Content</Text>
			</LayoutAnimated>
		)

		expect(getByTestId('layoutAnimated--default')).toBeTruthy()
	})

	it('should render LayoutAnimated with default testID', () => {
		const {getByTestId} = renderWithTheme(
			<LayoutAnimated
				testID='visible'
				defaultVisible={false}
				visible={false}
			>
				<Text>Test Content</Text>
			</LayoutAnimated>
		)

		expect(getByTestId('layoutAnimated--visible')).toBeTruthy()
	})
})
