import {COMPONENT_STATUS} from '@/constants'
import type {NativeSyntheticEvent, TargetedEvent} from 'react-native'
import type {Updater} from 'use-immer'
import type {FormErrors} from '../Form.interface'
import type {
        ApplyFormItemStatusInitToDraftOptions,
        FormItemState,
        UpdateFormFieldValueIfChangedOptions
} from './Form-item.interface'

export const applyFormItemStatusInitToDraft =
        ({rule, signInField, onComponentUpdate, validatorOptions}: ApplyFormItemStatusInitToDraftOptions) =>
        (setState: Updater<FormItemState>) =>
        (name?: string) => {
                const {signOut} = signInField({name, onComponentUpdate, rule, touched: false, validatorOptions}) ?? {}

                setState(draft => {
                        if (draft.status !== COMPONENT_STATUS.IDLE) {
                                return
                        }

                        draft.signOutEvent = signOut
                        draft.status = COMPONENT_STATUS.SUCCEEDED
                })
        }

export const updateFormFieldValueIfChanged =
        ({setFieldsValue, storeValue}: UpdateFormFieldValueIfChangedOptions) =>
        (name?: string) =>
        (value?: unknown) =>
                name && storeValue !== value && setFieldsValue()({[name]: value})

export const triggerFormItemShouldUpdate = (setState: Updater<FormItemState>) => () =>
        setState(draft => {
                draft.shouldUpdate = {}
        })

export const validateFormFieldOnBlur =
        (validateFields: (name?: string) => Promise<FormErrors<unknown>>) =>
        (name?: string) =>
        (_event: NativeSyntheticEvent<TargetedEvent>) =>
                name && validateFields(name)
