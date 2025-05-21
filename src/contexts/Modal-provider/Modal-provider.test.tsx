import {act, render, waitFor} from '@testing-library/react-native'
import {MODAL_TYPE, ModalProvider, emitter} from '../Modal-provider'

jest.mock('../../components', () => {
	const {Text} = require('react-native')
	return {
		__esModule: true,
		SideSheet: ({testID}: {testID?: string}) => <Text>{`SideSheet:${testID}`}</Text>
	}
})

describe('ModalProvider Context', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

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

		const modal = await waitFor(() => getByText('SideSheet:modal--modal1'))

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

		const first = await waitFor(() => getByText('SideSheet:first'))

		expect(first).toBeTruthy()

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal2',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {testID: 'updated'}
			})
		})

		await waitFor(() => {
			const first = queryByText('SideSheet:first')
			const updated = getByText('SideSheet:updated')

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

		const removable = await waitFor(() => queryByText('SideSheet:removable'))

		expect(removable).toBeTruthy()

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal3',
				unmount: true
			})
		})

		await waitFor(() => {
			const removable = queryByText('SideSheet:removable')

			expect(removable).toBeNull()
		})
	})
})
