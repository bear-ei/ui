import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {LayoutNavigation} from './Layout-navigation.component'

describe('LayoutNavigation', () => {
	it('should render LayoutNavigation with default testID', () => {
		const {getByTestId} = renderWithTheme(<LayoutNavigation testID='default' />)

		expect(getByTestId('layoutNavigation--default')).toBeTruthy()
	})

	it('should render LayoutNavigation with collapse animation type', () => {
		const {getByTestId} = renderWithTheme(
			<LayoutNavigation
				animatedType={LAYOUT_ANIMATED.COLLAPSE_X}
				testID='collapse'
			>
				<Text>Navigation Content</Text>
			</LayoutNavigation>
		)

		const layoutNavigationContainer = getByTestId('layoutNavigation--collapse')
		expect(layoutNavigationContainer).toBeTruthy()
	})

	it('should render LayoutNavigation with default visibility as true', () => {
		const {getByTestId} = renderWithTheme(
			<LayoutNavigation testID='visible'>
				<Text>Visible Navigation Content</Text>
			</LayoutNavigation>
		)

		const layoutNavigationContainer = getByTestId('layoutNavigation--visible')
		expect(layoutNavigationContainer).toBeTruthy()
	})
})
