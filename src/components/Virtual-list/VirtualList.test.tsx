import {act, fireEvent, waitFor} from '@testing-library/react-native'
import React from 'react'
import {Text, View} from 'react-native'
import {renderWithTheme} from '../../../__test__'
import {VirtualList} from '../Virtual-list'

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock')

	Reanimated.default.call = () => {}
	Reanimated.scrollTo = jest.fn()

	return Reanimated
})

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
	OS: 'ios',
	...jest.requireActual('react-native/Libraries/Utilities/Platform')
}))

const mockData = Array.from({length: 20}, (_, i) => ({
	indexKey: `key-${i}`,
	headline: `Item ${i}`
}))

describe('VirtualList', () => {
	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.clearAllTimers()
		jest.useRealTimers()
	})

	it('should render list with items correctly', async () => {
		const {getByTestId, queryByText} = renderWithTheme(
			<VirtualList
				testID='test-virtual-list'
				data={mockData}
				itemSize={50}
				renderItem={({item}) => <Text>{item.headline}</Text>}
			/>
		)

		const container = await waitFor(() => getByTestId('test-virtual-list'))

		await act(async () => {
			fireEvent(container, 'layout', {
				nativeEvent: {layout: {width: 300, height: 500}}
			})
		})

		await waitFor(() => {
			jest.runAllTimers()

			expect(queryByText('Item 0')).not.toBeNull()
			expect(queryByText('Item 1')).not.toBeNull()
		})
	})

	it('should render empty component when no data', async () => {
		const {getByTestId, queryByText} = renderWithTheme(
			<VirtualList
				testID='test-virtual-list'
				data={[]}
				itemSize={50}
				renderItem={() => <View />}
				emptyComponent={<Text>Custom empty</Text>}
			/>
		)

		const container = await waitFor(() => getByTestId('test-virtual-list'))

		await act(async () => {
			fireEvent(container, 'layout', {
				nativeEvent: {layout: {width: 300, height: 500}}
			})
		})

		await waitFor(() => {
			jest.runAllTimers()
			expect(queryByText('Custom empty')).not.toBeNull()
		})
	})

	it('should render loading component when loading', async () => {
		const {getByTestId, queryByText} = renderWithTheme(
			<VirtualList
				testID='test-virtual-list'
				loading
				itemSize={50}
				renderItem={() => <View />}
				loadingComponent={<Text>Loading now...</Text>}
			/>
		)

		const container = await waitFor(() => getByTestId('test-virtual-list'))

		await act(async () => {
			fireEvent(container, 'layout', {
				nativeEvent: {layout: {width: 300, height: 500}}
			})
		})

		await waitFor(() => {
			jest.runAllTimers()
			expect(queryByText('Loading now...')).not.toBeNull()
		})
	})

	it('should call onLoadEnd when last item becomes visible', async () => {
		const onLoadEnd = jest.fn()
		const {getByTestId} = renderWithTheme(
			<VirtualList
				testID='test-virtual-list'
				data={[]}
				itemSize={50}
				onLoadEnd={onLoadEnd}
				renderItem={() => <View />}
			/>
		)

		const container = await waitFor(() => getByTestId('test-virtual-list'))

		await act(async () => {
			fireEvent(container, 'layout', {
				nativeEvent: {layout: {width: 300, height: 500}}
			})
		})

		await waitFor(() => {
			jest.runAllTimers()

			expect(onLoadEnd).toHaveBeenCalled()
		})
	})
})
