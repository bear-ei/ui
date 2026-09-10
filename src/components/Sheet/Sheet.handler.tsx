import {emitter, MODAL_TYPE} from '@/contexts'
import type {Updater} from 'use-immer'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import type {
	EmitSheetModalOptions,
	SheetProps,
	SheetState,
	SheetType,
	UpdateSheetBackWithEventOptions
} from './Sheet.interface'

export const updateSheetClose = (onClose?: () => void) => (setState: Updater<SheetState>) => () =>
	setState(draft => {
		if (onClose) {
			draft.nextCloseEvent = () => onClose?.()
		}

		draft.sheetVisible = false
	})

export const updateSheetBackWithEvent =
	({type, disabledClose, onBack}: UpdateSheetBackWithEventOptions) =>
	(setState: Updater<SheetState>) =>
	() =>
		setState(draft => {
			if (type !== SIDE_SHEET_TYPE.SIDEBAR || !disabledClose) {
				draft.sheetVisible = false
			}

			if (onBack) {
				draft.nextBackEvent = () => onBack?.()
			}
		})

export const setSheetVisible = (setState: Updater<SheetState>) => (visible?: boolean) =>
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

export const emitSheetModalUnmount = (id: string) => (type: SheetType) =>
	type === SIDE_SHEET_TYPE.MODAL &&
	emitter.emit('modal', {
		id: `sheet__${id}`,
		type: MODAL_TYPE.SIDE_SHEET,
		unmount: true
	})
