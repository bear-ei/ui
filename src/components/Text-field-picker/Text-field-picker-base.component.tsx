import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import {TextInput} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {State} from '../Common'
import {ListData} from '../List'
import {
    HandleTextFieldPickerStateChangeOptions,
    RenderTextFieldPickerProps,
    TextFieldPickerBaseProps,
    TextFieldPickerState
} from './Text-field-picker.interface'

export const handleTextFieldPickerInit = (setState: Updater<TextFieldPickerState>) => (data?: ListData[]) => {
    setState(draft => {
        if (draft.status !== 'idle') {
            return
        }

        draft.data = data as WritableDraft<ListData>[]
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

export const TextFieldPickerBase = forwardRef<TextInput, TextFieldPickerBaseProps>(
    ({render, data: rawData, disabled, ...renderProps}, ref) => {
        const [{data, status, eventName}, setState] = useImmer<TextFieldPickerState>({
            data: undefined,
            eventName: undefined,
            status: 'idle'
        })

        const id = useId()
        const onTextFieldPickerInit = useMemo(() => handleTextFieldPickerInit(setState), [setState])
        const theme = useTheme()
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleTextFieldPickerStateChange({...options, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})

        useEffect(() => {
            onTextFieldPickerInit(rawData)
        }, [onTextFieldPickerInit, rawData])

        if (status === 'idle') {
            return <></>
        }

        return render({
            ...renderProps,
            data,
            disabled,
            eventName,
            id,
            onStateEvent,
            ref: ref as RenderTextFieldPickerProps['ref'],
            theme
        })
    }
)
