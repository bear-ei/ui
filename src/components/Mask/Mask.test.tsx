import {fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Mask} from './Mask.component'

describe('Mask Component', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = renderWithTheme(<Mask visible />)
		const {mask, maskContent} = await waitFor(() => ({
			mask: getByTestId('mask--test-id'),
			maskContent: getByTestId('mask__content--test-id')
		}))

		expect(mask).toBeTruthy()
		expect(maskContent).toBeTruthy()
	})

	it('should applies background color if provided', async () => {
		const {getByTestId} = renderWithTheme(
			<Mask
				visible
				backgroundColor='#123456'
			/>
		)

		const mask = await waitFor(() => getByTestId('mask--test-id'))

		expect(mask.props.backgroundColor).toBe('#123456')
	})

	it('should passes interaction handlers to Content', async () => {
		const {getByTestId} = renderWithTheme(
			<Mask
				visible
				testID='custom-mask'
			/>
		)

		const content = await waitFor(() => getByTestId('mask__content--test-id'))

		expect(content).toBeTruthy()
		fireEvent(content, 'pressIn')
	})
})
