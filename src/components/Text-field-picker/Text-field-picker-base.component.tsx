import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import {TextInput} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {ListData} from '../List'
import {RenderTextFieldPickerProps, TextFieldPickerBaseProps, TextFieldPickerState} from './Text-field-picker.interface'

export const handleTextFieldPickerInit = (setState: Updater<TextFieldPickerState>) => (data?: ListData[]) => {
    setState(draft => {
        if (draft.status !== 'idle') {
            return
        }

        draft.data = data as WritableDraft<ListData>[]
        draft.status = 'succeeded'
    })
}

export const TextFieldPickerBase = forwardRef<TextInput, TextFieldPickerBaseProps>(
    ({render, data: rawData, ...renderProps}, ref) => {
        const [{data, status}, setState] = useImmer<TextFieldPickerState>({
            data: undefined,
            status: 'idle'
        })

        const id = useId()
        const onTextFieldPickerInit = useMemo(() => handleTextFieldPickerInit(setState), [setState])
        const theme = useTheme()

        useEffect(() => {
            onTextFieldPickerInit(rawData)
        }, [onTextFieldPickerInit, rawData])

        if (status === 'idle') {
            return <></>
        }

        return render({...renderProps, theme, id, data, ref: ref as RenderTextFieldPickerProps['ref']})
    }
)
