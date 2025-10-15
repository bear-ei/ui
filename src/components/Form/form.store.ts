import {namePath, type NamePath} from '@/utils'
import {createFormFieldValidator} from './Form.handler'
import type {
        FormCallbacks,
        FormErrors,
        FormFieldEntity,
        FormStore,
        FormStoreOptions,
        FormValidateRule,
        FormValidatorOptions,
        OnValuesChangeOptions,
        SetFieldsValueOptions,
        SignInFieldOptions
} from './Form.interface'

const createFormContext = <T>() => ({
        callbacks: {} as FormCallbacks<T>,
        errors: {} as FormErrors<T>,
        fieldEntities: [] as FormFieldEntity<T>[],
        fieldKeys: [] as (keyof T)[],
        initialValues: {} as T,
        signInFieldCompleted: false,
        store: {} as T,
        validatorOptions: undefined as FormValidatorOptions | undefined
})

export const formStore = <T extends Record<string, unknown> = Record<string, unknown>>(
        {validateFields: rawValidateFields} = {} as FormStoreOptions<T>
) => {
        let {
                callbacks,
                errors,
                fieldEntities,
                fieldKeys,
                initialValues,
                signInFieldCompleted: isSignInFieldCompleted,
                store,
                validatorOptions: rawValidatorOptions
        } = createFormContext<T>()

        const getFieldEntities = (signOut = false) => (signOut ? fieldEntities : fieldEntities.filter(({name}) => name))
        const getFieldEntitiesName =
                (signOut = false) =>
                (names?: (keyof T)[]) => {
                        const entityNames = getFieldEntities(signOut).map(({name}) => name)
                        const namesSet = new Set(names)

                        return [...(names ? entityNames.filter(name => name && namesSet.has(name)) : entityNames)]
                }

        const getFieldsError = ((namePaths?: NamePath<T>) => {
                const names = namePath(namePaths)
                const err =
                        names ?
                                getFieldEntitiesName()(names).reduce(
                                        (accumulator, entityName) =>
                                                entityName ?
                                                        {...accumulator, [entityName]: errors[entityName]}
                                                :       accumulator,
                                        {} as FormErrors<T>
                                )
                        :       errors

                return !Array.isArray(namePaths) && namePaths ? err[namePaths] : err
        }) as FormStore<T>['getFieldsError']

        const getFieldsValue = ((namePaths?: NamePath<T>) => {
                const names = namePath(namePaths)
                const value =
                        names ?
                                getFieldEntitiesName()(names).reduce(
                                        (accumulator, entityName) =>
                                                entityName ?
                                                        {...accumulator, [entityName]: store[entityName]}
                                                :       accumulator,
                                        {} as T
                                )
                        :       store

                return !Array.isArray(namePaths) && namePaths ? value[namePaths] : value
        }) as FormStore<T>['getFieldsValue']

        const getInitialValues = ((namePaths?: NamePath<T>) => {
                const names = namePath(namePaths)
                const value =
                        names ?
                                getFieldEntitiesName()(names).reduce(
                                        (accumulator, entityName) =>
                                                entityName ?
                                                        {...accumulator, [entityName]: initialValues[entityName]}
                                                :       accumulator,
                                        {} as T
                                )
                        :       initialValues

                return !Array.isArray(namePaths) && namePaths ? value[namePaths] : value
        }) as FormStore<T>['getInitialValues']

        const isFieldsTouched = (namePaths?: NamePath<T>) => {
                const entities = getFieldEntities()
                const names = namePath(namePaths)
                const isFieldTouchedByName = (entityName?: keyof T) =>
                        entityName && entities.find(entity => entity.name === entityName)?.touched

                return getFieldEntitiesName()(names).map(isFieldTouchedByName).every(Boolean)
        }

        const resetFields = (namePaths?: NamePath<T>) => {
                const names = namePath(namePaths)
                const resetFormFieldByName = (entityName?: keyof T) => {
                        if (!entityName) {
                                return
                        }

                        setFieldsError()({[entityName]: undefined} as FormErrors<T>)
                        setFieldsValue({componentUpdate: true, enableValidate: false})({[entityName]: undefined} as T)
                }

                getFieldEntitiesName()(names).forEach(resetFormFieldByName)
        }

        const setCallbacks = (callbackValues: FormCallbacks<T>) => (callbacks = {...callbacks, ...callbackValues})
        const setFieldsError =
                (componentUpdate = false) =>
                (errs: FormErrors<T>) => {
                        errors = {...errors, ...errs}

                        if (componentUpdate) {
                                const entities = getFieldEntities()
                                const errKeys = Object.keys(errs) as (keyof T)[]

                                entities.forEach(
                                        entity =>
                                                entity.name &&
                                                errKeys.includes(entity.name) &&
                                                entity.onComponentUpdate()
                                )
                        }
                }

        const setFieldKeys = (keys?: (keyof T)[]) => keys && (fieldKeys = keys)
        const setFieldsValidate =
                (validatorOptions: FormValidatorOptions = {}) =>
                (validateRule: FormValidateRule<T>) => {
                        if (!isSignInFieldCompleted) {
                                return
                        }

                        const createNextValidator = (entity: FormFieldEntity<T>) =>
                                createFormFieldValidator<T>({
                                        rule: validateRule[entity.name],
                                        validatorOptions: {...validatorOptions, ...rawValidatorOptions}
                                })(entity.name)

                        const entities = getFieldEntities()
                        const ruleKeysSet = new Set(Object.keys(validateRule) as (keyof T)[])

                        fieldEntities = entities.reduce(
                                (accumulator, entity) =>
                                        entity.name && ruleKeysSet.has(entity.name) ?
                                                [...accumulator, {...entity, validate: createNextValidator(entity)}]
                                        :       accumulator,
                                [] as FormFieldEntity<T>[]
                        )

                        rawValidatorOptions ??= validatorOptions
                }

        const setFieldsTouched =
                (touched = false) =>
                (name?: keyof T) => {
                        if (!(name || isSignInFieldCompleted)) {
                                return
                        }

                        fieldEntities = [
                                ...getFieldEntities().map(entity =>
                                        entity.name === name ? {...entity, touched} : entity
                                )
                        ]
                }

        const updateStoreWithCallback =
                (onStoreChange?: (options: OnValuesChangeOptions<T>) => void) =>
                (values = {} as T) => {
                        store = {...store, ...values}

                        onStoreChange?.({changedValues: values, values: store})
                }

        const createFieldEntityUpdateHandler = (enableValidate = true) => {
                const findEntity = (name: keyof T) => getFieldEntities().find(entityItem => name === entityItem.name)

                return (value = {} as T) =>
                        async (name: keyof T) => {
                                const entity = findEntity(name)

                                if (!entity?.name) {
                                        return
                                }

                                updateStoreWithCallback()(value)

                                if (errors[name]) {
                                        setFieldsError()({[name]: undefined} as FormErrors<T>)
                                }

                                setFieldsTouched(true)(name)

                                if (enableValidate) {
                                        validateFields(name)

                                        return
                                }

                                entity.onComponentUpdate()
                        }
        }

        const createNotifyValuesChange =
                (values = {} as T) =>
                () =>
                        callbacks.onValuesChange?.({changedValues: values, values: store})

        const setFieldsValue =
                ({componentUpdate = true, enableValidate = true} = {} as SetFieldsValueOptions) =>
                (values = {} as T) => {
                        const {onValuesChange} = callbacks
                        const fieldEntityUpdateHandler = createFieldEntityUpdateHandler(enableValidate)(values)
                        const notifyValuesChange = createNotifyValuesChange(values)

                        if (componentUpdate) {
                                Promise.all(Object.keys(values).map(fieldEntityUpdateHandler)).then(notifyValuesChange)
                        } else {
                                updateStoreWithCallback(onValuesChange)(values)
                        }
                }

        const setInitialValues = (values = {} as T) => {
                initialValues = {...initialValues, ...values}
        }

        const signInField = (rawEntity: SignInFieldOptions<T>) => {
                const {name, validatorOptions, rule} = rawEntity

                if (!name) {
                        return
                }

                const entities = getFieldEntities(true)
                const exist = entities.find(entity => entity.name === name)

                if (exist) {
                        return
                }

                fieldEntities = [
                        ...entities,
                        {...rawEntity, validate: createFormFieldValidator<T>({rule, validatorOptions})(rawEntity.name)}
                ]

                setFieldsError()({[name]: undefined} as FormErrors<T>)
                setFieldsValue({componentUpdate: false, enableValidate: false})({[name]: initialValues[name]} as T)

                const fieldEntityNames = fieldEntities.map(entity => entity.name)
                const isAreArraysEqual =
                        fieldKeys?.length === fieldEntityNames.length &&
                        fieldKeys.every((key, index) => key === fieldEntityNames[index])

                if (isAreArraysEqual) {
                        isSignInFieldCompleted = true
                }

                return {
                        signOut: () => signOutFields(name)
                }
        }

        const signOutFields = (namePaths?: NamePath<T>) => {
                const entities = getFieldEntities(true)
                const names = namePath(namePaths)
                const signOutFormField = (signOutName?: keyof T) => {
                        if (!signOutName || !isSignInFieldCompleted) {
                                return
                        }

                        const fieldEntity = entities.find(entity => entity.name === signOutName)

                        if (!fieldEntity) {
                                return
                        }

                        const {[signOutName]: _signOutError, ...nextErrors} = errors
                        const {[signOutName]: _signOutStorage, ...nextFormValues} = store

                        setFieldsError()(nextErrors as FormErrors<T>)
                        setFieldsValue({componentUpdate: false, enableValidate: false})(nextFormValues as T)

                        fieldEntities = entities.filter(entity => entity.name !== signOutName)
                }

                getFieldEntitiesName()(names).forEach(signOutFormField)
        }

        const defaultValidateFields = (async (namePaths?: NamePath<T>) => {
                const entities = getFieldEntities()
                const names = namePath(namePaths)
                const validateFormField = async (entityName?: keyof T) => {
                        if (!entityName) {
                                return
                        }

                        const value = getFieldsValue(entityName)
                        const fieldEntity = entities.find(entity => entity.name === entityName)

                        return fieldEntity?.validate?.(value).then(error => {
                                const err = {[entityName]: error} as FormErrors<T>

                                setFieldsError(true)(err)

                                return err
                        })
                }

                const fieldErrors = await Promise.all(getFieldEntitiesName()(names).map(validateFormField))
                const errs = fieldErrors.reduce(
                        (accumulator, value) => ({...accumulator, ...value}),
                        {} as FormErrors<T>
                )

                return !Array.isArray(namePaths) && namePaths ? errs[namePaths] : errs
        }) as FormStore<T>['validateFields']

        const validateFields = rawValidateFields ?? defaultValidateFields
        const submit = (enableValidate = true) => {
                const {onFinish, onFinishFailed} = callbacks
                const triggerOnFinishFailed = (errs: FormErrors<T>) => onFinishFailed?.(errs)
                const triggerOnFinish = () => onFinish?.(store)

                if (!enableValidate) {
                        triggerOnFinish()

                        return
                }

                validateFields().then(result => {
                        const err = result as FormErrors<T>

                        if (Object.entries(err).some(([, value]) => value)) {
                                triggerOnFinishFailed(err)

                                return
                        }

                        triggerOnFinish()
                })
        }

        return {
                getFieldEntities,
                getFieldEntitiesName,
                getFieldsError,
                getFieldsValue,
                getInitialValues,
                isFieldsTouched,
                resetFields,
                setCallbacks,
                setFieldKeys,
                setFieldsError,
                setFieldsTouched,
                setFieldsValidate,
                setFieldsValue,
                setInitialValues,
                signInField,
                signOutFields,
                submit,
                validateFields
        }
}
