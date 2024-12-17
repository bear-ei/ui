import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {NativeSyntheticEvent, TextInput, TextInputKeyPressEventData} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {debounce, textSearch} from '../../utils'
import {Chip} from '../Chip'
import {State} from '../Common'
import {ListData} from '../List'
import {
        HandleTextInputPickerInitOptions,
        HandleTextInputPickerMenuVisibleOptions,
        HandleTextInputPickerStateChangeOptions,
        RenderTextInputPickerContentOptions,
        TextInputPickerBaseProps,
        TextInputPickerState
} from './Text-input-picker.interface'
import {Item} from './Text-input-picker.styles'

const handleTextInputPickerInit =
        (setState: Updater<TextInputPickerState>) =>
        ({activeKey, activeKeys, data, defaultActiveKey, defaultActiveKeys}: HandleTextInputPickerInitOptions) => {
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        draft.data = data as WritableDraft<ListData>[]
                        draft.activeKey = activeKey ?? defaultActiveKey
                        draft.activeKeys = activeKeys ?? defaultActiveKeys
                        draft.status = 'succeeded'
                })
        }

const handleTextInputPickerStateChange = ({eventName}: HandleTextInputPickerStateChangeOptions) => {
        return (setState: Updater<TextInputPickerState>) => (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        draft.eventName = eventName
                })
        }
}

const handleTextInputPickerActive = (setState: Updater<TextInputPickerState>) => {
        const handleFindActiveKey =
                (activeKey?: string) =>
                ({indexKey}: WritableDraft<ListData>) =>
                        activeKey === indexKey

        return (ref: React.RefObject<TextInput>) => (activeKey?: string) => {
                ref.current?.focus()

                setState(draft => {
                        draft.value = draft.data?.find(handleFindActiveKey(activeKey))?.headline as string
                        draft.activeKey = activeKey
                })
        }
}

const handleTextInputPickerActives =
        (setState: Updater<TextInputPickerState>) => (ref: React.RefObject<TextInput>) => (activeKeys?: string[]) => {
                ref.current?.focus()

                setState(draft => {
                        draft.activeKeys = activeKeys
                })
        }

const handleTextInputPickerChangeText =
        (setState: Updater<TextInputPickerState>) =>
        (data = [] as ListData[]) =>
        (value: string) => {
                if (data) {
                        setState(draft => {
                                draft.data = (
                                        value ?
                                                textSearch(data)(['headline'])(value)
                                        :       data) as WritableDraft<ListData>[]
                                draft.value = value
                        })
                }
        }

const handleTextInputPickerContentPressOut = (ref: React.RefObject<TextInput>) => () => ref.current?.focus()
const handleTextInputPickerMenuVisible = ({setState, data}: HandleTextInputPickerMenuVisibleOptions) => {
        const handleFindData = (draft: WritableDraft<TextInputPickerState>) => (item: ListData) =>
                item.indexKey === draft.activeKey

        return (value?: boolean) => {
                if (typeof value === 'boolean') {
                        setState(draft => {
                                draft.menuVisible = value

                                if (!value) {
                                        draft.data = data as WritableDraft<ListData>[]
                                        draft.value = data?.find(handleFindData(draft))?.headline as string
                                }
                        })
                }
        }
}

const handleTextInputPickerClose = (setState: Updater<TextInputPickerState>) => (ref: React.RefObject<TextInput>) => {
        const handleFilterData = (key: string) => (item: string) => item !== key

        return (key: string) => {
                ref.current?.focus()

                setState(draft => {
                        draft.activeKeys = draft.activeKeys?.filter(handleFilterData(key))
                })
        }
}

const renderTextInputPickerContent = ({
        activeKeys,
        data,
        id,
        onClose,
        onPressOut
}: RenderTextInputPickerContentOptions) => {
        const contents = activeKeys?.map(key => {
                const {leading, headline} = data?.find(datum => datum.indexKey === key) ?? {}

                return (
                        <Item
                                key={key}
                                testID={`textInputPicker__content--${id}`}
                        >
                                <Chip
                                        close={true}
                                        elevated={true}
                                        labelText={headline as string}
                                        leadingIcon={leading}
                                        onClose={() => onClose?.(key)}
                                        onPressOut={onPressOut}
                                        type='inputFilled'
                                />
                        </Item>
                )
        })

        return contents?.length === 0 ? undefined : contents
}

