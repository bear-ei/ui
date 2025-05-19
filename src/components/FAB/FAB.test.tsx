import {SIZE} from '@bearei/material-token'
import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Fab} from './FAB.component'
import {FAB_TYPE} from './FAB.enum'

describe('Fab Component', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = renderWithTheme(
			<Fab
				testID='fab'
				icon={<Text>+</Text>}
			/>
		)

		const {fab, fabIcon} = await waitFor(() => ({
			fab: getByTestId('fab'),
			fabIcon: getByTestId('fab__icon--test-id')
		}))

		expect(fab).toBeTruthy()
		expect(fabIcon).toBeTruthy()
	})

	it('should renders labelText when extendedFAB is true', async () => {
		const {getByTestId, getByText} = renderWithTheme(
			<Fab
				icon={<Text>+</Text>}
				labelText='Create'
				testID='fab'
			/>
		)

		const {fabAnimatedLabelText, fabCreate} = await waitFor(() => ({
			fabAnimatedLabelText: getByTestId('fab__animatedLabelText--test-id'),
			fabCreate: getByText('Create')
		}))

		expect(fabAnimatedLabelText).toBeTruthy()
		expect(fabCreate).toBeTruthy()
	})

	it('should renders with different type and size', async () => {
		const {getByTestId} = renderWithTheme(
			<Fab
				testID='fab'
				icon={<Text>+</Text>}
				labelText='Add'
				type={FAB_TYPE.SECONDARY}
				size={SIZE.LARGE}
				extendedFAB
			/>
		)

		const {fabAnimatedLabelText, fabIcon} = await waitFor(() => ({
			fabAnimatedLabelText: getByTestId('fab__animatedLabelText--test-id'),
			fabIcon: getByTestId('fab__icon--test-id')
		}))

		expect(fabIcon).toBeTruthy()
		expect(fabAnimatedLabelText).toBeTruthy()
	})

	it('should applies animated styles', async () => {
		const {getByTestId} = renderWithTheme(
			<Fab
				extendedFAB
				icon={<Text>+</Text>}
				labelText='A'
				testID='fab'
			/>
		)

		const {fabBackground, fabAnimatedLabelText} = await waitFor(() => ({
			fabAnimatedLabelText: getByTestId('fab__animatedLabelText--test-id'),
			fabBackground: getByTestId('fab__backgroundUnderlay--test-id')
		}))

		expect(fabAnimatedLabelText.props.style).toBeDefined()
		expect(fabBackground.props.style).toBeDefined()
	})

	it('should trigger onPressOut callback when pressOut event occurs', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(<Fab onPressOut={onPressOut} />)
		const touchable = await waitFor(() => getByTestId('fab__touchable--test-id'))

		fireEvent(touchable, 'pressOut')

		await waitFor(() => {
			expect(onPressOut).toHaveBeenCalled()
		})
	})
})
