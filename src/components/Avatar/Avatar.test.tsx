import {renderWithTheme} from '../../../__test__'
import {Avatar} from './Avatar.component'

describe('Avatar', () => {
	it('should render label text if no image is provided', () => {
		const {getByTestId, getByLabelText} = renderWithTheme(
			<Avatar
				testID='test-avatar'
				labelText='John'
			/>
		)

		const label = getByTestId('avatar__labelText--test-id')
		const container = getByLabelText('Avatar: J')

		expect(label.props.children).toBe('J')
		expect(container).toBeTruthy()
		expect(container.props.accessibilityRole).toBe('image')
		expect(container.props.accessible).toBe(true)
	})

	it('should render image when source is provided', () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Avatar
				testID='test-avatar'
				source={{uri: 'https://example.com/image.png'}}
			/>
		)

		const image = getByTestId('avatar__image--test-id')
		const label = queryByTestId('avatar__labelText--test-id')

		expect(image).toBeTruthy()
		expect(label).toBeNull()
	})

	it('should render defaultSource if provided and source is missing', () => {
		const {getByTestId} = renderWithTheme(
			<Avatar
				testID='test-avatar'
				defaultSource={{uri: 'https://example.com/fallback.png'}}
			/>
		)

		const image = getByTestId('avatar__image--test-id')

		expect(image).toBeTruthy()
	})

	it('should use provided shape and size', () => {
		const {getByTestId} = renderWithTheme(
			<Avatar
				testID='test-avatar'
				labelText='A'
				shape='FULL'
				size={40}
			/>
		)

		const content = getByTestId('avatar__content--test-id')

		expect(content).toBeTruthy()
	})
})
