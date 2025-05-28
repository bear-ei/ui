import type {Updater} from 'use-immer'
import {emitter, MODAL_TYPE} from '../../contexts'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'
import type {
	EmitSideSheetModalOptions,
	SideSheetProps,
	SideSheetState,
	SideSheetType,
	UpdateSideSheetBackWithEventOptions
} from './Side-sheet.interface'

export const updateSideSheetClose = (onClose?: () => void) => (setState: Updater<SideSheetState>) => () => {
	const nextOnClose = () => onClose?.()

	setState(draft => {
		draft.nextCloseEvent = nextOnClose
		draft.sideSheetVisible = false
	})
}

export const updateSideSheetBackWithEvent =
	({type, disabledClose, onBack}: UpdateSideSheetBackWithEventOptions) =>
	(setState: Updater<SideSheetState>) =>
	() => {
		const nextBackEvent = () => onBack?.()

		setState(draft => {
			if (type !== SIDE_SHEET_TYPE.SIDEBAR || !disabledClose) {
				draft.sideSheetVisible = false
			}

			draft.nextBackEvent = nextBackEvent
		})
	}

export const setSideSheetVisibility = (setState: Updater<SideSheetState>) => (visible?: boolean) =>
	typeof visible === 'boolean' &&
	setState(draft => {
		draft.sideSheetVisible = visible
	})

export const emitSideSheetModal =
	({id, type}: EmitSideSheetModalOptions) =>
	(props: SideSheetProps) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		type === SIDE_SHEET_TYPE.MODAL &&
		emitter.emit('modal', {id: `sideSheet__${id}`, type: MODAL_TYPE.SIDE_SHEET, props: {...props}})

export const emitSideSheetModalUnmount = (id: string) => (type: SideSheetType) =>
	type === SIDE_SHEET_TYPE.MODAL &&
	emitter.emit('modal', {
		id: `sideSheet__${id}`,
		type: MODAL_TYPE.SIDE_SHEET,
		unmount: true
	})
