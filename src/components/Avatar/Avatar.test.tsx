import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Avatar} from './Avatar.component'

describe('Avatar Component', () => {
	it('should renders labelText when no image source is provided', async () => {
		const {getByTestId} = renderWithTheme(<Avatar labelText='John' />)
		const avatarLabelText = await waitFor(() => getByTestId('avatar__labelText--test-id'))

		expect(avatarLabelText).toBeTruthy()
		expect(avatarLabelText.props.children).toBe('J')
	})

	it('should renders image when source is provided', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				testID='avatar'
				source={{uri: 'https://example.com/image.png'}}
			/>
		)

		const {avatarImage, avatarLabelText} = await waitFor(() => ({
			avatarImage: getByTestId('avatar__image--test-id'),
			avatarLabelText: queryByTestId('avatar__labelText--test-id')
		}))

		expect(avatarImage).toBeTruthy()
		expect(avatarLabelText).toBeNull()
	})

	it('should renders image with defaultSource when only defaultSource is provided', async () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				accessibilityLabel='T'
				testID='avatar'
				defaultSource={{uri: 'https://example.com/default.png'}}
			/>
		)

		const {avatarImage, avatarLabelText} = await waitFor(() => ({
			avatarImage: getByTestId('avatar__image--test-id'),
			avatarLabelText: queryByTestId('avatar__labelText--test-id')
		}))

		expect(avatarImage).toBeTruthy()
		expect(avatarLabelText).toBeNull()
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

		const avatarContent = await waitFor(() => getByTestId('avatar__content--test-id'))

		expect(avatarContent).toBeTruthy()
		expect(avatarContent.props.style).toBeDefined()
	})

	it('should sets accessibilityLabel based on labelText', async () => {
		const {getByLabelText} = renderWithTheme(
			<Avatar
				labelText='Z'
				testID='avatar'
			/>
		)

		const avatarLabelText = await waitFor(() => getByLabelText('Avatar: Z'))

		expect(avatarLabelText).toBeTruthy()
	})
})
