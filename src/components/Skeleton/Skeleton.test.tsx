import {waitFor} from '@testing-library/react-native'
import {act} from 'react'
import {Text} from 'react-native'
import {renderWithAct} from '../../../__test__'
import {Skeleton} from '../Skeleton'

jest.useFakeTimers()

describe('Skeleton', () => {
	it('should render skeleton by default', async () => {
		const {getByTestId} = await renderWithAct(<Skeleton skeleton={<Text>Loading...</Text>} />)
		const contentItemLayout = await waitFor(() =>
			getByTestId('skeleton__contentItemLayoutVisible--test-id')
		)

		expect(contentItemLayout).toBeTruthy()
	})

	it('should hide skeleton after duration', async () => {
		const {getByTestId, queryByTestId} = await renderWithAct(
			<Skeleton
				duration={1000}
				skeleton={<Text>Loading...</Text>}
			>
				<Text>Loaded</Text>
			</Skeleton>
		)

		const contentItemLayout = await waitFor(() =>
			getByTestId('skeleton__contentItemLayoutVisible--test-id')
		)

		expect(contentItemLayout).toBeTruthy()

		act(() => jest.advanceTimersByTime(1000))

		await waitFor(() => {
			expect(queryByTestId('skeleton__contentItemLayoutVisible--test-id')).toBeNull()
			expect(getByTestId('skeleton__contentItemLayoutNotVisible--test-id')).toBeTruthy()
		})
	})

	it('should render Circle shape correctly', async () => {
		const {getByTestId} = await renderWithAct(<Skeleton.Circle testID='skeleton-circle' />)
		const circle = await waitFor(() => getByTestId('skeleton-circle'))

		expect(circle).toBeTruthy()
	})

	it('should render Square shape correctly', async () => {
		const {getByTestId} = await renderWithAct(<Skeleton.Square testID='skeleton-square' />)
		const square = await waitFor(() => getByTestId('skeleton-square'))

		expect(square).toBeTruthy()
	})

	it('should render Rectangular shape correctly', async () => {
		const {getByTestId} = await renderWithAct(<Skeleton.Rectangular testID='skeleton-rectangular' />)
		const rectangular = await waitFor(() => getByTestId('skeleton-rectangular'))

		expect(rectangular).toBeTruthy()
	})
})
