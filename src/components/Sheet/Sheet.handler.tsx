import type {Updater} from 'use-immer'

import {emitter, MODAL_TYPE} from '../../contexts'

import {SIDE_SHEET_TYPE} from './Sheet.enum'
import type {EmitSheetModalOptions, SheetProps, SheetState, SheetType} from './Sheet.interface'

export const updateSheetClose = (onClose?: () => void) => (setState: Updater<SheetState>) => () =>
	setState(draft => {
		if (onClose) {
			draft.pendingCloseEvent = true
		}

		draft.visible = false
	})

export const updateSheetVisible = (setState: Updater<SheetState>) => (visible?: boolean) => {
	if (typeof visible !== 'boolean') {
		return
	}

	setState(draft => {
		if (draft.visible === visible) {
			return
		}

		draft.visible = visible
	})
}

export const emitSheetModal =
	({id, type}: EmitSheetModalOptions) =>
	(props: SheetProps) =>
	(visible?: boolean) => {
		if (!(typeof visible === 'boolean' && type === SIDE_SHEET_TYPE.MODAL)) {
			return
		}

		emitter.emit('modal', {id: `sheet__${id}`, type: MODAL_TYPE.SIDE_SHEET, props: {...props}})
	}

export const emitSheetModalUnmount = (id: string) => (type: SheetType) => {
	if (type !== SIDE_SHEET_TYPE.MODAL) {
		return
	}

	emitter.emit('modal', {id: `sheet__${id}`, type: MODAL_TYPE.SIDE_SHEET, unmount: true})
}
