import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Layout} from './Layout.component'

describe('Layout', () => {
	it('should render the Layout component with default testID', () => {
		const {getByTestId} = renderWithTheme(<Layout testID='default' />)

		expect(getByTestId('layoutAnimated--layout--default')).toBeTruthy()
	})

	it('should render Layout with a child Pane component', () => {
		const {getByTestId} = renderWithTheme(
			<Layout testID='with-pane'>
				<Layout.Pane testID='child'>
					<Text>Pane Content</Text>
				</Layout.Pane>
			</Layout>
		)

		expect(getByTestId('layoutAnimated--layoutPane--child')).toBeTruthy()
	})

	it('should render Layout with a child Navigation component', () => {
		const {getByTestId} = renderWithTheme(
			<Layout testID='with-navigation'>
				<Layout.Navigation testID='child'>
					<Text>Navigation Content</Text>
				</Layout.Navigation>
			</Layout>
		)

		expect(getByTestId('layoutAnimated--layoutNavigation--child')).toBeTruthy()
	})
})
