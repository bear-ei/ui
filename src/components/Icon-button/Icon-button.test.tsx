import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {Icon} from '../Icon'
import {IconButton} from './Icon-button.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

describe('IconButton Component', () => {
	it('should renders default filled icon button correctly', async () => {
		const {getByTestId} = await renderWithAct(
			<IconButton
				icon={<Icon />}
				testID='iconButton'
			/>
		)

		const {iconButton, icon} = await waitFor(() => ({
			iconButton: getByTestId('iconButton'),
			icon: getByTestId('iconButton__icon--test-id')
		}))

		expect(icon).toBeTruthy()
		expect(iconButton).toBeTruthy()
	})

	it('should renders loading state with progress indicator', async () => {
		const {getByTestId} = await renderWithAct(
			<IconButton
				icon={<Icon />}
				loading
				testID='iconButton'
			/>
		)

		const {progress} = await waitFor(() => ({
			progress: getByTestId('iconButton__progress--test-id')
		}))

		expect(progress).toBeTruthy()
	})

	it('should disables interaction when loading is true', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = await renderWithAct(
			<IconButton
				icon={<Icon />}
				loading
				onPressOut={onPressOut}
				testID='iconButton'
			/>
		)

		const touchable = await waitFor(() => getByTestId('iconButton__touchable--test-id'))

		await act(async () => fireEvent(touchable, 'pressOut'))
		await waitFor(() => expect(onPressOut).not.toHaveBeenCalled())
	})

	it('should disables interaction when disabled prop is true', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = await renderWithAct(
			<IconButton
				disabled
				icon={<Icon />}
				onPressOut={onPressOut}
				testID='iconButton'
			/>
		)

		const touchable = await waitFor(() => getByTestId('iconButton__touchable--test-id'))

		await act(async () => fireEvent(touchable, 'pressOut'))
		await waitFor(() => expect(onPressOut).not.toHaveBeenCalled())
	})

	it('should renders different button types', async () => {
		const types = Object.values(ICON_BUTTON_TYPE)

		for (const type of types) {
			const {getByTestId, unmount} = await renderWithAct(
				<IconButton
					icon={<Icon />}
					testID='iconButton'
					type={type}
				/>
			)

			const touchable = await waitFor(() => getByTestId('iconButton'))

			expect(touchable).toBeTruthy()
			unmount()
		}
	})

	it('should renders with labelText used as accessibilityLabel', async () => {
		const {getByLabelText} = await renderWithAct(
			<IconButton
				icon={<Icon />}
				labelText='Warning'
				testID='iconButton'
			/>
		)

		const iconButton = await waitFor(() => getByLabelText('Warning'))

		expect(iconButton).toBeTruthy()
	})
})
