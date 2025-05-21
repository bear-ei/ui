import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {Elevation} from './Elevation.component'
import {ELEVATION} from './Elevation.enum'

describe('Elevation Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should renders correctly with default level', async () => {
		const {getByTestId} = await renderWithAct(
			<Elevation
				defaultLevel={ELEVATION.LEVEL_1}
				testID='elevation'
			/>
		)

		const {elevation, shadow} = await waitFor(() => ({
			elevation: getByTestId('elevation'),
			shadow: getByTestId('elevation__animatedShadow--test-id')
		}))

		expect(elevation).toBeTruthy()
		expect(shadow).toBeTruthy()
	})

	it('should uses level prop instead of defaultLevel', async () => {
		const {getByTestId} = await renderWithAct(
			<Elevation
				defaultLevel={ELEVATION.LEVEL_1}
				level={ELEVATION.LEVEL_3}
				testID='elevation'
			/>
		)

		const shadow = await waitFor(() => getByTestId('elevation__animatedShadow--test-id'))

		expect(shadow.props.level).toBe(ELEVATION.LEVEL_3)
		expect(shadow).toBeTruthy()
	})

	it('should applies animated shadow style', async () => {
		const {getByTestId} = await renderWithAct(
			<Elevation
				level={ELEVATION.LEVEL_2}
				testID='elevation'
			/>
		)

		const shadow = await waitFor(() => getByTestId('elevation__animatedShadow--test-id'))

		expect(shadow.props.style).toBeDefined()
	})

	it('should renders with custom shape prop', async () => {
		const {getByTestId} = await renderWithAct(
			<Elevation
				level={ELEVATION.LEVEL_2}
				shape='FULL'
				testID='elevation'
			/>
		)

		const shadow = await waitFor(() => getByTestId('elevation__animatedShadow--test-id'))

		expect(shadow.props.shape).toBe('FULL')
	})
})
