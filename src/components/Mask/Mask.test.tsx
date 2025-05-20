import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Mask} from './Mask.component'

describe('Mask Component', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = renderWithTheme(<Mask visible />)
		const {mask, content} = await waitFor(() => ({
			content: getByTestId('mask__content--test-id'),
			mask: getByTestId('mask--test-id')
		}))

		expect(content).toBeTruthy()
		expect(mask).toBeTruthy()
	})

	it('should applies background color if provided', async () => {
		const {getByTestId} = renderWithTheme(
			<Mask
				backgroundColor='#123456'
				visible
			/>
		)

		const mask = await waitFor(() => getByTestId('mask--test-id'))

		expect(mask.props.backgroundColor).toBe('#123456')
	})

	it('should passes interaction handlers to Content', async () => {
		const {getByTestId} = renderWithTheme(
			<Mask
				testID='custom-mask'
				visible
			/>
		)

		const content = await waitFor(() => getByTestId('mask__content--test-id'))

		expect(content).toBeTruthy()

		fireEvent(content, 'pressIn')
	})
})
