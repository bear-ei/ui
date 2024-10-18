import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {TextInput} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {textSearch} from '../../utils'
import {Chip} from '../Chip'
import {State} from '../Common'
import {Icon} from '../Icon'
import {ListData} from '../List'
import {
    HandleTextFieldPickerInitOptions,
    HandleTextFieldPickerMenuVisibleOptions,
    HandleTextFieldPickerStateChangeOptions,
    TextFieldPickerBaseProps,
    TextFieldPickerState
} from './Text-field-picker.interface'
import {Item} from './Text-field-picker.styles'

const handleTextFieldPickerInit =
    (setState: Updater<TextFieldPickerState>) =>
    ({data, activeKey, activeKeys, defaultActiveKey, defaultActiveKeys}: HandleTextFieldPickerInitOptions) => {
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

const handleTextFieldPickerStateChange = ({eventName}: HandleTextFieldPickerStateChangeOptions) => {
    return (setState: Updater<TextFieldPickerState>) => (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        setState(draft => {
            draft.eventName = eventName
        })
    }
}

const handleTextFieldPickerActive = (setState: Updater<TextFieldPickerState>) => (activeKey?: string) => {
    setState(draft => {
        draft.value = draft.data?.find(item => item.indexKey === activeKey)?.headline as string
        draft.activeKey = activeKey
    })
}

const handleTextFieldPickerActives = (setState: Updater<TextFieldPickerState>) => (activeKeys?: string[]) => {
    setState(draft => {
        // draft.value = draft.data?.find(item => item.indexKey === activeKey)?.headline as string
        draft.activeKeys = activeKeys
    })
}

const handleTextFieldPickerChangeText =
    (setState: Updater<TextFieldPickerState>) =>
    (data = [] as ListData[]) =>
    (value: string) => {
        if (data) {
            setState(draft => {
                draft.data = (value ? textSearch(data)(['headline'])(value) : data) as WritableDraft<ListData>[]
                draft.value = value
            })
        }
    }

const handleTextFieldPickerMenuVisible =
    ({setState, data}: HandleTextFieldPickerMenuVisibleOptions) =>
    (ref: React.RefObject<TextInput>) =>
    (value?: boolean) => {
        if (typeof value === 'boolean') {
            setState(draft => {
                draft.menuVisible = value

                if (!value) {
                    draft.data = data as WritableDraft<ListData>[]
                    draft.value = data?.find(item => item.indexKey === draft.activeKey)?.headline as string
                    draft.nextBlurEvent = () => ref.current?.blur()
                }
            })
        }
    }

const renderContent = ({activeKeys}) =>
    activeKeys?.map(key => (
        <Item key={key}>
            <Chip
                elevated={true}
                type='assist'
                leadingIcon={<Icon name='tag' />}
            />
        </Item>
    ))

export const TextFieldPickerBase = forwardRef<TextInput, TextFieldPickerBaseProps>(
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
        const [{data, status, eventName, value, menuVisible, nextBlurEvent, activeKey, activeKeys}, setState] =
            useImmer<TextFieldPickerState>({
                activeKey: undefined,
                activeKeys: undefined,
                data: undefined,
                eventName: undefined,
                menuVisible: undefined,
                nextBlurEvent: undefined,
                status: 'idle',
                value: undefined
            })

        const textFieldRef = useRef<TextInput>(null)
        const id = useId()
        const onTextFieldPickerActive = handleTextFieldPickerActive(setState)
        const onTextFieldPickerActives = handleTextFieldPickerActives(setState)
        const onTextFieldPickerInit = useMemo(() => handleTextFieldPickerInit(setState), [setState])
        const theme = useTheme()
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTextFieldPickerStateChange({...options, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
        const onTextFieldPickerChangeText = handleTextFieldPickerChangeText(setState)(rawData)
        const onTextFieldPickerMenuVisible = handleTextFieldPickerMenuVisible({setState, data: rawData})(textFieldRef)
        const contentElement = renderContent({activeKeys})

        useImperativeHandle(ref, () => (textFieldRef?.current ? textFieldRef?.current : {}) as TextInput, [])

        useEffect(() => {
            onTextFieldPickerInit({
                activeKey: rawActiveKey,
                activeKeys: rawActiveKeys,
                data: rawData,
                defaultActiveKey,
                defaultActiveKeys
            })
        }, [defaultActiveKey, defaultActiveKeys, onTextFieldPickerInit, rawActiveKey, rawActiveKeys, rawData])

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
            contentElement,
            data,
            disabled,
            eventName,
            id,
            menuVisible,
            onActive: onTextFieldPickerActive,
            onActives: onTextFieldPickerActives,
            onChangeText: onTextFieldPickerChangeText,
            onMenuVisible: onTextFieldPickerMenuVisible,
            onStateEvent,
            ref: textFieldRef,
            theme,
            value
        })
    }
)
