import {waitFor} from '@testing-library/react-native'
import {SvgMock} from '../../../__mocks__'
import {renderWithTheme} from '../../../__test__'
import {Icon} from './Icon.component'
import {ICON_NAME, ICON_STYLE, ICON_TYPE} from './Icon.enum'

describe('Icon Component', () => {
	const CustomIcon = () => <SvgMock />

	it('should render with default props', async () => {
		const {getByTestId} = renderWithTheme(<Icon name={ICON_NAME.ADD} />)
		const icon = await waitFor(() => getByTestId('icon--test-id'))

		expect(icon).toBeTruthy()
	})

	it('should render with custom icon', async () => {
		const {getByTestId} = renderWithTheme(
			<Icon
				icon={CustomIcon}
				name={ICON_NAME.ADD}
			/>
		)

		const icon = await waitFor(() => getByTestId('svg-icon'))

		expect(icon).toBeTruthy()
	})

	it('should apply different icon style and type', async () => {
		const {getByTestId} = renderWithTheme(
			<Icon
				iconStyle={ICON_STYLE.SHARP}
				name={ICON_NAME.ALARM_ON}
				type={ICON_TYPE.FILLED}
			/>
		)

		const icon = await waitFor(() => getByTestId('icon--test-id'))

		expect(icon).toBeTruthy()
	})

	it('should apply disabled fill color when disabled', async () => {
		const {getByTestId} = renderWithTheme(
			<Icon
				disabled
				name={ICON_NAME.CHECK}
			/>
		)

		const icon = await waitFor(() => getByTestId('icon--test-id'))

		expect(icon.props.accessibilityLabel).toBe(ICON_NAME.CHECK)
		expect(icon.props.accessible).toBe(true)
	})

	it('should set correct accessibility props', async () => {
		const {getByLabelText} = renderWithTheme(<Icon name={ICON_NAME.HOME} />)
		const icon = await waitFor(() => getByLabelText(ICON_NAME.HOME))

		expect(icon).toBeTruthy()
	})
})
