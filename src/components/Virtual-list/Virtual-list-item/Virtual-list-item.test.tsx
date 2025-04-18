import {act, waitFor} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {VirtualListItem} from '../Virtual-list-item'

jest.useFakeTimers()

describe('VirtualListItem', () => {
	const item = {indexKey: 'key-1', headline: 'Test Item'}
	const baseProps = {
		item,
		index: 0,
		itemSize: 50,
		renderItem: ({item}: any) => <Text>{item.headline}</Text>
	}

	it('should render item correctly after init delay', async () => {
		const {queryByText} = renderWithTheme(<VirtualListItem {...baseProps} />)

		expect(queryByText('Test Item')).toBeNull()
		act(() => {
			jest.runAllTimers()
		})

		await waitFor(() => {
			expect(queryByText('Test Item')).not.toBeNull()
		})
	})
})
