import {act, render, waitFor} from '@testing-library/react-native'
import {MODAL_TYPE, ModalProvider, emitter} from '../Modal-provider'

jest.mock('../../components', () => {
	const {Text} = require('react-native')
	return {
		__esModule: true,
		Sheet: ({testID}: {testID?: string}) => <Text>{`Sheet:${testID}`}</Text>
	}
})

describe('ModalProvider Context', () => {
	it('should render no modals initially', async () => {
		const {queryByTestId} = render(<ModalProvider />)
		const modal = await waitFor(() => queryByTestId('modal--test-id'))

		expect(modal).toBeNull()
	})

	it('should render a modal when emitted', async () => {
		const {getByText} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal1',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {}
			})
		})

		const modal = await waitFor(() => getByText('Sheet:modal--modal1'))

		expect(modal).toBeTruthy()
	})

	it('should update modal props if the same id is emitted again', async () => {
		const {getByText, queryByText} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal2',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {testID: 'first'}
			})
		})

		const first = await waitFor(() => getByText('Sheet:first'))

		expect(first).toBeTruthy()

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal2',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {testID: 'updated'}
			})
		})

		await waitFor(() => {
			const first = queryByText('Sheet:first')
			const updated = getByText('Sheet:updated')

			expect(first).toBeNull()
			expect(updated).toBeTruthy()
		})
	})

	it('should remove modal when unmount is true', async () => {
		const {queryByText} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal3',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {testID: 'removable'}
			})
		})

		const removable = await waitFor(() => queryByText('Sheet:removable'))

		expect(removable).toBeTruthy()

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal3',
				unmount: true
			})
		})

		await waitFor(() => {
			const removable = queryByText('Sheet:removable')

			expect(removable).toBeNull()
		})
	})
})
