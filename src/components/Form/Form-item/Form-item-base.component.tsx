import {validate, ValidationError} from 'class-validator'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {asyncDebounce} from '../../../utils'
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
    ({setFieldsValue, storeValue}: HandleFormItemValueChangeOptions) =>
    (name?: string) =>
    (value?: unknown) => {
        if (name && storeValue !== value) {
            setFieldsValue()({[name]: value})
        }
    }

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
    ({rule, validate: fieldsValidate, signInFields, onComponentUpdate}: HandleFormItemInitOptions) =>
    (setState: Updater<FormItemState>) =>
    (name?: string) =>
        setState(draft => {
            if (draft.status !== 'idle') {
                return
            }

            const {signOut} =
                signInFields({name, onComponentUpdate, rule, touched: false, validate: fieldsValidate}) ?? {}

            draft.signOut = signOut
            draft.status = 'succeeded'
        })

const handleFormItemBlur =
    (validateFields: (name?: string) => Promise<FormError<unknown>>) =>
    (name?: string) =>
    (_event: NativeSyntheticEvent<TargetedEvent>) => {
        if (name) {
            validateFields(name)
        }
    }

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
    (
        {
            labelText,
            name,
            render,
            renderControl,
            rule,
            skeletonMinDuration,
            validationDelay = 350,
            validatorOptions,
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
        const {getFieldsError, getFieldsValue, setFieldsValue, signInFields, getInitialValues, validateFields} =
            useFormContext()

        const errors = getFieldsError(name)
        const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
        const storeValue = getFieldsValue(name) ?? getInitialValues(name)
        const onComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
        const onValuesChange = handleFormItemValueChange({setFieldsValue, storeValue})(name)
        const onFieldsValidate = useMemo(
            () => asyncDebounce(handleFormItemValidate({rule, validatorOptions})(name))(validationDelay),
            [name, rule, validationDelay, validatorOptions]
        ) as (value?: unknown) => Promise<ValidationError[] | undefined>

        const onFormItemInit = useMemo(
            () => handleFormItemInit({rule, validate: onFieldsValidate, signInFields, onComponentUpdate})(setState),
            [onComponentUpdate, onFieldsValidate, rule, setState, signInFields]
        )

        const onControlBlur = handleFormItemBlur(validateFields)(name)
        const controlElement = renderControl?.({
            errorMessage,
            labelText,
            onBlur: onControlBlur,
            onValuesChange,
            value: storeValue
        })

        useEffect(() => {
            onFormItemInit(name)
        }, [name, onFormItemInit])

        useEffect(() => () => signOut?.(), [signOut])

        if (status === 'idle') {
            return <></>
        }

        return render({...renderProps, control: controlElement, id, skeletonMinDuration, ref})
    }
)
