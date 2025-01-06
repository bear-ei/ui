import {NativeSyntheticEvent, TargetedEvent} from 'react-native'
import {Updater} from 'use-immer'
import {FormError} from '../Form.interface'
import {FormItemState, HandleFormItemInitOptions, HandleFormItemValueChangeOptions} from './Form-item.interface'

export const handleFormItemValueChange =
        ({setFieldValue, storeValue}: HandleFormItemValueChangeOptions) =>
        (name?: string) =>
        (value?: unknown) =>
                name && storeValue !== value && setFieldValue()({[name]: value})

export const handleComponentUpdate = (setState: Updater<FormItemState>) => () =>
        setState(draft => {
                draft.shouldUpdate = {}
        })

export const handleFormItemStatus =
        ({rule, signInField, onComponentUpdate, validatorOptions}: HandleFormItemInitOptions) =>
        (setState: Updater<FormItemState>) =>
        (name?: string) =>
                setState(draft => {
                        if (draft.status !== 'idle') {
                                return
                        }

                        const {signOut} =
                                signInField({name, onComponentUpdate, rule, touched: false, validatorOptions}) ?? {}

                        draft.signOut = signOut
                        draft.status = 'succeeded'
                })

export const handleFormItemBlur =
        (validateField: (name?: string) => Promise<FormError<unknown>>) =>
        (name?: string) =>
        (_event: NativeSyntheticEvent<TargetedEvent>) => {
                if (name) {
                        validateField(name)
                }
        }
