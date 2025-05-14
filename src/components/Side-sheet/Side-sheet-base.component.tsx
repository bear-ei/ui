import {nanoid} from 'nanoid'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createHandler, createHandlerWithUpdater, runAfterInteractions} from '../../utils'
import {
	handleSideSheetBack,
	handleSideSheetClose,
	handleSideSheetEmit,
	handleSideSheetUnmount,
	handleSideSheetVisible
} from './Side-sheet-handle'
import {SIDE_SHEET_TYPE} from './Side-sheet.enum'
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
		const sideSheetTypes = [SIDE_SHEET_TYPE.STANDARD, SIDE_SHEET_TYPE.SIDEBAR] as const
		const onSideSheetBack = useMemo(
			() => createHandlerWithUpdater(handleSideSheetBack({onBack, disabledClose, type}))(setState)(),
			[disabledClose, onBack, setState, type]
		)

		const onSideSheetClose = useMemo(
			() => createHandlerWithUpdater(handleSideSheetClose(onClose))(setState)(),
			[onClose, setState]
		)

		const onSideSheetVisible = useMemo(
			() => createHandlerWithUpdater(handleSideSheetVisible)(setState)(),
			[setState]
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
				renderSideSheetProps,
				disabledClose,
				id,
				onSideSheetBack,
				onSideSheetClose,
				onVisible,
				ref,
				type,
				isSideSheetVisible
			]
		)

		const onSideSheetEmit = useMemo(
			() => createHandler(handleSideSheetEmit({id: emitId, type})(renderSheetProps))(),
			[emitId, renderSheetProps, type]
		)

		useEffect(() => {
			onSideSheetVisible(visible ?? defaultVisible)
		}, [defaultVisible, onSideSheetVisible, visible])

		useEffect(() => {
			onSideSheetEmit(isSideSheetVisible)
		}, [onSideSheetEmit, isSideSheetVisible])

		useEffect(
			() => () => {
				handleSideSheetUnmount(emitId)(type)
			},
			[emitId, type]
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
