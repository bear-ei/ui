import {fireEvent, waitFor} from '@testing-library/react-native'
import React from 'react'
import {renderWithTheme} from '../../../__test__'
import {Checkbox} from './Checkbox.component'

describe('Checkbox', () => {
	it('should render as unselected by default', () => {
		const {getByTestId} = renderWithTheme(<Checkbox testID='cb-1' />)

		expect(getByTestId('layoutAnimated--checkbox__iconLayout--blank--cb-1')).toBeTruthy()
	})

	it('should render selected icon when active=true', () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='cb-2'
				active
			/>
		)

		expect(getByTestId('layoutAnimated--checkbox__iconLayout--selected--cb-2')).toBeTruthy()
	})

	it('should render indeterminate icon when indeterminate=true', () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='cb-3'
				indeterminate
			/>
		)

		expect(getByTestId('layoutAnimated--checkbox__iconLayout--indeterminate--cb-3')).toBeTruthy()
	})

	it('should call onActive(true) when toggled from false to true', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='cb-4'
				defaultActive={false}
				onActive={mockFn}
			/>
		)

		const touchable = getByTestId('touchable__touchableContent--cb-4')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).toHaveBeenCalledWith(true)
		})
	})

	it('should call onActive(false) when toggled from true to false', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='cb-5'
				defaultActive={true}
				onActive={mockFn}
			/>
		)

		const touchable = getByTestId('touchable__touchableContent--cb-5')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).toHaveBeenCalledWith(false)
		})
	})

	it('should not call onActive when disabled', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='cb-6'
				defaultActive={false}
				onActive={mockFn}
				disabled
			/>
		)

		const touchable = getByTestId('touchable__touchableContent--cb-6')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).not.toHaveBeenCalled()
		})
	})

	it('should handle error state icon fill correctly', () => {
		const {getByTestId} = renderWithTheme(
			<Checkbox
				testID='cb-7'
				active
				error
			/>
		)

		expect(getByTestId('layoutAnimated--checkbox__iconLayout--selected--cb-7')).toBeTruthy()
	})
})
