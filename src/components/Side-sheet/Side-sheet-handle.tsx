import type {Updater} from 'use-immer'
import {emitter, MODAL_TYPE} from '../../contexts'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'
import type {
	HandleSideSheetBackOptions,
	HandleSideSheetEmitOptions,
	SideSheetProps,
	SideSheetState,
	SideSheetType
} from './Side-sheet.interface'

export const handleSideSheetClose = (onClose?: () => void) => (setState: Updater<SideSheetState>) => () =>
	setState(draft => {
		draft.nextCloseEvent = onClose
		draft.sideSheetVisible = false
	})

export const handleSideSheetBack =
	({type, disabledClose, onBack}: HandleSideSheetBackOptions) =>
	(setState: Updater<SideSheetState>) =>
	() => {
		setState(draft => {
			if (type !== SIDE_SHEET_TYPE.SIDEBAR || !disabledClose) {
				draft.sideSheetVisible = false
			}

			draft.nextBackEvent = onBack
		})
	}

export const handleSideSheetVisible = (setState: Updater<SideSheetState>) => (visible?: boolean) =>
	typeof visible === 'boolean' &&
	setState(draft => {
		draft.sideSheetVisible = visible
	})

export const handleSideSheetEmit =
	({id, type}: HandleSideSheetEmitOptions) =>
	(props: SideSheetProps) =>
	(visible?: boolean) =>
		typeof visible === 'boolean' &&
		type === SIDE_SHEET_TYPE.MODAL &&
		emitter.emit('modal', {id: `sideSheet__${id}`, type: MODAL_TYPE.SIDE_SHEET, props: {...props}})

export const handleSideSheetUnmount = (id: string) => (type: SideSheetType) =>
	type === SIDE_SHEET_TYPE.MODAL &&
	emitter.emit('modal', {
		id: `sideSheet__${id}`,
		type: MODAL_TYPE.SIDE_SHEET,
		unmount: true
	})
