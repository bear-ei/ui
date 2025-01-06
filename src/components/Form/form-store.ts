import {validate, ValidationError} from 'class-validator'
import {asyncDebounce, NamePath, namePath} from '../../utils'
import {
        FormCallbacks,
        FormError,
        FormFieldEntity,
        FormStore,
        FormValidateRule,
        FormValidatorOptions,
        HandleFormValidateOptions,
        onValueChangeOptions
} from './Form.interface'

const createFormContext = <T>() => ({
        callback: {} as FormCallbacks<T>,
        error: {} as FormError<T>,
        fieldsEntities: [] as FormFieldEntity<T>[],
        initialValues: {} as T,
        store: {} as T
})

const handleFormValidate = <T>({rule, validatorOptions}: HandleFormValidateOptions) => {
        const {
                forbidNonWhitelisted = true,
                skipMissingProperties = true,
                whitelist = true,
                ...otherValidatorOptions
        } = validatorOptions ?? {}

        return (name?: keyof T) => async (value?: unknown) =>
                name && rule ?
                        validate(Object.assign(new rule(), {[name]: value}), {
                                forbidNonWhitelisted,
                                skipMissingProperties,
                                whitelist,
                                ...otherValidatorOptions
                        }).then(errors => (errors.length ? errors : undefined))
                :       ([] as ValidationError[])
}

