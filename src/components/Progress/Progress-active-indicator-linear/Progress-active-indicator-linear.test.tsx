import {renderWithTheme} from '../../../../__test__'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import {ProgressActiveIndicatorLinear} from './Progress-active-indicator-linear.component'

const mockLayout = {
	width: 200,
	height: 10,
	x: 0,
	y: 0
}

describe('ProgressActiveIndicatorLinear', () => {
	it('should render container and animated content', () => {
		const {getByTestId} = renderWithTheme(
			<ProgressActiveIndicatorLinear
				containerLayout={mockLayout}
				value={0.6}
				testID='linear-progress'
			/>
		)

		expect(getByTestId('linear-progress')).toBeTruthy()
		expect(getByTestId('progressActiveIndicatorLinear__animatedContent--test-id')).toBeTruthy()
		expect(getByTestId('progressActiveIndicatorLinear__track--test-id')).toBeTruthy()
	})

	it('should render stop indicator when animatedType is DETERMINATE', () => {
		const {getByTestId} = renderWithTheme(
			<ProgressActiveIndicatorLinear
				containerLayout={mockLayout}
				value={0.7}
				animatedType={PROGRESS_ANIMATED.DETERMINATE}
				testID='determinate-progress'
			/>
		)

		expect(getByTestId('determinate-progress')).toBeTruthy()
	})
})
