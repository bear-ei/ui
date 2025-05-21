import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../../__test__'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular.component'

describe('ProgressActiveIndicatorCircular Component', () => {
	it('should renders correctly with default props', async () => {
		const {getByTestId} = await renderWithAct(<ProgressActiveIndicatorCircular />)
		const {indicator, svg, circle} = await waitFor(() => ({
			circle: getByTestId('progressActiveIndicatorCircular__animatedCircle--test-id'),
			indicator: getByTestId('progressActiveIndicatorCircular--test-id'),
			svg: getByTestId('progressActiveIndicatorCircular__svg--test-id')
		}))

		expect(circle).toBeTruthy()
		expect(indicator).toBeTruthy()
		expect(svg).toBeTruthy()
	})

	it('should renders with custom size and strokeWidth', async () => {
		const {getByTestId} = await renderWithAct(
			<ProgressActiveIndicatorCircular
				size={100}
				strokeWidth={8}
			/>
		)

		const svg = await waitFor(() => getByTestId('progressActiveIndicatorCircular__svg--test-id'))

		expect(svg).toBeTruthy()
	})

	it('should renders content inside the indicator', async () => {
		const {getByText} = await renderWithAct(
			<ProgressActiveIndicatorCircular content={<Text>{'Loading'}</Text>} />
		)

		const loading = await waitFor(() => getByText('Loading'))

		expect(loading).toBeTruthy()
	})
})
