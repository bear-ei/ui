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
        ({labelText, name, onLoadEnd, render, renderControl, rule, validatorOptions, ...renderProps}, ref) => {
                const [{signOut, status}, setState] = useImmer<FormItemState>({shouldUpdate: {}, status: 'idle'})
                const id = useId()
                const {getFieldError, getFieldValue, getInitialValue, setFieldValue, signInField, validateField} =
                        useFormContext()

                const errors = getFieldError(name)
                const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
                const onFormItemComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
                const storeValue = getFieldValue(name)
                const value = storeValue ?? (status === 'idle' ? getInitialValue(name) : storeValue)
                const onValueChange = handleFormItemValueChange({setFieldValue, storeValue})(name)
                const onFormItemStatus = useMemo(
                        () =>
                                handleFormItemStatus({
                                        onComponentUpdate: onFormItemComponentUpdate,
                                        rule,
                                        signInField,
                                        validatorOptions
                                })(setState),
                        [onFormItemComponentUpdate, rule, setState, signInField, validatorOptions]
                )

                const onFormItemControlBlur = handleFormItemBlur(validateField)(name)
                const controlElement = renderControl?.({
                        errorMessage,
                        labelText,
                        onBlur: onFormItemControlBlur,
                        onLoadEnd,
                        onValueChange,
                        value
                })

                useEffect(() => {
                        onFormItemStatus(name)
                }, [name, onFormItemStatus])

                useEffect(() => () => signOut?.(), [signOut])

                if (status === 'idle') {
                        return <></>
                }

                return render({...renderProps, control: controlElement, id, ref})
        }
)
