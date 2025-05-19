import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__'
import {Elevation} from './Elevation.component'
import {ELEVATION} from './Elevation.enum'

describe('Elevation Component', () => {
	it('should renders correctly with default level', async () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				testID='elevation'
				defaultLevel={ELEVATION.LEVEL_1}
			/>
		)

		const {elevation, elevationAnimatedShadow} = await waitFor(() => ({
			elevation: getByTestId('elevation'),
			elevationAnimatedShadow: getByTestId('elevation__animatedShadow--test-id')
		}))

		expect(elevation).toBeTruthy()
		expect(elevationAnimatedShadow).toBeTruthy()
	})

	it('should uses level prop instead of defaultLevel', async () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				testID='elevation'
				level={ELEVATION.LEVEL_3}
				defaultLevel={ELEVATION.LEVEL_1}
			/>
		)

		const shadow = await waitFor(() => getByTestId('elevation__animatedShadow--test-id'))

		expect(shadow).toBeTruthy()
		expect(shadow.props.level).toBe(ELEVATION.LEVEL_3)
	})

	it('should applies animated shadow style', async () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				testID='elevation'
				level={ELEVATION.LEVEL_2}
			/>
		)

		const shadow = await waitFor(() => getByTestId('elevation__animatedShadow--test-id'))

		expect(shadow.props.style).toBeDefined()
	})

	it('should renders with custom shape prop', async () => {
		const {getByTestId} = renderWithTheme(
			<Elevation
				testID='elevation'
				level={ELEVATION.LEVEL_2}
				shape='FULL'
			/>
		)

		const shadow = await waitFor(() => getByTestId('elevation__animatedShadow--test-id'))

		expect(shadow.props.shape).toBe('FULL')
	})
})
