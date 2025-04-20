import {waitFor} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {NAVIGATION_RAIL_TYPE} from '../../Navigation-rail/Navigation-rail.enum'
import {NavigationRailItem} from './Navigation-rail-item.component'

jest.useFakeTimers()

describe('NavigationRailItem', () => {
	const baseProps = {
		indexKey: 'home',
		labelText: 'Home',
		icon: <Text>🏠</Text>,
		activeKey: 'home',
		type: NAVIGATION_RAIL_TYPE.SEGMENT
	}

	it('should render item correctly', async () => {
		const {getByText} = renderWithTheme(<NavigationRailItem {...baseProps} />)

		jest.runAllTimers()
		await waitFor(() => {
			expect(getByText('Home')).toBeTruthy()
		})
	})
})