const handleTextInputPickerKeyPress =
        (setState: Updater<TextInputPickerState>) => (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                event.preventDefault()
                const {key} = event.nativeEvent

                setState(draft => {
                        if (draft.menuVisible) {
                                draft.keyCode = `${key}${event.timeStamp}`
                        }
                })
        }

export const TextInputPickerBase = forwardRef<TextInput, TextInputPickerBaseProps>(
        (
                {
                        activeKey: rawActiveKey,
                        activeKeys: rawActiveKeys,
                        data: rawData,
                        defaultActiveKey,
                        defaultActiveKeys,
                        disabled,
                        render,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {activeKey, activeKeys, data, eventName, keyCode, menuVisible, nextBlurEvent, status, value},
                        setState
                ] = useImmer<TextInputPickerState>({
                        activeKey: undefined,
                        activeKeys: undefined,
                        data: undefined,
                        eventName: undefined,
                        keyCode: undefined,
                        menuVisible: undefined,
                        nextBlurEvent: undefined,
                        status: 'idle',
                        value: undefined
                })

                const id = useId()
                const textInputRef = useRef<TextInput>(null)
                const onTextInputPickerActive = useMemo(
                        () => handleTextInputPickerActive(setState)(textInputRef),
                        [setState]
                )

                const onTextInputPickerActives = useMemo(
                        () => handleTextInputPickerActives(setState)(textInputRef),
                        [setState]
                )

                const onTextInputPickerClose = handleTextInputPickerClose(setState)(textInputRef)
                const onTextInputPickerContentPressOut = handleTextInputPickerContentPressOut(textInputRef)
                const onTextInputPickerInit = useMemo(() => handleTextInputPickerInit(setState), [setState])
                const theme = useTheme()
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleTextInputPickerStateChange({...options, state})(setState)(event)

                const contentElements = renderTextInputPickerContent({
                        activeKeys,
                        data: rawData,
                        id,
                        onClose: onTextInputPickerClose,
                        onPressOut: onTextInputPickerContentPressOut
                })

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled,
                        onStateEventChange
                })

                const onTextInputPickerChangeText = useMemo(
                        () => debounce(handleTextInputPickerChangeText(setState)(rawData))(250),
                        [rawData, setState]
                )

                const onTextInputPickerKeyPress = handleTextInputPickerKeyPress(setState)
                const onTextInputPickerMenuVisible = useMemo(
                        () => handleTextInputPickerMenuVisible({setState, data: rawData}),
                        [rawData, setState]
                )

                useImperativeHandle(ref, () => (textInputRef?.current ? textInputRef?.current : {}) as TextInput, [])

                useEffect(() => {
                        onTextInputPickerInit({
                                activeKey: rawActiveKey,
                                activeKeys: rawActiveKeys,
                                data: rawData,
                                defaultActiveKey,
                                defaultActiveKeys
                        })
                }, [defaultActiveKey, defaultActiveKeys, onTextInputPickerInit, rawActiveKey, rawActiveKeys, rawData])

                useEffect(() => {
                        nextBlurEvent?.()
                }, [nextBlurEvent])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        activeKey,
                        activeKeys,
                        contentElements,
                        data,
                        disabled,
                        eventName,
                        id,
                        keyCode,
                        menuVisible,
                        onActive: onTextInputPickerActive,
                        onActives: onTextInputPickerActives,
                        onChangeText: onTextInputPickerChangeText,
                        onKeyPress: onTextInputPickerKeyPress,
                        onMenuVisible: onTextInputPickerMenuVisible,
                        onStateEvent,
                        ref: textInputRef,
                        theme,
                        value
                })
        }
)
