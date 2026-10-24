import type {Updater} from 'use-immer'

import type {EmitSheetModalOptions, SheetProps, SheetState, SheetType} from './Sheet.interface'

import {PORTAL_TYPE, portalEmitter} from '../../contexts'
import {SHEET_TYPE} from './Sheet.enum'

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
		if (!(typeof visible === 'boolean' && type === SHEET_TYPE.MODAL)) {
			return
		}

		portalEmitter.emit('portal', {id: `sheet__${id}`, props: {...props}, type: PORTAL_TYPE.SHEET})
	}

export const emitSheetModalUnmount = (id: string) => (type: SheetType) => {
	if (type !== SHEET_TYPE.MODAL) {
		return
	}

	portalEmitter.emit('portal', {id: `sheet__${id}`, shouldUnmount: true, type: PORTAL_TYPE.SHEET})
}
