import {SIZE} from '@bearei/material-token'
import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Fab} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'

describe('Fab', () => {
	it('renders with default props', () => {
		const {getByTestId} = renderWithTheme(<Fab />)
		const container = getByTestId('fab--test-id')

		expect(container).toBeTruthy()
	})

	it('renders with icon and extended labelText', () => {
		const {getByTestId} = renderWithTheme(
			<Fab
				icon={<Text>★</Text>}
				labelText='Create'
			/>
		)

		const label = getByTestId('fab__animatedLabelText--test-id')

		expect(label).toBeTruthy()
		expect(label.props.children).toBe('Create')
	})

	it('applies correct size and shape when size is LARGE', () => {
		const {getByTestId} = renderWithTheme(<Fab size={SIZE.LARGE} />)
		const container = getByTestId('fab--test-id')

		expect(container.props.testID).toContain('fab--')
	})

	it('handles disabled state', () => {
		const {getByTestId} = renderWithTheme(<Fab disabled />)
		const container = getByTestId('fab--test-id')

		expect(container.props.accessibilityState.disabled).toBe(true)
	})

	it('renders correct underlay and elevation', () => {
		const {getByTestId} = renderWithTheme(<Fab />)
		const underlay = getByTestId('fab__animatedBackgroundUnderlay--test-id')
		const elevation = getByTestId('fab__elevation--test-id')

		expect(underlay).toBeTruthy()
		expect(elevation).toBeTruthy()
	})

	it('does not render labelText when extendedFAB is false', () => {
		const {queryByTestId} = renderWithTheme(<Fab extendedFAB={false} />)
		const label = queryByTestId(/^fab__animatedLabelText--/)

		expect(label).toBeNull()
	})

	it('renders with secondary FAB type', () => {
		const {getByTestId} = renderWithTheme(<Fab type={FAB_TYPE.SECONDARY} />)
		const container = getByTestId('fab--test-id')

		expect(container).toBeTruthy()
	})

	it('should trigger onPressOut callback when pressOut event occurs', async () => {
		const mockFn = jest.fn()
		const {getByTestId} = renderWithTheme(
			<Fab
				testID='cb-4'
				onPressOut={mockFn}
			/>
		)

		const touchable = getByTestId('fab__touchable--test-id')

		fireEvent(touchable, 'pressOut')
		await waitFor(() => {
			expect(mockFn).toHaveBeenCalled()
		})
	})
})
