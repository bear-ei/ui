import {waitFor} from '@testing-library/react-native'
import {renderWithTheme} from '../../../__test__/render-with-theme.utils'
import {Button} from '../Button'

describe('Button Component', () => {
	it('should render with default label', async () => {
		const {getByText} = renderWithTheme(<Button />)

		await waitFor(() => {
			expect(getByText('Label')).toBeTruthy()
		})
	})
})
