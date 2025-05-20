import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Icon} from '../Icon'
import {IconButton} from './Icon-button.component'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

describe('IconButton Component', () => {
	it('renders default filled icon button correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<IconButton
				icon={<Icon />}
				testID='iconButton'
			/>
		)

		const {iconButton, icon} = await waitFor(() => ({
			iconButton: getByTestId('iconButton'),
			icon: getByTestId(/^iconButton__icon--/)
		}))

		expect(iconButton).toBeTruthy()
		expect(icon).toBeTruthy()
	})

	it('renders loading state with progress indicator', async () => {
		const {getByTestId} = renderWithTheme(
			<IconButton
				loading
				icon={<Icon />}
				testID='iconButton'
			/>
		)

		const {progress, icon} = await waitFor(() => ({
			progress: getByTestId(/^iconButton__progress--/),
			icon: getByTestId(/^iconButton__progressIcon--/)
		}))

		expect(progress).toBeTruthy()
		expect(icon).toBeTruthy()
	})

	it('disables interaction when loading is true', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(
			<IconButton
				loading
				onPressOut={onPressOut}
				icon={<Icon />}
				testID='iconButton'
			/>
		)

		const touchable = await waitFor(() => getByTestId(/^iconButton__touchable--/))

		fireEvent(touchable, 'onPressOut')
		expect(onPressOut).not.toHaveBeenCalled()
	})

	it('disables interaction when disabled prop is true', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(
			<IconButton
				disabled
				onPressOut={onPressOut}
				icon={<Icon />}
				testID='iconButton'
			/>
		)

		const touchable = await waitFor(() => getByTestId(/^iconButton__touchable--/))

		fireEvent(touchable, 'onPressOut')
		expect(onPressOut).not.toHaveBeenCalled()
	})

	it('renders different button types', async () => {
		const types = Object.values(ICON_BUTTON_TYPE)

		for (const type of types) {
			const {getByTestId, unmount} = renderWithTheme(
				<IconButton
					type={type}
					icon={<Icon />}
					testID='iconButton'
				/>
			)

			const touchable = await waitFor(() => getByTestId('iconButton'))

			expect(touchable).toBeTruthy()
			unmount()
		}
	})

	it('renders with labelText used as accessibilityLabel', async () => {
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
