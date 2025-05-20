import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../../__test__'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.component'

describe('ProgressActiveIndicatorLinear', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = renderWithTheme(<ProgressActiveIndicatorLinear />)
		const {linear, content, track} = await waitFor(() => ({
			content: getByTestId('progressActiveIndicatorLinear__animatedContent--test-id'),
			linear: getByTestId('progressActiveIndicatorLinear--test-id'),
			track: getByTestId('progressActiveIndicatorLinear__track--test-id')
		}))

		expect(content).toBeTruthy()
		expect(linear).toBeTruthy()
		expect(track).toBeTruthy()
	})

	it('should renders with determinate type', async () => {
		const {getByTestId} = renderWithTheme(<ProgressActiveIndicatorLinear animatedType='DETERMINATE' />)
		const stop = await waitFor(() => getByTestId('progressActiveIndicatorLinear__stop--test-id'))

		expect(stop).toBeTruthy()
	})

	it('should renders with specific progress value', async () => {
		const {getByTestId} = renderWithTheme(<ProgressActiveIndicatorLinear value={60} />)
		const content = await waitFor(() =>
			getByTestId('progressActiveIndicatorLinear__animatedContent--test-id')
		)

		expect(content).toBeTruthy()
	})
})
