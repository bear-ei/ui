import {WritableDraft} from 'immer'
import {
    forwardRef,
    useEffect,
    useId,
    useImperativeHandle,
    useMemo,
    useRef
} from 'react'
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputKeyPressEventData
} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {
    OnStateEventChangeOptions,
    StateEvent,
    useOnStateEvent
} from '../../hooks'
import {debounce, textSearch} from '../../utils'
import {Chip} from '../Chip'
import {State} from '../Common'
import {ListData} from '../List'
import {
    HandleTextFieldPickerInitOptions,
    HandleTextFieldPickerMenuVisibleOptions,
    HandleTextFieldPickerStateChangeOptions,
    RenderTextFieldPickerContentOptions,
    TextFieldPickerBaseProps,
    TextFieldPickerState
} from './Text-field-picker.interface'
import {Item} from './Text-field-picker.styles'

const handleTextFieldPickerInit =
    (setState: Updater<TextFieldPickerState>) =>
    ({
        activeKey,
        activeKeys,
        data,
        defaultActiveKey,
        defaultActiveKeys
    }: HandleTextFieldPickerInitOptions) => {
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

const handleTextFieldPickerStateChange = ({
    eventName
}: HandleTextFieldPickerStateChangeOptions) => {
    return (setState: Updater<TextFieldPickerState>) =>
        (_event: StateEvent) => {
            if (eventName === 'layout') {
                return
            }

            setState(draft => {
                draft.eventName = eventName
            })
        }
}

const handleTextFieldPickerActive =
    (setState: Updater<TextFieldPickerState>) =>
    (ref: React.RefObject<TextInput>) =>
    (activeKey?: string) => {
        ref.current?.focus()

        setState(draft => {
            draft.value = draft.data?.find(item => item.indexKey === activeKey)
                ?.headline as string

            draft.activeKey = activeKey
        })
    }

const handleTextFieldPickerActives =
    (setState: Updater<TextFieldPickerState>) =>
    (ref: React.RefObject<TextInput>) =>
    (activeKeys?: string[]) => {
        ref.current?.focus()

        setState(draft => {
            draft.activeKeys = activeKeys
        })
    }

const handleTextFieldPickerChangeText =
    (setState: Updater<TextFieldPickerState>) =>
    (data = [] as ListData[]) =>
    (value: string) => {
        if (data) {
            setState(draft => {
                draft.data = (
                    value ?
                        textSearch(data)(['headline'])(value)
                    :   data) as WritableDraft<ListData>[]
                draft.value = value
            })
        }
    }

const handleTextFieldPickerContentPressOut =
    (ref: React.RefObject<TextInput>) => () =>
        ref.current?.focus()

const handleTextFieldPickerMenuVisible = ({
    setState,
    data
}: HandleTextFieldPickerMenuVisibleOptions) => {
    const handleFindData =
        (draft: WritableDraft<TextFieldPickerState>) => (item: ListData) =>
            item.indexKey === draft.activeKey

    return (value?: boolean) => {
        if (typeof value === 'boolean') {
            setState(draft => {
                draft.menuVisible = value

                if (!value) {
                    draft.data = data as WritableDraft<ListData>[]
                    draft.value = data?.find(handleFindData(draft))
                        ?.headline as string
                }
            })
        }
    }
}

const handleTextFieldPickerClose =
    (setState: Updater<TextFieldPickerState>) =>
    (ref: React.RefObject<TextInput>) => {
        const handleFilterData = (key: string) => (item: string) => item !== key

        return (key: string) => {
            ref.current?.focus()

            setState(draft => {
                draft.activeKeys = draft.activeKeys?.filter(
                    handleFilterData(key)
                )
            })
        }
    }

const renderTextFieldPickerContent = ({
    activeKeys,
    data,
    id,
    onClose,
    onPressOut
}: RenderTextFieldPickerContentOptions) => {
    const contents = activeKeys?.map(key => {
        const {leading, headline} =
            data?.find(datum => datum.indexKey === key) ?? {}

        return (
            <Item
                key={key}
                testID={`textFieldPicker__content--${id}`}
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

const handleTextFieldPickerKeyPress =
    (setState: Updater<TextFieldPickerState>) =>
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        event.preventDefault()
        const {key} = event.nativeEvent

        setState(draft => {
            if (draft.menuVisible) {
                draft.keyCode = `${key}${event.timeStamp}`
            }
        })
    }

export const TextFieldPickerBase = forwardRef<
    TextInput,
    TextFieldPickerBaseProps
>(
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
            {
                activeKey,
                activeKeys,
                data,
                eventName,
                keyCode,
                menuVisible,
                nextBlurEvent,
                status,
                value
            },
            setState
        ] = useImmer<TextFieldPickerState>({
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
        const textFieldRef = useRef<TextInput>(null)
        const onTextFieldPickerActive = useMemo(
            () => handleTextFieldPickerActive(setState)(textFieldRef),
            [setState]
        )

        const onTextFieldPickerActives = useMemo(
            () => handleTextFieldPickerActives(setState)(textFieldRef),
            [setState]
        )

        const onTextFieldPickerClose =
            handleTextFieldPickerClose(setState)(textFieldRef)

        const onTextFieldPickerContentPressOut =
            handleTextFieldPickerContentPressOut(textFieldRef)

        const onTextFieldPickerInit = useMemo(
            () => handleTextFieldPickerInit(setState),
            [setState]
        )

        const theme = useTheme()
        const onStateEventChange =
            (options: OnStateEventChangeOptions) =>
            (state: State) =>
            (event: StateEvent) =>
                handleTextFieldPickerStateChange({...options, state})(setState)(
                    event
                )

        const contentElements = renderTextFieldPickerContent({
            activeKeys,
            data: rawData,
            id,
            onClose: onTextFieldPickerClose,
            onPressOut: onTextFieldPickerContentPressOut
        })

        const onStateEvent = useOnStateEvent({
            ...renderProps,
            disabled,
            onStateEventChange
        })

        const onTextFieldPickerChangeText = useMemo(
            () =>
                debounce(handleTextFieldPickerChangeText(setState)(rawData))(
                    250
                ),
            [rawData, setState]
        )

        const onTextFieldPickerKeyPress =
            handleTextFieldPickerKeyPress(setState)

        const onTextFieldPickerMenuVisible = useMemo(
            () => handleTextFieldPickerMenuVisible({setState, data: rawData}),
            [rawData, setState]
        )

        useImperativeHandle(
            ref,
            () =>
                (textFieldRef?.current ?
                    textFieldRef?.current
                :   {}) as TextInput,
            []
        )

        useEffect(() => {
            onTextFieldPickerInit({
                activeKey: rawActiveKey,
                activeKeys: rawActiveKeys,
                data: rawData,
                defaultActiveKey,
                defaultActiveKeys
            })
        }, [
            defaultActiveKey,
            defaultActiveKeys,
            onTextFieldPickerInit,
            rawActiveKey,
            rawActiveKeys,
            rawData
        ])

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
            onActive: onTextFieldPickerActive,
            onActives: onTextFieldPickerActives,
            onChangeText: onTextFieldPickerChangeText,
            onKeyPress: onTextFieldPickerKeyPress,
            onMenuVisible: onTextFieldPickerMenuVisible,
            onStateEvent,
            ref: textFieldRef,
            theme,
            value
        })
    }
)
