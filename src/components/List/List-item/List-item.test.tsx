import {fireEvent, waitFor} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../../__test__'
import {ListItem} from '../List-item'
import {ACTIVE_TRIGGER_EVEN_NAME, LIST_SELECT_TYPE} from '../List.enum'

describe('ListItem', () => {
	const baseProps = {
		indexKey: 'test-key',
		itemIndex: 0,
		headline: 'Test Headline',
		supporting: 'Supporting Text',
		onLoadEnd: jest.fn(),
		onActive: jest.fn(),
		trailing: <Text testID='custom-trailing'>...</Text>,
		afterAffordance: true,
		onCancel: jest.fn(),
		onConfirm: jest.fn(),
		close: false
	}

	it('should render headline and supporting correctly', async () => {
		const {getByTestId} = renderWithTheme(<ListItem {...baseProps} />)

		await waitFor(() => {
			expect(getByTestId('listItem__animatedHeadlineText--test-id')).toBeTruthy()
			expect(getByTestId('listItem__supportingText--test-id')).toBeTruthy()
		})
	})

	it('should call onActive on pressIn if configured', async () => {
		const props = {
			...baseProps,
			activeTriggerEvenName: ACTIVE_TRIGGER_EVEN_NAME.PRESS_OUT,
			selectType: LIST_SELECT_TYPE.SINGLE
		}

		const {getByTestId} = renderWithTheme(<ListItem {...props} />)
		const touchable = getByTestId('listItem__touchable--test-id')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(baseProps.onActive).toHaveBeenCalled()
		})
	})

	it('should render trailing element if provided', async () => {
		const {getByTestId} = renderWithTheme(<ListItem {...baseProps} />)

		await waitFor(() => {
			expect(getByTestId('listItem__trailingLayoutAnimated--test-id')).toBeTruthy()
		})
	})
})
