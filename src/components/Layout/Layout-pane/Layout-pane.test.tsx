import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {LayoutPane} from './Layout-pane.component'

describe('LayoutPane', () => {
	it('should render the LayoutPane component with default testID', () => {
		const {getByTestId} = renderWithTheme(<LayoutPane testID='default' />)

		expect(getByTestId('default')).toBeTruthy()
	})

	it('should render LayoutPane with default visibility as true', () => {
		const {getByTestId} = renderWithTheme(
			<LayoutPane testID='visible'>
				<Text>Visible Pane Content</Text>
			</LayoutPane>
		)

		const layoutPaneContainer = getByTestId('visible')
		expect(layoutPaneContainer).toBeTruthy()
	})
})
