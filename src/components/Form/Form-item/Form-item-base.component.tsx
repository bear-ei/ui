import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {useFormContext} from '../use-form-context.hook'
import {
        handleComponentUpdate,
        handleFormItemBlur,
        handleFormItemStatus,
        handleFormItemValueChange
} from './Form-item-handle'
import {FormItemBaseProps, FormItemState} from './Form-item.interface'

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
                const [{signOut, status}, setState] = useImmer<FormItemState>({shouldUpdate: {}, status: 'idle'})
                const id = useId()
                const {getFieldsError, getFieldsValue, getInitialValues, setFieldsValue, signInFields, validateFields} =
                        useFormContext()

                const errors = getFieldsError(name)
                const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
                const onFormItemComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
                const storeValue = getFieldsValue(name)
                const value = storeValue ?? (status === 'idle' ? getInitialValues(name) : storeValue)
                const onValuesChange = handleFormItemValueChange({setFieldsValue, storeValue})(name)
                const onFormItemStatus = useMemo(
                        () =>
                                handleFormItemStatus({
                                        onComponentUpdate: onFormItemComponentUpdate,
                                        rule,
                                        signInFields,
                                        validatorOptions
                                })(setState),
                        [onFormItemComponentUpdate, rule, setState, signInFields, validatorOptions]
                )

                const onFormItemControlBlur = handleFormItemBlur(validateFields)(name)
                const controlElement = renderControl?.({
                        errorMessage,
                        labelText,
                        onBlur: onFormItemControlBlur,
                        onLoadEnd,
                        onValuesChange,
                        value
                })

                useEffect(() => {
                        onFormItemStatus(name)
                }, [name, onFormItemStatus])

                useEffect(() => () => signOut?.(), [signOut])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        control: controlElement,
                        id,
                        ref,
                        skeletonDuration
                })
        }
)
