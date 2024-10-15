import {NamePath, namePath} from '../../utils'
import {FormCallbacks, FormError, FormFieldsEntity, FormStore, OnValuesChangeOptions} from './Form.interface'

const createFormContext = <T>() => ({
    callback: {} as FormCallbacks<T>,
    error: {} as FormError<T>,
    fieldEntities: [] as FormFieldsEntity<T>[],
    initialValues: {} as T,
    store: {} as T
})

export const formStore = <T extends Record<string, unknown> = Record<string, unknown>>(): FormStore<T> => {
    let {callback, error, fieldEntities, initialValues, store} = createFormContext<T>()

    const getFieldsEntities = (signOut = false) => (signOut ? fieldEntities : fieldEntities.filter(({name}) => name))
    const getFieldsEntitiesName =
        (signOut = false) =>
        (names?: (keyof T)[]) => {
            const entityNames = getFieldsEntities(signOut).map(({name}) => name)

            return [...(names ? entityNames.filter(name => name && names.includes(name)) : entityNames)]
        }

    const getFieldsError = ((name?: NamePath<T>) => {
        const names = namePath(name)
        const err =
            names ?
                getFieldsEntitiesName()(names).reduce(
                    (accumulator, entityName) =>
                        entityName ? {...accumulator, [entityName]: error[entityName]} : accumulator,
                    {} as FormError<T>
                )
            :   error

        return !Array.isArray(name) && name ? err[name] : err
    }) as FormStore<T>['getFieldsError']

    const getFieldsValue = ((name?: NamePath<T>) => {
        const names = namePath(name)
        const value =
            names ?
                getFieldsEntitiesName()(names).reduce(
                    (accumulator, entityName) =>
                        entityName ? {...accumulator, [entityName]: store[entityName]} : accumulator,
                    {} as T
                )
            :   store

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStore<T>['getFieldsValue']

    const getInitialValues = ((name?: NamePath<T>) => {
        const names = namePath(name)
        const value =
            names ?
                getFieldsEntitiesName()(names).reduce(
                    (accumulator, entityName) =>
                        entityName ? {...accumulator, [entityName]: initialValues[entityName]} : accumulator,
                    {} as T
                )
            :   store

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStore<T>['getInitialValues']

    const isFieldsTouched = (name?: NamePath<T>) => {
        const entities = getFieldsEntities()
        const names = namePath(name)
        const handleFieldsTouched = (entityName?: keyof T) =>
            entityName && entities.find(entity => entity.name === entityName)?.touched

        return getFieldsEntitiesName()(names).map(handleFieldsTouched).every(Boolean)
    }

    const resetFields = (name?: NamePath<T>) => {
        const names = namePath(name)
        const handleReset = (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            setFieldsError()({[entityName]: undefined} as FormError<T>)
            setFieldsValue()({[entityName]: undefined} as T)
        }

        getFieldsEntitiesName()(names).forEach(handleReset)
    }

    const setCallbacks = (callbackValue: FormCallbacks<T>) => (callback = {...callback, ...callbackValue})
    const setFieldsError = (componentUpdate?: boolean) => (err: FormError<T>) => {
        error = {...error, ...err}

        if (componentUpdate) {
            const entities = getFieldsEntities()
            const errKeys = Object.keys(err) as (keyof T)[]

            entities.forEach(entity => entity.name && errKeys.includes(entity.name) && entity.onComponentUpdate())
        }
    }

    const setFieldsTouched =
        (touched = false) =>
        (name?: keyof T) => {
            if (!name) {
                return
            }

            fieldEntities = [
                ...getFieldsEntities().map(entity => (entity.name === name ? {...entity, touched} : entity))
            ]
        }

    const handleStoreUpdate =
        (onStorageChange?: (options: OnValuesChangeOptions<T>) => void) =>
        (value = {} as T) => {
            store = {...store, ...value}
            onStorageChange?.({changedValue: value, value: store})
        }

    const handleComponentUpdate =
        (value = {} as T) =>
        async (name: keyof T) => {
            const entities = getFieldsEntities()
            const entity = entities.find(entityItem => name === entityItem.name)

            if (!entity?.name) {
                return
            }

            handleStoreUpdate()(value)

            if (error[name]) {
                setFieldsError()({[name]: undefined} as FormError<T>)
            }

            setFieldsTouched(true)(name)

            entity.onComponentUpdate()
        }

    const handleValueChange =
        (value = {} as T) =>
        () =>
            callback.onValuesChange?.({changedValue: value, value: store})

    const setFieldsValue =
        (componentUpdate = true) =>
        (value = {} as T) => {
            const {onValuesChange} = callback
            const handleChange = handleValueChange(value)
            const handleUpdate = handleComponentUpdate(value)

            if (componentUpdate) {
                Promise.all(Object.keys(value).map(handleUpdate)).then(handleChange)
            } else {
                handleStoreUpdate(onValuesChange)(value)
            }
        }

    const setInitialValues =
        (initialized?: boolean) =>
        (value = {} as T) => {
            if (initialized) {
                return
            }

            initialValues = {...initialValues, ...value}
        }

    const signInFields = (rawEntity: FormFieldsEntity<T>) => {
        const {name} = rawEntity

        if (!name) {
            return
        }

        const entities = getFieldsEntities(true)
        const exist = entities.find(entity => entity.name === name)

        if (exist) {
            return
        }

        fieldEntities = [...entities, rawEntity]

        setFieldsError()({[name]: undefined} as FormError<T>)
        setFieldsValue(false)({[name]: initialValues[name]} as T)

        return {
            signOut: () => signOutFields(name)
        }
    }

    const signOutFields = (name?: NamePath<T>) => {
        const entities = getFieldsEntities(true)
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

            setFieldsError()(nextError as FormError<T>)
            setFieldsValue(false)(nextFormStore as T)

            fieldEntities = entities.filter(entity => entity.name !== signOutName)
        }

        getFieldsEntitiesName()(names).forEach(handleSignOut)
    }

    const submit = (skipValidate?: boolean) => {
        const {onFinish, onFinishFailed} = callback
        const handleFailed = (err: FormError<T>) => onFinishFailed?.(err)
        const handleFinish = () => onFinish?.(store)

        if (skipValidate) {
            handleFinish()
        } else {
            validateFields().then(err =>
                Object.entries(err).some(([, value]) => value) ? handleFailed(err) : handleFinish()
            )
        }
    }

    const validateFields = (async (name?: NamePath<T>) => {
        const entities = getFieldsEntities()
        const names = namePath(name)
        const handleValidate = async (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            const value = getFieldsValue(entityName)
            const fieldEntity = entities.find(entity => entity.name === entityName)

            return fieldEntity?.validate(value).then(errors => {
                const err = {[entityName]: errors} as FormError<T>

                setFieldsError(true)(err)

                return err
            })
        }

        const fieldErrors = await Promise.all(getFieldsEntitiesName()(names).map(handleValidate))
        const err = fieldErrors.reduce(
            (accumulator, currentValue) => ({...accumulator, ...currentValue}),
            {} as FormError<T>
        )

        return !Array.isArray(name) && name ? err[name] : err
    }) as FormStore<T>['validateFields']

    return {
        getFieldsEntities,
        getFieldsEntitiesName,
        getFieldsError,
        getFieldsValue,
        getInitialValues,
        isFieldsTouched,
        resetFields,
        setCallbacks,
        setFieldsError,
        setFieldsTouched,
        setFieldsValue,
        setInitialValues,
        signInFields,
        signOutFields,
        submit,
        validateFields
    }
}
