import {validate, ValidationError} from 'class-validator'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {asyncDebounce} from '../../../util'
import {FormError} from '../Form.interface'
import {useFormContext} from '../use-form-context.hook'
import {
    FormItemBaseProps,
    FormItemState,
    HandleFormItemInitOptions,
    HandleFormItemValidateOptions,
    HandleFormItemValueChangeOptions
} from './Form-item.interface'

const handleFormItemValueChange =
    ({setFieldValue, storeValue}: HandleFormItemValueChangeOptions) =>
    (name?: string) =>
    (value?: unknown) =>
        name && storeValue !== value && setFieldValue()()({[name]: value})

const handleFormItemValidate = ({rule, validatorOptions}: HandleFormItemValidateOptions) => {
    const {
        forbidNonWhitelisted = true,
        skipMissingProperties = true,
        whitelist = true,
        ...otherValidatorOptions
    } = validatorOptions ?? {}

    return (name?: string) => async (value?: unknown) =>
        name && rule ?
            validate(Object.assign(new rule(), {[name]: value}), {
                forbidNonWhitelisted,
                skipMissingProperties,
                whitelist,
                ...otherValidatorOptions
            }).then(errors => (errors.length ? errors : undefined))
        :   ([] as ValidationError[])
}

const handleComponentUpdate = (setState: Updater<FormItemState>) => () =>
    setState(draft => {
        draft.shouldUpdate = {}
    })

const handleFormItemInit =
    ({rule, validate: fieldValidate, signInField, onComponentUpdate}: HandleFormItemInitOptions) =>
    (setState: Updater<FormItemState>) =>
    (name?: string) => {
        setState(draft => {
            if (draft.status !== 'idle') {
                return
            }

            const {signOut} =
                signInField({name, onComponentUpdate, rule, touched: false, validate: fieldValidate}) ?? {}

            draft.signOut = signOut
            draft.status = 'succeeded'
        })
    }

const handleFormItemBlur =
    (validateField: (name?: string) => Promise<FormError<any>>) =>
    (name?: string) =>
    (_event: NativeSyntheticEvent<TargetedEvent>) => {
        name && validateField(name)
    }

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
    (
        {
            labelText,
            name,
            render,
            renderControl,
            minSkeletonDuration,
            rule,
            validatorOptions,
            validationDelay = 300,
            ...renderProps
        },
        ref
    ) => {
        const [{signOut, status}, setState] = useImmer<FormItemState>({
            shouldUpdate: {},
            signOut: undefined,
            status: 'idle'
        })

        const id = useId()
        const {getFieldError, getFieldValue, setFieldValue, signInField, getInitialValue, validateField} =
            useFormContext()

        const errors = getFieldError(name)
        const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
        const storeValue = getFieldValue(name) ?? getInitialValue(name)
        const onComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
        const onValueChange = handleFormItemValueChange({setFieldValue, storeValue})(name)
        const onFieldValidate = useMemo(
            () => asyncDebounce(handleFormItemValidate({rule, validatorOptions})(name))(validationDelay),
            [name, rule, validationDelay, validatorOptions]
        ) as (value?: unknown) => Promise<ValidationError[] | undefined>

        const onFormItemInit = useMemo(
            () => handleFormItemInit({rule, validate: onFieldValidate, signInField, onComponentUpdate})(setState),
            [onComponentUpdate, onFieldValidate, rule, setState, signInField]
        )

        const onControlBlur = handleFormItemBlur(validateField)(name)
        const controlElement = renderControl?.({
            errorMessage,
            labelText,
            onBlur: onControlBlur,
            onValueChange,
            value: storeValue
        })

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
