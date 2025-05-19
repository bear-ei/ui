import {fireEvent, waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Button} from './Button.component'
import {BUTTON_TYPE} from './Button.enum'

describe('Button Component', () => {
	it('should renders with default props', async () => {
		const {getByTestId} = renderWithTheme(<Button testID='button' />)

		await waitFor(() => {
			expect(getByTestId('button')).toBeTruthy()
			expect(getByTestId('button__animatedLabelText--test-id').props.children).toBe('Label')
		})
	})

	it('should renders with different BUTTON_TYPE.FILLED', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				type={BUTTON_TYPE.FILLED}
				testID={`button-${BUTTON_TYPE.FILLED}`}
			/>
		)

		await waitFor(() => {
			expect(getByTestId(`button-${BUTTON_TYPE.FILLED}`)).toBeTruthy()
		})
	})

	it('should renders with different BUTTON_TYPE.OUTLINED', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				type={BUTTON_TYPE.OUTLINED}
				testID={`button-${BUTTON_TYPE.OUTLINED}`}
			/>
		)

		await waitFor(() => {
			expect(getByTestId(`button-${BUTTON_TYPE.OUTLINED}`)).toBeTruthy()
		})
	})

	it('should renders icon when provided', async () => {
		const icon = <Text>🔥</Text>
		const {getByTestId} = renderWithTheme(
			<Button
				testID='icon-button'
				icon={icon}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('icon-button')).toBeTruthy()
			expect(getByTestId('button__iconLayout--test-id')).toBeTruthy()
		})
	})

	it('should renders underlay and elevation correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='underlay-button'
				type={BUTTON_TYPE.ELEVATED}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('button__backgroundUnderlay--test-id')).toBeTruthy()
			expect(getByTestId('button__elevation--test-id')).toBeTruthy()
		})
	})

	it('should does not render elevation for non-elevated buttons', async () => {
		const {queryByTestId} = renderWithTheme(
			<Button
				testID='non-elevated-button'
				type={BUTTON_TYPE.TEXT}
			/>
		)

		await waitFor(() => {
			expect(queryByTestId('button__elevation--test-id')).toBeNull()
		})
	})

	it('should shows active indicator for LINK type on interaction', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='link-button'
				type={BUTTON_TYPE.LINK}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('button__activeIndicatorLayoutAnimated--test-id')).toBeTruthy()
		})
	})

	it('should renders correctly in loading state', async () => {
		const {getByTestId} = renderWithTheme(
			<Button
				testID='loading-button'
				loading
			/>
		)

		await waitFor(() => {
			expect(getByTestId('button__underlay--test-id')).toBeTruthy()
		})
	})

	it('should trigger onPressOut callback when pressOut event occurs', async () => {
		const onPressOut = jest.fn()
		const {getByTestId} = renderWithTheme(<Button onPressOut={onPressOut} />)
		const touchable = await waitFor(() => getByTestId('button__touchable--test-id'))

		fireEvent(touchable, 'pressOut')

		await waitFor(() => {
			expect(onPressOut).toHaveBeenCalled()
		})
	})
})
