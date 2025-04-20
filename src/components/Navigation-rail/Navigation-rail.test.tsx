import {fireEvent, waitFor} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {NavigationRail} from './Navigation-rail.component'

jest.useFakeTimers()

describe('NavigationRail', () => {
	const mockData = [
		{indexKey: 'home', labelText: 'Home', icon: <Text>🏠</Text>},
		{indexKey: 'settings', labelText: 'Settings', icon: <Text>⚙️</Text>}
	]

	it('should render navigation rail items when data is loaded', async () => {
		const {getByTestId, queryByText} = renderWithTheme(
			<NavigationRail
				data={mockData}
				defaultActiveKey='home'
				testID='navigation-rail'
			/>
		)

		jest.runAllTimers()
		await waitFor(() => {
			expect(getByTestId('navigation-rail')).toBeTruthy()
			expect(queryByText('Home')).not.toBeNull()
			expect(queryByText('Settings')).not.toBeNull()
		})
	})

	it('should trigger onActive callback when item becomes active', async () => {
		const onActive = jest.fn()
		const {getByText} = renderWithTheme(
			<NavigationRail
				data={mockData}
				defaultActiveKey='home'
				onActive={onActive}
			/>
		)

		jest.runAllTimers()
		await waitFor(() => {
			const settings = getByText('Settings')

			fireEvent(settings, 'pressOut')
			expect(onActive).toHaveBeenCalledWith('settings')
		})
	})

	it('should render fab and menu when provided', async () => {
		const {getByTestId, queryByText} = renderWithTheme(
			<NavigationRail
				data={mockData}
				fab={<Text>FAB</Text>}
				menu={<Text>Menu</Text>}
				defaultActiveKey='home'
			/>
		)

		jest.runAllTimers()
		await waitFor(() => {
			expect(getByTestId('navigationRail--test-id')).toBeTruthy()
			expect(queryByText('FAB')).not.toBeNull()
			expect(queryByText('Menu')).not.toBeNull()
		})
	})
})
