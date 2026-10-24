import type {Updater} from 'use-immer'

import {original} from 'immer'

import type {PortalEntry, PortalState} from './Portal-provider.interface'

export const handlePortalChange = (setState: Updater<PortalState>) => (portal: PortalEntry) => {
	const {id, props, shouldUnmount: isUnmount} = portal

	setState(draft => {
		if (isUnmount) {
			draft.portals = draft.portals.filter(item => item.id !== id)

			return
		}

		const existingIndex = draft.portals.findIndex(item => item.id === id)

		if (existingIndex !== -1) {
			// NOTE: `draft.portals[i].props` returns a draft wrapper (Immer lazily
			// proxies plain objects on read). `original()` unwraps it back to the
			// source reference for `===` comparison.
			//
			// ⚠️ Never mutate `draft.portals[i].props.*` in place — that would
			// trigger real draft-ing and finalize `props` into a NEW object,
			// breaking ref / callback identity downstream. Always replace the whole
			// `props` reference (as done below).
			const existingProps = draft.portals[existingIndex].props

			if (existingProps === props || (typeof existingProps === 'object' && original(existingProps) === props)) {
				return
			}

			// Existing portals: props-only update. Type change requires unmount + remount.
			draft.portals[existingIndex] = {...draft.portals[existingIndex], props}

			return
		}

		draft.portals = [...draft.portals, portal]
	})
}
