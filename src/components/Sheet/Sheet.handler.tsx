import type {Updater} from 'use-immer'
import {emitter, MODAL_TYPE} from '../../contexts'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import type {
	EmitSheetModalOptions,
	SheetProps,
	SheetState,
	SheetType,
	UpdateSheetBackWithEventOptions
} from './Sheet.interface'

export const updateSheetClose = (onClose?: () => void) => (setState: Updater<SheetState>) => () => {
	const nextOnClose = () => onClose?.()

	setState(draft => {
		draft.nextCloseEvent = nextOnClose
		draft.sheetVisible = false
	})
}

export const updateSheetBackWithEvent =
	({type, disabledClose, onBack}: UpdateSheetBackWithEventOptions) =>
	(setState: Updater<SheetState>) =>
	() => {
		const nextBackEvent = () => onBack?.()

		setState(draft => {
			if (type !== SIDE_SHEET_TYPE.SIDEBAR || !disabledClose) {
				draft.sheetVisible = false
			}

			draft.nextBackEvent = nextBackEvent
		})
	}

export const setSheetVisibility = (setState: Updater<SheetState>) => (visible?: boolean) =>
	typeof visible === 'boolean' &&
	setState(draft => {
		draft.sheetVisible = visible
	})

export const emitSheetModal =
	({id, type}: EmitSheetModalOptions) =>
	(props: SheetProps) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		type === SIDE_SHEET_TYPE.MODAL &&
		emitter.emit('modal', {id: `sheet__${id}`, type: MODAL_TYPE.SIDE_SHEET, props: {...props}})

export const emitSheetModalUnmount = (id: string) => (type: SheetType) => {
	if (type === SIDE_SHEET_TYPE.MODAL) {
		emitter.emit('modal', {
			id: `sheet__${id}`,
			type: MODAL_TYPE.SIDE_SHEET,
			unmount: true
		})
	}
}

export const clearSheetEvent = (setState: Updater<SheetState>) => (eventName: 'back' | 'cancel' | 'close') => {
	const event = {
		back: () =>
			setState(draft => {
				draft.nextBackEvent = undefined
			}),
		cancel: () =>
			setState(draft => {
				draft.nextCancelEvent = undefined
			}),
		close: () =>
			setState(draft => {
				draft.nextCloseEvent = undefined
			})
	}

	setTimeout(() => {
		event[eventName]?.()
	}, 0)
}
