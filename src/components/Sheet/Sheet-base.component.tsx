import {nanoid} from 'nanoid'
import {useEffect, useId, useMemo, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {SheetBaseProps, SheetState} from './Sheet.interface'

import {usePendingEvent} from '../../hooks'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import {emitSheetModal, emitSheetModalUnmount, updateSheetClose, updateSheetVisible} from './Sheet.handler'
import {RenderSheet} from './Sheet.render'

export const SheetBase: FC<SheetBaseProps> = ({
	defaultVisible,
	disabledBack,
	onBack,
	onClose: rawOnClose,
	ref,
	type = SIDE_SHEET_TYPE.MODAL,
	visible,
	...renderSheetProps
}) => {
	const [{pendingCloseEvent, visible: isVisible}, setState] = useImmer<SheetState>({
		visible: visible ?? defaultVisible
	})

	usePendingEvent('pendingCloseEvent', rawOnClose, {pendingEvent: pendingCloseEvent, setState})

	const emitId = useMemo(() => nanoid(), [])
	const id = useId()
	const onClose = useMemo(() => updateSheetClose(setState, rawOnClose), [rawOnClose, setState])
	const runUpdateVisible = useMemo(() => updateSheetVisible(setState), [setState])
	const runEmitModalUnmount = useMemo(() => emitSheetModalUnmount(emitId), [emitId])
	const renderProps = useMemo(
		() => ({
			...renderSheetProps,
			disabledBack,
			id,
			onBack,
			onClose,
			ref,
			type,
			visible: isVisible
		}),
		[disabledBack, id, isVisible, onBack, onClose, ref, renderSheetProps, type]
	)

	const runEmitSheetModal = useMemo(
		() => emitSheetModal(renderProps, {id: emitId, type}),
		[emitId, renderProps, type]
	)

	useEffect(() => {
		runUpdateVisible(visible)
	}, [runUpdateVisible, visible])

	useEffect(() => {
		runEmitSheetModal(isVisible)
	}, [runEmitSheetModal, isVisible])

	useEffect(
		() => () => {
			runEmitModalUnmount(type)
		},
		[runEmitModalUnmount, type]
	)

	return type === SIDE_SHEET_TYPE.SIDEBAR ? <RenderSheet {...renderProps} /> : <></>
}

SheetBase.displayName = 'SheetBase'
