import {nanoid} from 'nanoid'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandler, createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'
import {
	emitSideSheetModal,
	emitSideSheetModalUnmount,
	setSideSheetVisibility,
	updateSideSheetBackWithEvent,
	updateSideSheetClose
} from './Side-sheet.handle'
import type {SideSheetBaseProps, SideSheetState} from './Side-sheet.interface'

export const SideSheetBase = forwardRef<View, SideSheetBaseProps>(
	(
		{
			defaultVisible,
			disabledClose,
			onBack: rawOnBack,
			onClose: rawOnClose,
			onVisible,
			renderSideSheet,
			type = SIDE_SHEET_TYPE.MODAL,
			visible,
			...renderSideSheetProps
		},
		ref
	) => {
		const [
			{sideSheetVisible: isSideSheetVisible, nextCloseEvent, nextBackEvent, nextCancelEvent},
			setState
		] = useImmer<SideSheetState>({})

		const emitId = useMemo(() => nanoid(), [])
		const id = useId()
		const sideSheetTypes = useMemo(() => [SIDE_SHEET_TYPE.STANDARD, SIDE_SHEET_TYPE.SIDEBAR] as const, [])
		const onBack = useMemo(
			() =>
				createStableHandlerWithState(
					updateSideSheetBackWithEvent({onBack: rawOnBack, disabledClose, type})
				)(setState)(),
			[disabledClose, rawOnBack, setState, type]
		)

		const onClose = useMemo(
			() => createStableHandlerWithState(updateSideSheetClose(rawOnClose))(setState)(),
			[rawOnClose, setState]
		)

		const runSetSideSheetVisibility = useMemo(
			() => createStableHandlerWithState(setSideSheetVisibility)(setState)(),
			[setState]
		)

		const runEmitSideSheetModalUnmount = useMemo(
			() => createStableHandler(emitSideSheetModalUnmount(emitId))(),
			[emitId]
		)

		const renderSheetProps = useMemo(
			() => ({
				...renderSideSheetProps,
				disabledClose,
				id,
				onBack,
				onClose,
				onVisible,
				ref,
				type,
				visible: isSideSheetVisible
			}),
			[
				disabledClose,
				id,
				isSideSheetVisible,
				onBack,
				onClose,
				onVisible,
				ref,
				renderSideSheetProps,
				type
			]
		)

		const runEmitSideSheetModal = useMemo(
			() => createStableHandler(emitSideSheetModal({id: emitId, type})(renderSheetProps))(),
			[emitId, renderSheetProps, type]
		)

		useEffect(() => {
			runSetSideSheetVisibility(visible ?? defaultVisible)
		}, [runSetSideSheetVisibility, defaultVisible, visible])

		useEffect(() => {
			runEmitSideSheetModal(isSideSheetVisible)
		}, [runEmitSideSheetModal, isSideSheetVisible])

		useEffect(
			() => () => {
				runEmitSideSheetModalUnmount(type)
			},
			[runEmitSideSheetModalUnmount, type]
		)

		useEffect(() => {
			runAfterInteractions(nextCloseEvent)()
		}, [nextCloseEvent])

		useEffect(() => {
			runAfterInteractions(nextBackEvent)()
		}, [nextBackEvent])

		useEffect(() => {
			runAfterInteractions(nextCancelEvent)()
		}, [nextCancelEvent])

		return sideSheetTypes.includes(type as (typeof sideSheetTypes)[number]) ?
				renderSideSheet(renderSheetProps)
			:	<></>
	}
)
