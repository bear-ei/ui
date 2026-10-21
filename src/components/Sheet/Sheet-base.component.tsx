import {nanoid} from 'nanoid'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {usePendingEvent} from '../../hooks'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import {emitSheetModal, emitSheetModalUnmount, updateSheetClose, updateSheetVisible} from './Sheet.handler'
import type {SheetBaseProps, SheetState} from './Sheet.interface'
import {RenderSheet} from './Sheet.render'

export const SheetBase = forwardRef<View, SheetBaseProps>(
	(
		{
			defaultVisible,
			disabledBack,
			onBack,
			onClose: rawOnClose,
			type = SIDE_SHEET_TYPE.MODAL,
			visible,
			...renderSheetProps
		},
		ref
	) => {
		const [{visible: isVisible, pendingCloseEvent}, setState] = useImmer<SheetState>({
			visible: visible ?? defaultVisible
		})

		usePendingEvent({
			eventKey: 'pendingCloseEvent',
			func: rawOnClose,
			pendingEvent: pendingCloseEvent,
			setState
		})

		const emitId = useMemo(() => nanoid(), [])
		const id = useId()
		const onClose = useMemo(() => updateSheetClose(rawOnClose)(setState), [rawOnClose, setState])
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
			() => emitSheetModal({id: emitId, type})(renderProps),
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
)

SheetBase.displayName = 'SheetBase'
