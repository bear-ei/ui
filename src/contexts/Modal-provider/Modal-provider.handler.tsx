import {original} from 'immer'
import type {Updater} from 'use-immer'

import type {Modal, ModalState} from './Modal-provider.interface'

export const updateModals = (setState: Updater<ModalState>) => (modal: Modal) => {
	const {id, unmount: isUnmount, props} = modal

	setState(draft => {
		if (isUnmount) {
			draft.modals = draft.modals.filter(item => item.id !== id)

			return
		}

		const existingIndex = draft.modals.findIndex(item => item.id === id)

		if (existingIndex !== -1) {
			// NOTE: `draft.modals[i].props` returns a draft wrapper (Immer lazily
			// proxies plain objects on read). `original()` unwraps it back to the
			// source reference for `===` comparison.
			//
			// ⚠️ Never mutate `draft.modals[i].props.*` in place — that would
			// trigger real draft-ing and finalize `props` into a NEW object,
			// breaking ref / callback identity downstream. Always replace the whole
			// `props` reference (as done below).
			const existingProps = draft.modals[existingIndex].props

			if (existingProps === props || (typeof existingProps === 'object' && original(existingProps) === props)) {
				return
			}

			// Existing modals: props-only update. Type change requires unmount + remount.
			draft.modals[existingIndex] = {...draft.modals[existingIndex], props}

			return
		}

		draft.modals = [...draft.modals, modal]
	})
}
