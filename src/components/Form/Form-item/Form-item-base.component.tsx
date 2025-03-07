import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {debounce} from '../../../utils'
import {useFormContext} from '../use-form-context.hook'
import {
        handleComponentUpdate,
        handleFormItemStatus,
        handleFormItemValidateField,
        handleFormItemValueChange
} from './Form-item-handle'
import {FormItemBaseProps, FormItemState} from './Form-item.interface'

export const FormItemBase = forwardRef<View, FormItemBaseProps>(
        ({labelText, name, onLoadEnd, render, renderControl, rule, validatorOptions, ...renderProps}, ref) => {
                const [{signOut, status}, setState] = useImmer<FormItemState>({shouldUpdate: {}, status: 'idle'})
                const id = useId()
                const {delay = 300} = useMemo(() => validatorOptions ?? {}, [validatorOptions])
                const {getFieldError, getFieldValue, getInitialValue, setFieldValue, signInField, validateField} =
                        useFormContext()

                const errors = getFieldError(name)
                const errorMessage = Object.entries(errors?.[0]?.constraints ?? {})[0]?.[1]
                const onFormItemComponentUpdate = useMemo(() => handleComponentUpdate(setState), [setState])
                const storeValue = getFieldValue(name)
                const value = useMemo(
                        () => storeValue ?? (status === 'idle' ? getInitialValue(name) : storeValue),
                        [getInitialValue, name, status, storeValue]
                )

                const onValueChange = handleFormItemValueChange({setFieldValue, storeValue})(name)
                const onFormItemValidateField = useMemo(
                        () => debounce(handleFormItemValidateField(validateField)(name))(delay),
                        [delay, name, validateField]
                )

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

                const controlElement = renderControl?.({errorMessage, labelText, onLoadEnd, onValueChange, value})

                useEffect(() => {
                        onFormItemStatus(name)
                }, [name, onFormItemStatus])

                useEffect(() => {
                        if (typeof value !== 'undefined') {
                                onFormItemValidateField()
                        }
                }, [onFormItemValidateField, value])

                useEffect(() => () => signOut?.(), [signOut])

                if (status === 'idle') {
                        return <></>
                }

                return render({...renderProps, control: controlElement, ref, id})
        }
)
