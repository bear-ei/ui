import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../../__test__'
import {TouchableRipple} from '../Touchable-ripple'

describe('TouchableRipple Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should renders centered ripple', async () => {
		const {getByTestId} = await renderWithAct(
			<TouchableRipple
				centered
				containerLayout={{width: 100, height: 100, x: 0, y: 0}}
				testID='ripple'
			/>
		)

		const ripple = await waitFor(() => getByTestId('ripple'))

		expect(ripple).toBeTruthy()
	})

	it('should renders ripple with touch location', async () => {
		const {getByTestId} = await renderWithAct(
			<TouchableRipple
				touchableLocation={{locationX: 20, locationY: 30}}
				containerLayout={{width: 100, height: 100, x: 0, y: 0}}
				testID='ripple'
			/>
		)

		const ripple = await waitFor(() => getByTestId('ripple'))

		expect(ripple).toBeTruthy()
	})
})
