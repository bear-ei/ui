import {renderWithTheme} from '../../../../__test__'
import {PROGRESS_ANIMATED} from '../Progress.enum'
import {ProgressActiveIndicatorCircular} from './Progress-active-indicator-circular.component'

describe('ProgressActiveIndicatorCircular', () => {
	it('should render base container and content by default', () => {
		const {getByTestId} = renderWithTheme(<ProgressActiveIndicatorCircular testID='progress-circular' />)

		expect(getByTestId('progress-circular')).toBeTruthy()
		expect(getByTestId('progressActiveIndicatorCircular__content--test-id')).toBeTruthy()
		expect(getByTestId('progressActiveIndicatorCircular__animatedMain--test-id')).toBeTruthy()
		expect(getByTestId('progressActiveIndicatorCircular__svg--test-id')).toBeTruthy()
		expect(getByTestId('progressActiveIndicatorCircular__animatedCircle--test-id')).toBeTruthy()
	})

	it('should render extra track circle if animatedType is DETERMINATE', () => {
		const {getByTestId} = renderWithTheme(
			<ProgressActiveIndicatorCircular
				animatedType={PROGRESS_ANIMATED.DETERMINATE}
				testID='determinate-circular'
			/>
		)

		expect(getByTestId('progressActiveIndicatorCircular__circle--test-id')).toBeTruthy()
	})

	it('should not render extra track circle if animatedType is INDETERMINATE', () => {
		const {getByTestId} = renderWithTheme(
			<ProgressActiveIndicatorCircular
				animatedType={PROGRESS_ANIMATED.INDETERMINATE}
				testID='indeterminate-circular'
			/>
		)

		expect(getByTestId('progressActiveIndicatorCircular__animatedCircle--test-id')).toBeTruthy()
	})
})
