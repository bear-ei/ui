import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Avatar} from './Avatar.component'

describe('Avatar Component', () => {
	it('should renders labelText when no image source is provided', async () => {
		const {getByTestId} = renderWithTheme(<Avatar labelText='John' />)

		await waitFor(() => {
			expect(getByTestId('avatar__labelText--test-id')).toBeTruthy()
			expect(getByTestId('avatar__labelText--test-id').props.children).toBe('J')
		})
	})

	it('should renders image when source is provided', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				testID='avatar'
				source={{uri: 'https://example.com/image.png'}}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('avatar__image--test-id')).toBeTruthy()
			expect(queryByTestId('avatar__labelText--test-id')).toBeNull()
		})
	})

	it('should renders image with defaultSource when only defaultSource is provided', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				accessibilityLabel='T'
				testID='avatar'
				defaultSource={{uri: 'https://example.com/default.png'}}
			/>
		)

		await waitFor(() => {
			expect(getByTestId('avatar__image--test-id')).toBeTruthy()
			expect(queryByTestId('avatar__labelText--test-id')).toBeNull()
		})
	})

	it('should applies backgroundColor and size correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Avatar
				labelText='B'
				testID='avatar'
				backgroundColor='#123456'
				size={60}
			/>
		)

		await waitFor(() => {
			const content = getByTestId('avatar__content--test-id')

			expect(content).toBeTruthy()
			expect(content.props.style).toBeDefined()
		})
	})

	it('should sets accessibilityLabel based on labelText', async () => {
		const {getByLabelText} = renderWithTheme(
			<Avatar
				labelText='Z'
				testID='avatar'
			/>
		)

		await waitFor(() => {
			expect(getByLabelText('Avatar: Z')).toBeTruthy()
		})
	})
})
