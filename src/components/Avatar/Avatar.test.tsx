import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Avatar} from './Avatar.component'

describe('Avatar Component', () => {
	it('should renders labelText when no image source is provided', async () => {
		const {getByTestId} = renderWithTheme(<Avatar labelText='John' />)
		const labelText = await waitFor(() => getByTestId('avatar__labelText--test-id'))

		expect(labelText.props.children).toBe('J')
		expect(labelText).toBeTruthy()
	})

	it('should renders image when source is provided', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				source={{uri: 'https://example.com/image.png'}}
				testID='avatar'
			/>
		)

		const {image, labelText} = await waitFor(() => ({
			image: getByTestId('avatar__image--test-id'),
			labelText: queryByTestId('avatar__labelText--test-id')
		}))

		expect(image).toBeTruthy()
		expect(labelText).toBeNull()
	})

	it('should renders image with defaultSource when only defaultSource is provided', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				accessibilityLabel='T'
				defaultSource={{uri: 'https://example.com/default.png'}}
				testID='avatar'
			/>
		)

		const {image, labelText} = await waitFor(() => ({
			image: getByTestId('avatar__image--test-id'),
			labelText: queryByTestId('avatar__labelText--test-id')
		}))

		expect(image).toBeTruthy()
		expect(labelText).toBeNull()
	})

	it('should applies backgroundColor and size correctly', async () => {
		const {getByTestId} = renderWithTheme(
			<Avatar
				backgroundColor='#123456'
				labelText='B'
				size={60}
				testID='avatar'
			/>
		)

		const content = await waitFor(() => getByTestId('avatar__content--test-id'))

		expect(content.props.style).toBeDefined()
		expect(content).toBeTruthy()
	})

	it('should sets accessibilityLabel based on labelText', async () => {
		const {getByLabelText} = renderWithTheme(
			<Avatar
				labelText='Z'
				testID='avatar'
			/>
		)

		const labelText = await waitFor(() => getByLabelText('Z'))

		expect(labelText).toBeTruthy()
	})
})
