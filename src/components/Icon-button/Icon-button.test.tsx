import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Icon} from '../Icon'
import {IconButton} from './Icon-button.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

describe('IconButton Component', () => {
	it('should renders default filled icon button correctly', async () => {
		const {getByTestId} = renderWithTheme(
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
		const {getByTestId} = renderWithTheme(
			<IconButton
				icon={<Icon />}
				loading
				testID='iconButton'
			/>
		)

		const {progress, icon} = await waitFor(() => ({
			icon: getByTestId('iconButton__progressIcon--test-id'),
			progress: getByTestId('iconButton__progress--test-id')
		}))

		expect(icon).toBeTruthy()
		expect(progress).toBeTruthy()
	})

	it('should disables interaction when loading is true', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(
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
		const {getByTestId} = renderWithTheme(
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
			const {getByTestId, unmount} = renderWithTheme(
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
		const {getByLabelText} = renderWithTheme(
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
