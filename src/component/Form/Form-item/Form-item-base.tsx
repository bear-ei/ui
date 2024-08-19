import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {validate} from '../../../util'
import {useFormContext} from '../use-form-context'
import {
    FormItemBaseProps,
    HandleFormItemInitOptions,
    HandleFormItemValidateOptions,
    HandleFormItemValueChangeOptions,
    InitialFormItemState
} from './Form-item.interface'

const handleFormItemValueChange =
    ({setFieldValue, storageValue}: HandleFormItemValueChangeOptions) =>
    (name?: string) =>
    (value?: unknown) =>
        name && storageValue !== value && setFieldValue()()({[name]: value})

const handleFormItemValidate =
    ({rules, validateFirst}: HandleFormItemValidateOptions) =>
    (name?: string) =>
    async (value: unknown) => {
        const isValidate = name && rules?.length !== 0

        return isValidate ? validate({rules: rules!, validateFirst})(name)(value) : undefined
    }

const handleFormStorageChange = (setState: Updater<InitialFormItemState>) => () =>
    setState(draft => {
        draft.shouldUpdate = {}
    })

const handleFormItemInit =
    ({rules, validate: fieldValidate, validateFirst, signInField}: HandleFormItemInitOptions) =>
    (setState: Updater<InitialFormItemState>) =>
    (name?: string) => {
        setState(draft => {
            if (draft.status !== 'idle') {
                return
            }

            const {signOut} =
                signInField({
                    onFormStorageChange: handleFormStorageChange(setState),
                    props: {name, rules, validateFirst},
                    touched: false,
                    validate: fieldValidate
                }) ?? {}

            draft.signOut = signOut
            draft.status = 'succeeded'
        })
    }

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
    ({labelText, name, render, renderControl, rules, validateFirst, minSkeletonDuration, ...renderProps}, ref) => {
        const [{signOut, status}, setState] = useImmer<InitialFormItemState>({
            shouldUpdate: {},
            signOut: undefined,
            status: 'idle'
        })

        const id = useId()
        const {getFieldError, getFieldValue, setFieldValue, signInField, getInitialValue} = useFormContext()
        const errors = getFieldError(name)?.errors
        const errorMessage = errors?.[0].message
        const storageValue = getFieldValue(name) ?? getInitialValue(name)
        const onValueChange = useMemo(
            () => handleFormItemValueChange({setFieldValue, storageValue})(name),
            [name, setFieldValue, storageValue]
        )

        const onFieldValidate = useMemo(
            () => handleFormItemValidate({rules, validateFirst})(name),
            [name, rules, validateFirst]
        )

        const onFormItemInit = useMemo(
            () => handleFormItemInit({rules, validate: onFieldValidate, validateFirst, signInField})(setState),
            [onFieldValidate, rules, setState, signInField, validateFirst]
        )

        const controlElement = useMemo(
            () =>
                renderControl?.({
                    errorMessage,
                    labelText,
                    onValueChange,
                    value: storageValue
                }),
            [errorMessage, labelText, onValueChange, renderControl, storageValue]
        )

        useEffect(() => {
            onFormItemInit(name)
        }, [name, onFormItemInit])

        useEffect(() => () => signOut?.(), [signOut])

        if (status === 'idle') {
            return <></>
        }

        return render({
            ...renderProps,
            control: controlElement,
            id,
            minSkeletonDuration,
            ref
        })
    }
)
