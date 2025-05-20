import {waitFor} from '@testing-library/react-native'
import {Text} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {LayoutAnimated} from './Layout-animated.component'
import {LAYOUT_ANIMATED} from './Layout-animated.enum'

describe('LayoutAnimated', () => {
	it('should renders children when visible by default', async () => {
		const {getByText} = renderWithTheme(
			<LayoutAnimated>
				<Text>Visible Layout</Text>
			</LayoutAnimated>
		)

		const Layout = await waitFor(() => getByText('Visible Layout'))

		expect(Layout).toBeTruthy()
	})

	it('should does not render children if unmount is true and visible is false', async () => {
		const {queryByTestId} = renderWithTheme(
			<LayoutAnimated
				unmount
				visible={false}
				testID='unmounted'
			/>
		)

		const Layout = await waitFor(() => queryByTestId('unmounted'))

		expect(Layout).toBeNull()
	})

	it('should renders correctly with lazy mode off', async () => {
		const {getByTestId} = renderWithTheme(
			<LayoutAnimated
				lazy={false}
				testID='lazy-off'
			>
				<Text>Lazy Off</Text>
			</LayoutAnimated>
		)

		const Layout = await waitFor(() => getByTestId('lazy-off'))

		expect(Layout).toBeTruthy()
	})

	it('should applies different animated types', async () => {
		const types = Object.values(LAYOUT_ANIMATED)

		for (const type of types) {
			const {getByTestId, unmount} = renderWithTheme(
				<LayoutAnimated
					animatedType={type}
					testID={`animated-${type}`}
				>
					<Text>{type}</Text>
				</LayoutAnimated>
			)

			const Layout = await waitFor(() => getByTestId(`animated-${type}`))

			expect(Layout).toBeTruthy()
			unmount()
		}
	})

	it('should calls onVisible when visibility changes', async () => {
		const onVisible = jest.fn()
		const {getByTestId} = renderWithTheme(
			<LayoutAnimated
				visible={true}
				onVisible={onVisible}
			>
				<Text>Callback Layout</Text>
			</LayoutAnimated>
		)

		const layoutContent = await waitFor(() => getByTestId(/^layoutAnimated__content--/))

		layoutContent.props.onLayout?.({nativeEvent: {layout: {x: 0, y: 0, width: 100, height: 100}}})

		await waitFor(() => expect(onVisible).toHaveBeenCalledWith(true))
	})
})
