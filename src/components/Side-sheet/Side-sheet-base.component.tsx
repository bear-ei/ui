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
			onBack,
			onClose,
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
		const onSideSheetBack = useMemo(
			() =>
				createStableHandlerWithState(
					updateSideSheetBackWithEvent({onBack, disabledClose, type})
				)(setState)(),
			[disabledClose, onBack, setState, type]
		)

		const onSideSheetClose = useMemo(
			() => createStableHandlerWithState(updateSideSheetClose(onClose))(setState)(),
			[onClose, setState]
		)

		const applySetSideSheetVisibilityEffect = useMemo(
			() => createStableHandlerWithState(setSideSheetVisibility)(setState)(),
			[setState]
		)

		const emitSideSheetModalUnmountEffect = useMemo(
			() => createStableHandler(emitSideSheetModalUnmount(emitId))(),
			[emitId]
		)

		const renderSheetProps = useMemo(
			() => ({
				...renderSideSheetProps,
				disabledClose,
				id,
				onBack: onSideSheetBack,
				onClose: onSideSheetClose,
				onVisible,
				ref,
				type,
				visible: isSideSheetVisible
			}),
			[
				disabledClose,
				id,
				isSideSheetVisible,
				onSideSheetBack,
				onSideSheetClose,
				onVisible,
				ref,
				renderSideSheetProps,
				type
			]
		)

		const emitSideSheetModalEffect = useMemo(
			() => createStableHandler(emitSideSheetModal({id: emitId, type})(renderSheetProps))(),
			[emitId, renderSheetProps, type]
		)

		useEffect(() => {
			applySetSideSheetVisibilityEffect(visible ?? defaultVisible)
		}, [applySetSideSheetVisibilityEffect, defaultVisible, visible])

		useEffect(() => {
			emitSideSheetModalEffect(isSideSheetVisible)
		}, [emitSideSheetModalEffect, isSideSheetVisible])

		useEffect(
			() => () => {
				emitSideSheetModalUnmountEffect(type)
			},
			[emitSideSheetModalUnmountEffect, type]
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
