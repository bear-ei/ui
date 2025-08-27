import {nanoid} from 'nanoid'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import {
	clearSheetEvent,
	emitSheetModal,
	emitSheetModalUnmount,
	setSheetVisibility,
	updateSheetBackWithEvent,
	updateSheetClose
} from './Sheet.handler'
import type {SheetBaseProps, SheetState} from './Sheet.interface'
import {RenderSheet} from './Sheet.render'

export const SheetBase = forwardRef<View, SheetBaseProps>(
	(
		{
			defaultVisible,
			disabledClose,
			onBack: rawOnBack,
			onClose: rawOnClose,
			onVisibility,
			type = SIDE_SHEET_TYPE.MODAL,
			visible,
			...renderSheetProps
		},
		ref
	) => {
		const [{sheetVisible: isSheetVisible, nextCloseEvent, nextBackEvent, nextCancelEvent}, setState] =
			useImmer<SheetState>({})

		const emitId = useMemo(() => nanoid(), [])
		const id = useId()
		const onBack = useMemo(
			() => updateSheetBackWithEvent({onBack: rawOnBack, disabledClose, type})(setState),
			[disabledClose, rawOnBack, setState, type]
		)

		const onClose = useMemo(() => updateSheetClose(rawOnClose)(setState), [rawOnClose, setState])
		const runSetVisibility = useMemo(() => setSheetVisibility(setState), [setState])
		const runEmitModalUnmount = useMemo(() => emitSheetModalUnmount(emitId), [emitId])
		const renderProps = useMemo(
			() => ({
				...renderSheetProps,
				disabledClose,
				id,
				onBack,
				onClose,
				onVisibility,
				ref,
				type,
				visible: isSheetVisible
			}),
			[disabledClose, id, isSheetVisible, onBack, onClose, onVisibility, ref, renderSheetProps, type]
		)

		const runEmitSheetModal = useMemo(
			() => emitSheetModal({id: emitId, type})(renderProps),
			[emitId, renderProps, type]
		)

		const runClearSheetEvent = useMemo(() => clearSheetEvent(setState), [setState])

		useEffect(() => {
			runSetVisibility(visible ?? defaultVisible)
		}, [runSetVisibility, defaultVisible, visible])

		useEffect(() => {
			runEmitSheetModal(isSheetVisible)
		}, [runEmitSheetModal, isSheetVisible])

		useEffect(() => {
			runAfterInteractions(nextCloseEvent)()
		}, [nextCloseEvent])

		useEffect(() => {
			runAfterInteractions(nextBackEvent)()
		}, [nextBackEvent])

		useEffect(() => {
			runAfterInteractions(nextCancelEvent)()
		}, [nextCancelEvent])

		useEffect(() => () => runEmitModalUnmount(type), [runEmitModalUnmount, type])
		useEffect(() => runClearSheetEvent, [runClearSheetEvent])

		return type === SIDE_SHEET_TYPE.SIDEBAR ? <RenderSheet {...renderProps} /> : <></>
	}
)
