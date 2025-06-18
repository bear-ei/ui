import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithAct} from '../../../__test__'
import {LayoutAnimated} from './Layout-animated.component'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'

describe('LayoutAnimated Component', () => {
	it('should renders children when visible by default', async () => {
		const {getByText} = await renderWithAct(
			<LayoutAnimated>
				<Text>Visible Layout</Text>
			</LayoutAnimated>
		)

		const layout = await waitFor(() => getByText('Visible Layout'))

		expect(layout).toBeTruthy()
	})

	it('should does not render children if unmount is true and visible is false', async () => {
		const {queryByTestId} = await renderWithAct(
			<LayoutAnimated
				unmount
				visible={false}
				testID='unmounted'
			/>
		)

		const layout = await waitFor(() => queryByTestId('unmounted'))

		expect(layout).toBeNull()
	})

	it('should renders correctly with lazy mode off', async () => {
		const {getByTestId} = await renderWithAct(
			<LayoutAnimated
				lazy={false}
				testID='lazy-off'
			>
				<Text>Lazy Off</Text>
			</LayoutAnimated>
		)

		const layout = await waitFor(() => getByTestId('lazy-off'))

		expect(layout).toBeTruthy()
	})

	it('should applies different animated types', async () => {
		const types = Object.values(LAYOUT_ANIMATED)

		for (const type of types) {
			const {getByTestId, unmount} = await renderWithAct(
				<LayoutAnimated
					animatedType={type}
					testID={`animated-${type}`}
				>
					<Text>{type}</Text>
				</LayoutAnimated>
			)

			const layout = await waitFor(() => getByTestId(`animated-${type}`))

			expect(layout).toBeTruthy()
			unmount()
		}
	})
})
