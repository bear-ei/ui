import {act, render, waitFor} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import {ModalProvider, emitter} from '../Modal-provider'
import {MODAL_TYPE} from './Modal-provider.enum'

jest.mock('../../components', () => {
	const actual = jest.requireActual('../../components')
	const {View} = require('react-native')

	return {
		__esModule: true,
		...actual,
		SideSheet: ({children, ...rest}: {children?: React.ReactNode}) => <View {...rest}>{children}</View>
	}
})

describe('ModalProvider', () => {
	it('renders nothing on initial mount', () => {
		const {queryAllByTestId} = render(<ModalProvider />)

		expect(queryAllByTestId(/^modal--/)).toHaveLength(0)
	})

	it('renders modal on event emit', async () => {
		const {getByTestId, getByText} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal-1',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {children: <Text>Modal Content</Text>}
			})
		})

		await waitFor(() => {
			expect(getByTestId('modal--modal-1')).toBeTruthy()
			expect(getByText('Modal Content')).toBeTruthy()
		})
	})

	it('updates modal if same ID emitted again', async () => {
		const {getByText, queryByText} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal-2',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {children: <Text>Old Content</Text>}
			})
		})

		await waitFor(() => {
			expect(getByText('Old Content')).toBeTruthy()
		})

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal-2',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {children: <Text>New Content</Text>}
			})
		})

		await waitFor(() => {
			expect(getByText('New Content')).toBeTruthy()
			expect(queryByText('Old Content')).toBeNull()
		})
	})

	it('removes modal with unmount flag', async () => {
		const {queryByTestId} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal-3',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {}
			})
		})

		expect(queryByTestId('modal--modal-3')).toBeTruthy()

		await act(async () => {
			emitter.emit('modal', {
				id: 'modal-3',
				unmount: true
			})
		})

		await waitFor(() => {
			expect(queryByTestId('modal--modal-3')).toBeNull()
		})
	})

	it('renders multiple modals at once', async () => {
		const {getByTestId} = render(<ModalProvider />)

		await act(async () => {
			emitter.emit('modal', {
				id: 'm1',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {}
			})

			emitter.emit('modal', {
				id: 'm2',
				type: MODAL_TYPE.SIDE_SHEET,
				props: {}
			})
		})

		await waitFor(() => {
			expect(getByTestId('modal--m1')).toBeTruthy()
			expect(getByTestId('modal--m2')).toBeTruthy()
		})
	})
})