export const formStore = <T extends Record<string, unknown> = Record<string, unknown>>(): FormStore<T> => {
        let {callback, error, fieldsEntities, initialValues, store} = createFormContext<T>()

        const getFieldEntities = (signOut = false) =>
                signOut ? fieldsEntities : fieldsEntities.filter(({name}) => name)

        const getFieldEntitiesName =
                (signOut = false) =>
                (names?: (keyof T)[]) => {
                        const entityNames = getFieldEntities(signOut).map(({name}) => name)

                        return [...(names ? entityNames.filter(name => name && names.includes(name)) : entityNames)]
                }

        const getFieldError = ((name?: NamePath<T>) => {
                const names = namePath(name)
                const err =
                        names ?
                                getFieldEntitiesName()(names).reduce(
                                        (accumulator, entityName) =>
                                                entityName ?
                                                        {...accumulator, [entityName]: error[entityName]}
                                                :       accumulator,
                                        {} as FormError<T>
                                )
                        :       error

                return !Array.isArray(name) && name ? err[name] : err
        }) as FormStore<T>['getFieldError']

        const getFieldValue = ((name?: NamePath<T>) => {
                const names = namePath(name)
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

                return !Array.isArray(name) && name ? value[name] : value
        }) as FormStore<T>['getFieldValue']

        const getInitialValue = ((name?: NamePath<T>) => {
                const names = namePath(name)
                const value =
                        names ?
                                getFieldEntitiesName()(names).reduce(
                                        (accumulator, entityName) =>
                                                entityName ?
                                                        {
                                                                ...accumulator,
                                                                [entityName]: initialValues[entityName]
                                                        }
                                                :       accumulator,
                                        {} as T
                                )
                        :       store

                return !Array.isArray(name) && name ? value[name] : value
        }) as FormStore<T>['getInitialValue']

        const isFieldTouched = (name?: NamePath<T>) => {
                const entities = getFieldEntities()
                const names = namePath(name)
                const handleFieldsTouched = (entityName?: keyof T) =>
                        entityName && entities.find(entity => entity.name === entityName)?.touched

                return getFieldEntitiesName()(names).map(handleFieldsTouched).every(Boolean)
        }

        const resetField = (name?: NamePath<T>) => {
                const names = namePath(name)
                const handleReset = (entityName?: keyof T) => {
                        if (!entityName) {
                                return
                        }

                        setFieldError()({[entityName]: undefined} as FormError<T>)
                        setFieldValue()({[entityName]: undefined} as T)
                }

                getFieldEntitiesName()(names).forEach(handleReset)
        }

        const setCallback = (callbackValue: FormCallbacks<T>) => (callback = {...callback, ...callbackValue})
        const setFieldError = (componentUpdate?: boolean) => (err: FormError<T>) => {
                error = {...error, ...err}

                if (componentUpdate) {
                        const entities = getFieldEntities()
                        const errKeys = Object.keys(err) as (keyof T)[]

                        entities.forEach(entity => {
                                if (entity.name && errKeys.includes(entity.name)) {
                                        entity.onComponentUpdate()
                                }
                        })
                }
        }

        const setFieldValidate =
                ({delay = 300, ...validatorOptions}: FormValidatorOptions = {}) =>
                (validateRule: FormValidateRule<T>) => {
                        const entities = getFieldEntities()
                        const ruleKeys = Object.keys(validateRule) as (keyof T)[]

                        fieldsEntities = entities.reduce((accumulator, entity) => {
                                if (entity.name && ruleKeys.includes(entity.name)) {
                                        const asyncDebouncedValidate = asyncDebounce(
                                                handleFormValidate<T>({
                                                        rule: validateRule[entity.name],
                                                        validatorOptions
                                                })(entity.name)
                                        )(delay) as (value?: unknown) => Promise<ValidationError[] | undefined>

                                        return [...accumulator, {...entity, validate: asyncDebouncedValidate}]
                                }

                                return accumulator
                        }, [] as FormFieldEntity<T>[])
                }

        const setFieldTouched =
                (touched = false) =>
                (name?: keyof T) => {
                        if (!name) {
                                return
                        }

                        fieldsEntities = [
                                ...getFieldEntities().map(entity =>
                                        entity.name === name ? {...entity, touched} : entity
                                )
                        ]
                }

        const handleStoreUpdate =
                (onStorageChange?: (options: onValueChangeOptions<T>) => void) =>
                (value = {} as T) => {
                        store = {...store, ...value}
                        onStorageChange?.({changedValue: value, value: store})
                }

        const handleComponentUpdate =
                (value = {} as T) =>
                async (name: keyof T) => {
                        const entities = getFieldEntities()
                        const entity = entities.find(entityItem => name === entityItem.name)

                        if (!entity?.name) {
                                return
                        }

                        handleStoreUpdate()(value)

                        if (error[name]) {
                                setFieldError()({[name]: undefined} as FormError<T>)
                        }

                        setFieldTouched(true)(name)

                        entity.onComponentUpdate()
                }

        const handleValueChange =
                (value = {} as T) =>
                () =>
                        callback.onValueChange?.({changedValue: value, value: store})

        const setFieldValue =
                (componentUpdate = true) =>
                (value = {} as T) => {
                        const {onValueChange} = callback
                        const handleChange = handleValueChange(value)
                        const handleUpdate = handleComponentUpdate(value)

                        if (componentUpdate) {
                                Promise.all(Object.keys(value).map(handleUpdate)).then(handleChange)
                        } else {
                                handleStoreUpdate(onValueChange)(value)
                        }
                }

        const setInitialValue =
                (initialized?: boolean) =>
                (value = {} as T) => {
                        if (initialized) {
                                return
                        }

                        initialValues = {...initialValues, ...value}
                }

        const signInField = (rawEntity: FormFieldEntity<T>) => {
                const {name, validatorOptions, rule} = rawEntity
                const {delay = 300, ...restValidatorOptions} = validatorOptions ?? {}

                if (!name) {
                        return
                }

                const entities = getFieldEntities(true)
                const exist = entities.find(entity => entity.name === name)

                if (exist) {
                        return
                }

                const asyncDebouncedValidate = asyncDebounce(
                        handleFormValidate<T>({
                                rule: rule,
                                validatorOptions: restValidatorOptions
                        })(rawEntity.name)
                )(delay) as (value?: unknown) => Promise<ValidationError[] | undefined>

                fieldsEntities = [...entities, {...rawEntity, validate: asyncDebouncedValidate}]

                setFieldError()({[name]: undefined} as FormError<T>)
                setFieldValue(false)({[name]: initialValues[name]} as T)

                return {
                        signOut: () => signOutField(name)
                }
        }

        const signOutField = (name?: NamePath<T>) => {
                const entities = getFieldEntities(true)
                const names = namePath(name)
                const handleSignOut = (signOutName?: keyof T) => {
                        if (!signOutName) {
                                return
                        }

                        const fieldEntity = entities.find(entity => entity.name === signOutName)

                        if (!fieldEntity) {
                                return
                        }

                        const {[signOutName]: _signOutError, ...nextError} = error
                        const {[signOutName]: _signOutStorage, ...nextFormStore} = store

                        setFieldError()(nextError as FormError<T>)
                        setFieldValue(false)(nextFormStore as T)

                        fieldsEntities = entities.filter(entity => entity.name !== signOutName)
                }

                getFieldEntitiesName()(names).forEach(handleSignOut)
        }

        const submit = (skipValidate?: boolean) => {
                const {onFinish, onFinishFailed} = callback
                const handleFailed = (err: FormError<T>) => onFinishFailed?.(err)
                const handleFinish = () => onFinish?.(store)

                if (skipValidate) {
                        handleFinish()
                } else {
                        validateField().then(err =>
                                Object.entries(err).some(([, value]) => value) ? handleFailed(err) : handleFinish()
                        )
                }
        }

        const validateField = (async (name?: NamePath<T>) => {
                const entities = getFieldEntities()
                const names = namePath(name)
                const handleValidate = async (entityName?: keyof T) => {
                        if (!entityName) {
                                return
                        }

                        const value = getFieldValue(entityName)
                        const fieldEntity = entities.find(entity => entity.name === entityName)

                        return fieldEntity?.validate?.(value).then(errors => {
                                const err = {[entityName]: errors} as FormError<T>

                                setFieldError(true)(err)

                                return err
                        })
                }

                const fieldErrors = await Promise.all(getFieldEntitiesName()(names).map(handleValidate))
                const err = fieldErrors.reduce(
                        (accumulator, currentValue) => ({...accumulator, ...currentValue}),
                        {} as FormError<T>
                )

                return !Array.isArray(name) && name ? err[name] : err
        }) as FormStore<T>['validateField']

        return {
                getFieldEntities,
                getFieldEntitiesName,
                getFieldError,
                getFieldValue,
                getInitialValue,
                isFieldTouched,
                resetField,
                setCallback,
                setFieldError,
                setFieldTouched,
                setFieldValidate,
                setFieldValue,
                setInitialValue,
                signInField,
                signOutField,
                submit,
                validateField
        }
}
