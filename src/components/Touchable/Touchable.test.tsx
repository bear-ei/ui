import {act, fireEvent, waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {Touchable} from '../Touchable'

describe('Touchable Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should render ripple layout and content', async () => {
		const {getByTestId} = await renderWithAct(
			<Touchable testID='touchable'>
				<></>
			</Touchable>
		)

		const {touchable, rippleLayout, touchableContent} = await waitFor(() => ({
			rippleLayout: getByTestId('touchable__rippleLayout--test-id'),
			touchable: getByTestId('touchable'),
			touchableContent: getByTestId('touchable__touchableContent--test-id')
		}))

		expect(rippleLayout).toBeTruthy()
		expect(touchable).toBeTruthy()
		expect(touchableContent).toBeTruthy()
	})

	it('should clean ripple after animation ends', async () => {
		const {getByTestId, queryAllByTestId} = await renderWithAct(
			<Touchable testID='touchable'>
				<></>
			</Touchable>
		)

		const touchable = await waitFor(() => getByTestId('touchable__touchableContent--test-id'))

		await act(async () =>
			fireEvent(touchable, 'pressIn', {
				nativeEvent: {locationX: 10, locationY: 10}
			})
		)

		const ripples = await waitFor(() => queryAllByTestId('touchable__touchableRipple--test-id'))

		await new Promise(r => setTimeout(r, 500))

		expect(ripples.length).toBe(0)
	})
})
