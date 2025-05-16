import {renderWithTheme} from '../../../__test__'
import {Mask} from './Mask.component'

describe('Mask', () => {
	it('should render mask container and content with correct testIDs', () => {
		const {getByTestId} = renderWithTheme(
			<Mask
				visible
				backgroundColor='#000000'
			/>
		)

		const container = getByTestId('mask--test-id')
		const content = getByTestId('mask__content--test-id')

		expect(container).toBeTruthy()
		expect(content).toBeTruthy()
	})

	it('should support custom testID', () => {
		const {getByTestId} = renderWithTheme(<Mask testID='custom-mask-id' />)

		expect(getByTestId('custom-mask-id')).toBeTruthy()
	})
})
