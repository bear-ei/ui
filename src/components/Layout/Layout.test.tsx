import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Layout} from './Layout.component'

describe('Layout', () => {
	it('should render the Layout component with default testID', () => {
		const {getByTestId} = renderWithTheme(<Layout testID='default' />)

		expect(getByTestId('default')).toBeTruthy()
	})

	it('should render Layout with a child Pane component', () => {
		const {getByTestId} = renderWithTheme(
			<Layout testID='with-pane'>
				<Layout.Pane testID='child'>
					<Text>Pane Content</Text>
				</Layout.Pane>
			</Layout>
		)

		expect(getByTestId('child')).toBeTruthy()
	})

	it('should render Layout with a child Navigation component', () => {
		const {getByTestId} = renderWithTheme(
			<Layout testID='with-navigation'>
				<Layout.Navigation testID='child'>
					<Text>Navigation Content</Text>
				</Layout.Navigation>
			</Layout>
		)

		expect(getByTestId('child')).toBeTruthy()
	})
})
