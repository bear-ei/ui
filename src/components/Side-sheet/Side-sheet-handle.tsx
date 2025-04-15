import {Updater} from 'use-immer'
import {emitter} from '../../contexts'
import {SheetType} from './Side-sheet.enum'
import {
	HandleSideSheetBackOptions,
	HandleSideSheetEmitOptions,
	SideSheetProps,
	SideSheetState
} from './Side-sheet.interface'

export const handleSideSheetClose = (setState: Updater<SideSheetState>) => (onClose?: () => void) =>
	setState(draft => {
		draft.nextCloseEvent = onClose
		draft.sideSheetVisible = false
	})

export const handleSideSheetBack =
	({type, disabledClose, onBack}: HandleSideSheetBackOptions) =>
	(setState: Updater<SideSheetState>) => {
		setState(draft => {
			if (type !== SheetType.SIDEBAR || !disabledClose) {
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
		type === SheetType.MODAL &&
		emitter.emit('modal', {id: `sideSheet__${id}`, name: 'sideSheet', props: {...props}})

export const handleSideSheetUnmount = (id: string) => (type: SheetType) =>
	type === SheetType.MODAL &&
	emitter.emit('modal', {
		id: `sideSheet__${id}`,
		name: 'sideSheet',
		unmount: true
	})
