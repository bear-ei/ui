import type {Updater} from 'use-immer'

import type {EmitSheetModalOptions, SheetProps, SheetState, SheetType} from './Sheet.interface'

import {emitter, MODAL_TYPE} from '../../contexts'
import {SIDE_SHEET_TYPE} from './Sheet.enum'

export const updateSheetClose = (setState: Updater<SheetState>, onClose?: () => void) => () =>
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
	(props: SheetProps, {id, type}: EmitSheetModalOptions) =>
	(visible?: boolean) => {
		if (!(typeof visible === 'boolean' && type === SIDE_SHEET_TYPE.MODAL)) {
			return
		}

		emitter.emit('modal', {id: `sheet__${id}`, props: {...props}, type: MODAL_TYPE.SIDE_SHEET})
	}

export const emitSheetModalUnmount = (id: string) => (type: SheetType) => {
	if (type !== SIDE_SHEET_TYPE.MODAL) {
		return
	}

	emitter.emit('modal', {id: `sheet__${id}`, type: MODAL_TYPE.SIDE_SHEET, unmount: true})
}
