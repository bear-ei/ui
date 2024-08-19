import {NamePath, namePath} from '../../util'
import {
    FormCallback,
    FormError,
    FormFieldEntity,
    FormFieldError,
    FormStorage,
    OnValueChangeOptions
} from './Form.interface'

const createFormContext = <T>() => ({
    callback: {} as FormCallback<T>,
    error: {} as FormError<T>,
    fieldEntities: [] as FormFieldEntity[],
    initialValue: {} as T,
    storage: {} as T
})

export const formStorage = <T extends Record<string, unknown> = Record<string, unknown>>(): FormStorage<T> => {
    let {callback, error, fieldEntities, initialValue, storage} = createFormContext<T>()

    const getFieldEntities = (signOut = false) =>
        signOut ? fieldEntities : fieldEntities.filter(fieldEntity => fieldEntity.props.name)

    const getFieldEntitiesName =
        (signOut = false) =>
        (names?: (keyof T)[]) => {
            const entityNames = getFieldEntities(signOut).map(({props}) => props.name)

            return [...(names ? entityNames.filter(name => name && names.includes(name)) : entityNames)]
        }

    const getFieldError = ((name?: NamePath<T>) => {
        let err = {} as FormError<T>
        const names = namePath(name)
        const handleError = (entityName?: keyof T) => entityName && (err = {...err, [entityName]: error[entityName]})

        names && getFieldEntitiesName()(names).forEach(handleError)
        !names && (err = {...err, ...error})

        return !Array.isArray(name) && name ? err[name] : err
    }) as FormStorage<T>['getFieldError']

    const getFieldValue = ((name?: NamePath<T>) => {
        let value = {} as T
        const names = namePath(name)
        const handleValue = (entityName?: keyof T) =>
            entityName && (value = {...value, [entityName]: storage[entityName]})

        names && getFieldEntitiesName()(names).forEach(handleValue)
        !names && (value = {...value, ...storage})

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStorage<T>['getFieldValue']

    const getInitialValue = ((name?: NamePath<T>) => {
        let value = {} as T
        const names = namePath(name)
        const handleValue = (entityName?: keyof T) =>
            entityName && (value = {...value, [entityName]: initialValue[entityName]})

        names && getFieldEntitiesName()(names).forEach(handleValue)
        !names && (value = {...value, ...storage})

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStorage<T>['getInitialValue']

    const isFieldTouched = (name?: NamePath<T>) => {
        const names = namePath(name)
        const entities = getFieldEntities()
        const handleFieldTouched = (entityName?: keyof T) =>
            entityName && entities.find(({props}) => props.name === entityName)?.touched

        return getFieldEntitiesName()(names).map(handleFieldTouched).every(Boolean)
    }

    const resetField = (name?: NamePath<T>) => {
        const names = namePath(name)
        const handleReset = (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            setFieldValue(true)()({[entityName]: undefined} as T)
            setFieldError({[entityName]: undefined} as FormError<T>)
        }

        getFieldEntitiesName()(names).forEach(handleReset)
    }

    const setCallback = (callbackValue: FormCallback<T>) => (callback = {...callback, ...callbackValue})
    const setFieldError = (err: FormError<T>) => (error = {...error, ...err})
    const setFieldTouched =
        (touched = false) =>
        (name?: keyof T) => {
            if (!name) {
                return
            }

            fieldEntities = [
                ...getFieldEntities().map(fieldEntity =>
                    fieldEntity.props.name === name ? {...fieldEntity, touched} : fieldEntity
                )
            ]
        }

    const handleStorageUpdate =
        (onStorageChange?: (options: OnValueChangeOptions<T>) => void) =>
        (value = {} as T) => {
            storage = {...storage, ...value}
            onStorageChange?.({changedValue: value, value: storage})
        }

    const handleValidateResult =
        (entity: FormFieldEntity) =>
        (value = {} as T) =>
        (err?: FormFieldError) => {
            const name = entity.props.name

            if (!name) {
                return
            }

            handleStorageUpdate()(value)
            setFieldError({[name]: err} as FormError<T>)
            setFieldTouched(true)(name)

            entity.onFormStorageChange()
        }

    const handleFindEntity =
        (name: keyof T) =>
        ({props}: FormFieldEntity) =>
            props.name === name

    const handleItemUpdate =
        (skipValidate?: boolean) =>
        (value = {} as T) =>
        async (name: keyof T) => {
            const entities = getFieldEntities()
            const findEntity = handleFindEntity(name)
            const entity = entities.find(findEntity)

            if (!entity) {
                return
            }

            const handleResult = handleValidateResult(entity)(value)

            skipValidate ? handleResult() : await entity.validate(value[entity.props.name!]).then(handleResult)
        }

    const handleValueChange =
        (value = {} as T) =>
        () => {
            const {onValueChange} = callback
            onValueChange?.({changedValue: value, value: storage})
        }

    const setFieldValue =
        (skipValidate = false) =>
        (updateItem = true) =>
        (value = {} as T) => {
            const {onValueChange} = callback
            const handleUpdate = handleItemUpdate(skipValidate)(value)
            const handleChange = handleValueChange(value)

            updateItem ?
                Promise.all(Object.keys(value).map(handleUpdate)).then(handleChange)
            :   handleStorageUpdate(onValueChange)(value)
        }

    const setInitialValue =
        (initialized?: boolean) =>
        (value = {} as T) => {
            if (initialized) {
                return
            }

            initialValue = {...initialValue, ...value}
        }

    const signInField = (entity: FormFieldEntity) => {
        const {name} = entity.props

        if (!name) {
            return
        }

        const entities = getFieldEntities(true)
        const exist = entities.find(({props}) => props.name === name)

        if (exist) {
            return
        }

        fieldEntities = [...entities, entity]

        setFieldValue()(false)({[name]: initialValue[name]} as T)
        setFieldError({[name]: undefined} as FormError<T>)

        return {
            signOut: () => signOutField(name)
        }
    }

    const signOutField = (name?: NamePath<T>) => {
        const names = namePath(name)
        const entities = getFieldEntities(true)
        const handleSignOut = (signOutName?: keyof T) => {
            if (!signOutName) {
                return
            }

            const fieldEntity = entities.find(({props}) => props.name === signOutName)

            if (!fieldEntity) {
                return
            }

            const {[signOutName]: _signOutError, ...nextError} = error
            const {[signOutName]: _signOutStorage, ...nextFormStorage} = storage

            setFieldValue()(false)(nextFormStorage as T)
            setFieldError(nextError as FormError<T>)

            fieldEntities = entities.filter(({props}) => props.name !== signOutName)
        }

        getFieldEntitiesName()(names).forEach(handleSignOut)
    }

    const submit = (skipValidate?: boolean) => {
        const {onFinish, onFinishFailed} = callback
        const handleFailed = (err: FormError<T>) => onFinishFailed?.(err)
        const handleFinish = () => onFinish?.(storage)

        skipValidate ? handleFinish() : (
            validateField().then(err => {
                Object.entries(err).some(([, value]) => value) ? handleFailed(err) : handleFinish()
            })
        )
    }

    const validateField = (async (name?: NamePath<T>) => {
        const names = namePath(name)
        const entities = getFieldEntities()
        const handleValidate = async (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            const value = getFieldValue(entityName)
            const entity = entities.find(({props}) => props.name === entityName)

            return entity?.validate(value).then(err => {
                setFieldError({[entityName]: err} as FormError<T>)
                err && entity.onFormStorageChange()

                return err
            })
        }

        const handleFieldError = (fieldErrors: (FormFieldError | undefined)[]) => {
            let err = {} as FormError<T>

            fieldErrors.forEach(fieldError => {
                const field = fieldError?.errors[0].field

                field && (err = {...err, [field]: fieldError})
            })

            return !Array.isArray(name) && name ? err[name] : err
        }

        const fieldError = await Promise.all(getFieldEntitiesName()(names).map(handleValidate))

        return handleFieldError(fieldError)
    }) as FormStorage<T>['validateField']

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
        setFieldValue,
        setInitialValue,
        signInField,
        signOutField,
        submit,
        validateField
    }
}
