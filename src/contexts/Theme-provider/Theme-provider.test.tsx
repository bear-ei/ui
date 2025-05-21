import {render, waitFor} from '@testing-library/react-native'
import {Platform as RNPlatform} from 'react-native'
import {ThemeProvider} from '../Theme-provider'

describe('ThemeProvider Context', () => {
	const originalPlatform = RNPlatform.OS

	afterEach(() => {
		Object.defineProperty(RNPlatform, 'OS', {
			value: originalPlatform
		})
	})

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly on mobile platform', async () => {
		Object.defineProperty(RNPlatform, 'OS', {value: 'ios'})
		const {getByTestId} = render(
			<ThemeProvider>
				<></>
			</ThemeProvider>
		)

		const material = await waitFor(() => getByTestId('bearei__material--test-id'))

		expect(material).toBeTruthy()
	})

	it('renders correctly on desktop platform', async () => {
		Object.defineProperty(RNPlatform, 'OS', {value: 'web'})
		const {getByTestId} = render(
			<ThemeProvider>
				<></>
			</ThemeProvider>
		)

		const material = await waitFor(() => getByTestId('bearei__material--test-id'))

		expect(material).toBeTruthy()
	})
})
