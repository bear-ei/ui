import {ValidationError} from 'class-validator'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {validate, ValidationRule} from '../../../util'
import {FormError} from '../Form.interface'
import {useFormContext} from '../use-form-context.hook'
import {
    FormItemBaseProps,
    InitialFormItemState,
    ProcessFormItemInitOptions,
    ProcessFormItemValueChangeOptions
} from './Form-item.interface'

const processFormItemValueChange =
    ({setFieldValue, storageValue}: ProcessFormItemValueChangeOptions) =>
    (name?: string) =>
    (value?: unknown) =>
        name && storageValue !== value && setFieldValue()()({[name]: value})

const processFormItemValidate = (rule?: ValidationRule) => (name?: string) => async (value?: unknown) =>
    name && rule ? validate(rule)(name)(value) : ([] as ValidationError[])

const processFormStorageChange = (setState: Updater<InitialFormItemState>) => () =>
    setState(draft => {
        draft.shouldUpdate = {}
    })

const processFormItemInit =
    ({rule, validate: fieldValidate, signInField}: ProcessFormItemInitOptions) =>
    (setState: Updater<InitialFormItemState>) =>
    (name?: string) => {
        setState(draft => {
            if (draft.status !== 'idle') {
                return
            }

            const {signOut} =
                signInField({
                    name,
                    onFormStorageChange: processFormStorageChange(setState),
                    rule,
                    touched: false,
                    validate: fieldValidate
                }) ?? {}

            draft.signOut = signOut
            draft.status = 'succeeded'
        })
    }

const processFormItemBlur =
    (validateField: (name?: string) => Promise<FormError<any>>) =>
    (name?: string) =>
    (_event: NativeSyntheticEvent<TargetedEvent>) => {
        name && validateField(name)
    }

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
    ({labelText, name, render, renderControl, minSkeletonDuration, rule, ...renderProps}, ref) => {
        const [{signOut, status}, setState] = useImmer<InitialFormItemState>({
            shouldUpdate: {},
            signOut: undefined,
            status: 'idle'
        })

        const id = useId()
        const {getFieldError, getFieldValue, setFieldValue, signInField, getInitialValue, validateField} =
            useFormContext()

        const errors = getFieldError(name)
        const errorMessage = Object.entries(errors?.[0].constraints ?? {})[0]?.[1]
        const storageValue = getFieldValue(name) ?? getInitialValue(name)
        const onValueChange = useMemo(
            () => processFormItemValueChange({setFieldValue, storageValue})(name),
            [name, setFieldValue, storageValue]
        )

        const onFieldValidate = useMemo(() => processFormItemValidate(rule)(name), [name, rule])
        const onFormItemInit = useMemo(
            () => processFormItemInit({rule, validate: onFieldValidate, signInField})(setState),
            [onFieldValidate, rule, setState, signInField]
        )

        const onControlBlur = useMemo(() => processFormItemBlur(validateField)(name), [name, validateField])
        const controlElement = useMemo(
            () => renderControl?.({errorMessage, labelText, onValueChange, value: storageValue, onBlur: onControlBlur}),
            [errorMessage, labelText, onControlBlur, onValueChange, renderControl, storageValue]
        )

        useEffect(() => {
            onFormItemInit(name)
        }, [name, onFormItemInit])

        useEffect(() => () => signOut?.(), [signOut])

        if (status === 'idle') {
            return <></>
        }

        return render({...renderProps, control: controlElement, id, minSkeletonDuration, ref})
    }
)
