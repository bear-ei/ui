import {waitFor} from '@testing-library/react-native'
import {renderWithAct} from '../../../__test__'
import {Underlay} from '../Underlay'

describe('Underlay Component', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should render hover layer by default', async () => {
		const {getByTestId} = await renderWithAct(<Underlay testID='underlay' />)
		const {underlay, hoverLayer} = await waitFor(() => ({
			hoverLayer: getByTestId('underlay__animatedHoverLayer--test-id'),
			underlay: getByTestId('underlay')
		}))

		expect(hoverLayer).toBeTruthy()
		expect(underlay).toBeTruthy()
	})

	it('should render active layer if active=true and activeColor is provided', async () => {
		const {getByTestId} = await renderWithAct(
			<Underlay
				active
				activeColor='red'
				testID='underlay'
			/>
		)

		const activeLayer = await waitFor(() => getByTestId('underlay__animatedActiveLayer--test-id'))

		expect(activeLayer).toBeTruthy()
	})

	it('should not render active layer if activeColor is not set', async () => {
		const {queryByTestId} = await renderWithAct(
			<Underlay
				active
				testID='underlay'
			/>
		)

		const activeLayer = await waitFor(() => queryByTestId('underlay__animatedActiveLayer--test-id'))

		expect(activeLayer).toBeNull()
	})

	it('should apply custom active animated type SCALE_X', async () => {
		const {getByTestId} = await renderWithAct(
			<Underlay
				active
				activeAnimatedType='SCALE_X'
				activeColor='red'
				testID='underlay'
			/>
		)

		const activeLayer = await waitFor(() => getByTestId('underlay__animatedActiveLayer--test-id'))

		expect(activeLayer).toBeTruthy()
	})

	it('should fallback to default activeAnimatedType if not set', async () => {
		const {getByTestId} = await renderWithAct(
			<Underlay
				testID='underlay'
				active
				activeColor='blue'
			/>
		)

		const activeLayer = await waitFor(() => getByTestId('underlay__animatedActiveLayer--test-id'))

		expect(activeLayer).toBeTruthy()
	})
})
