import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Progress} from './Progress.component'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'

describe('Progress Component', () => {
	it('should renders LINEAR progress by default', async () => {
		const {getByTestId} = renderWithTheme(<Progress value={50} />)
		const progress = await waitFor(() => getByTestId('progress--test-id'))

		progress.props.onLayout?.({
			nativeEvent: {
				layout: {x: 0, y: 0, width: 800, height: 800}
			}
		})

		const linear = await waitFor(() => getByTestId('progress__progressActiveIndicatorLinear--test-id'))

		expect(linear).toBeTruthy()
		expect(progress).toBeTruthy()
	})

	it('should renders CIRCULAR progress when type is CIRCULAR', async () => {
		const {getByTestId} = renderWithTheme(<Progress type={PROGRESS_TYPE.CIRCULAR} />)
		const progress = await waitFor(() => getByTestId('progress--test-id'))

		progress.props.onLayout?.({
			nativeEvent: {
				layout: {x: 0, y: 0, width: 800, height: 800}
			}
		})
		const circular = await waitFor(() => getByTestId('progress__progressActiveIndicatorCircular--test-id'))

		expect(circular).toBeTruthy()
		expect(progress).toBeTruthy()
	})

	it('should does not render LINEAR indicator when layout.width is 0', async () => {
		const {queryByTestId} = renderWithTheme(
			<Progress
				style={{width: 0}}
				value={50}
			/>
		)

		const linear = await waitFor(() => queryByTestId('progress__progressActiveIndicatorLinear--test-id'))

		expect(linear).toBeNull()
	})

	it('should renders with animatedType DETERMINATE', async () => {
		const {getByTestId} = renderWithTheme(
			<Progress
				animatedType={PROGRESS_ANIMATED.DETERMINATE}
				type={PROGRESS_TYPE.CIRCULAR}
			/>
		)

		const circular = await waitFor(() => getByTestId('progress__progressActiveIndicatorCircular--test-id'))

		expect(circular).toBeTruthy()
	})

	it('should renders custom content in circular progress', async () => {
		const {getByText, getByTestId} = renderWithTheme(
			<Progress
				content={<Text>{'Loading'}</Text>}
				type={PROGRESS_TYPE.CIRCULAR}
			/>
		)
		const progress = await waitFor(() => getByTestId('progress--test-id'))

		progress.props.onLayout?.({
			nativeEvent: {
				layout: {x: 0, y: 0, width: 800, height: 800}
			}
		})

		const loading = await waitFor(() => getByText('Loading'))

		expect(loading).toBeTruthy()
	})
})
