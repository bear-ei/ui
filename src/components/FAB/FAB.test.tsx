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
				icon={<Text>+</Text>}
				testID='fab'
			/>
		)

		const {fab, icon} = await waitFor(() => ({
			fab: getByTestId('fab'),
			icon: getByTestId('fab__icon--test-id')
		}))

		expect(fab).toBeTruthy()
		expect(icon).toBeTruthy()
	})

	it('should renders labelText when extendedFAB is true', async () => {
		const {getByTestId, getByText} = renderWithTheme(
			<Fab
				icon={<Text>+</Text>}
				labelText='Create'
				testID='fab'
			/>
		)

		const {labelText, create} = await waitFor(() => ({
			create: getByText('Create'),
			labelText: getByTestId('fab__animatedLabelText--test-id')
		}))

		expect(create).toBeTruthy()
		expect(labelText).toBeTruthy()
	})

	it('should renders with different type and size', async () => {
		const {getByTestId} = renderWithTheme(
			<Fab
				extendedFAB
				icon={<Text>+</Text>}
				labelText='Add'
				size={SIZE.LARGE}
				testID='fab'
				type={FAB_TYPE.SECONDARY}
			/>
		)

		const {labelText, icon} = await waitFor(() => ({
			icon: getByTestId('fab__icon--test-id'),
			labelText: getByTestId('fab__animatedLabelText--test-id')
		}))

		expect(icon).toBeTruthy()
		expect(labelText).toBeTruthy()
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

		const {backgroundUnderlay, labelText} = await waitFor(() => ({
			backgroundUnderlay: getByTestId('fab__backgroundUnderlay--test-id'),
			labelText: getByTestId('fab__animatedLabelText--test-id')
		}))

		expect(backgroundUnderlay.props.style).toBeDefined()
		expect(labelText.props.style).toBeDefined()
	})

	it('should trigger onPressOut callback when pressOut event occurs', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(<Fab onPressOut={onPressOut} />)
		const touchable = await waitFor(() => getByTestId('fab__touchable--test-id'))

		fireEvent(touchable, 'pressOut')
		await waitFor(() => expect(onPressOut).toHaveBeenCalled())
	})
})
