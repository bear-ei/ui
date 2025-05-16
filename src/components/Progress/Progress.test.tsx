import {fireEvent} from '@testing-library/react-native'
import {View} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {Progress} from './Progress.component'
import {PROGRESS_ANIMATED, PROGRESS_TYPE} from './Progress.enum'

describe('Progress', () => {
	it('should render circular progress with custom content', () => {
		const {getByTestId} = renderWithTheme(
			<Progress
				type={PROGRESS_TYPE.CIRCULAR}
				animatedType={PROGRESS_ANIMATED.INDETERMINATE}
				testID='circular-progress'
				content={<View testID='custom-content' />}
			/>
		)

		expect(getByTestId('circular-progress')).toBeTruthy()
		expect(getByTestId('progress__progressActiveIndicatorCircular--test-id')).toBeTruthy()
		expect(getByTestId('custom-content')).toBeTruthy()
	})

	it('should not render linear indicator when layout width is 0', () => {
		const {getByTestId, queryByTestId} = renderWithTheme(
			<Progress
				type={PROGRESS_TYPE.LINEAR}
				value={0.5}
				testID='zero-width-progress'
			/>
		)

		fireEvent(getByTestId('zero-width-progress'), 'layout', {
			nativeEvent: {layout: {width: 0, height: 10}}
		})

		expect(queryByTestId('progress__progressActiveIndicatorLinear-test-id')).toBeNull()
	})

	it('should not be progressing when value is 0 or undefined', () => {
		const {getByTestId} = renderWithTheme(
			<Progress
				type={PROGRESS_TYPE.LINEAR}
				value={0}
				testID='idle-progress'
			/>
		)

		const container = getByTestId('idle-progress')
		expect(container.props.progressing).toBeFalsy()
	})
})
