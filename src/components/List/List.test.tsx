import {waitFor} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {List} from './List.component'

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock')

	Reanimated.scrollTo = jest.fn()

	return Reanimated
})

describe('List', () => {
	it('should render list with given items', async () => {
		const mockData = [
			{indexKey: '1', headline: 'Item 1'},
			{indexKey: '2', headline: 'Item 2'}
		]

		const {getByTestId} = renderWithTheme(
			<List
				data={mockData}
				testID='basic'
			/>
		)

		await waitFor(() => {
			expect(getByTestId('basic')).toBeTruthy()
			expect(getByTestId('list__virtualList--test-id')).toBeTruthy()
		})
	})
})
