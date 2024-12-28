import {forwardRef, useEffect, useId, useMemo} from 'react'
import {NativeSyntheticEvent, TargetedEvent, View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {FormError} from '../Form.interface'
import {useFormContext} from '../use-form-context.hook'
import {
        FormItemBaseProps,
        FormItemState,
        HandleFormItemInitOptions,
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

const handleComponentUpdate = (setState: Updater<FormItemState>) => () =>
        setState(draft => {
                draft.shouldUpdate = {}
        })

const handleFormItemInit =
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
                        onLoadEnd,
                        render,
                        renderControl,
                        rule,
                        skeletonDuration,
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
                const {getFieldsError, getFieldsValue, getInitialValues, setFieldsValue, signInFields, validateFields} =
                        useFormContext()

                const errors = getFieldsError(name)
                const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
                const onComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
                const storeValue = getFieldsValue(name)
                const value = storeValue ?? (status === 'idle' ? getInitialValues(name) : storeValue)
                const onValuesChange = handleFormItemValueChange({setFieldsValue, storeValue})(name)
                const onFormItemInit = useMemo(
                        () => handleFormItemInit({rule, signInFields, onComponentUpdate, validatorOptions})(setState),
                        [onComponentUpdate, rule, setState, signInFields, validatorOptions]
                )

                const onControlBlur = handleFormItemBlur(validateFields)(name)
                const controlElement = renderControl?.({
                        errorMessage,
                        labelText,
                        onBlur: onControlBlur,
                        onLoadEnd,
                        onValuesChange,
                        value
                })

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
                        skeletonDuration,
                        ref
                })
        }
)
