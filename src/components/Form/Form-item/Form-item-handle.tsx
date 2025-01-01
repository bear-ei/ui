import {NativeSyntheticEvent, TargetedEvent} from 'react-native'
import {Updater} from 'use-immer'
import {FormError} from '../Form.interface'
import {FormItemState, HandleFormItemInitOptions, HandleFormItemValueChangeOptions} from './Form-item.interface'

export const handleFormItemValueChange =
        ({setFieldsValue, storeValue}: HandleFormItemValueChangeOptions) =>
        (name?: string) =>
        (value?: unknown) =>
                name && storeValue !== value && setFieldsValue()({[name]: value})

export const handleComponentUpdate = (setState: Updater<FormItemState>) => () =>
        setState(draft => {
                draft.shouldUpdate = {}
        })

export const handleFormItemInit =
        ({rule, signInFields, onComponentUpdate, validatorOptions}: HandleFormItemInitOptions) =>
        (setState: Updater<FormItemState>) =>
        (name?: string) =>
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        const {signOut} =
                                signInFields({
                                        name,
                                        onComponentUpdate,
                                        rule,
                                        touched: false,
                                        validatorOptions
                                }) ?? {}

                        draft.signOut = signOut
                        draft.status = 'succeeded'
                })

export const handleFormItemBlur =
        (validateFields: (name?: string) => Promise<FormError<unknown>>) =>
        (name?: string) =>
        (_event: NativeSyntheticEvent<TargetedEvent>) => {
                if (name) {
                        validateFields(name)
                }
        }
