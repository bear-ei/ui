import {ValidationError} from 'class-validator'
import {NamePath, namePath} from '../../util'
import {FormCallback, FormError, FormFieldEntity, FormStorage, OnValueChangeOptions} from './Form.interface'

const createFormContext = <T>() => ({
    callback: {} as FormCallback<T>,
    error: {} as FormError<T>,
    fieldEntities: [] as FormFieldEntity<T>[],
    initialValue: {} as T,
    storage: {} as T
})

export const formStorage = <T extends Record<string, unknown> = Record<string, unknown>>(): FormStorage<T> => {
    let {callback, error, fieldEntities, initialValue, storage} = createFormContext<T>()

    const getFieldEntities = (signOut = false) => (signOut ? fieldEntities : fieldEntities.filter(({name}) => name))
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
                        entityName ? {...accumulator, [entityName]: error[entityName]} : accumulator,
                    {} as FormError<T>
                )
            :   error

        return !Array.isArray(name) && name ? err[name] : err
    }) as FormStorage<T>['getFieldError']

    const getFieldValue = ((name?: NamePath<T>) => {
        const names = namePath(name)
        const value =
            names ?
                getFieldEntitiesName()(names).reduce(
                    (accumulator, entityName) =>
                        entityName ? {...accumulator, [entityName]: storage[entityName]} : accumulator,
                    {} as T
                )
            :   storage

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStorage<T>['getFieldValue']

    const getInitialValue = ((name?: NamePath<T>) => {
        const names = namePath(name)
        const value =
            names ?
                getFieldEntitiesName()(names).reduce(
                    (accumulator, entityName) =>
                        entityName ? {...accumulator, [entityName]: initialValue[entityName]} : accumulator,
                    {} as T
                )
            :   storage

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStorage<T>['getInitialValue']

    const isFieldTouched = (name?: NamePath<T>) => {
        const entities = getFieldEntities()
        const names = namePath(name)
        const processFieldTouched = (entityName?: keyof T) =>
            entityName && entities.find(entity => entity.name === entityName)?.touched

        return getFieldEntitiesName()(names).map(processFieldTouched).every(Boolean)
    }

    const resetField = (name?: NamePath<T>) => {
        const names = namePath(name)
        const processReset = (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            setFieldValue(true)()({[entityName]: undefined} as T)
            setFieldError({[entityName]: undefined} as FormError<T>)
        }

        getFieldEntitiesName()(names).forEach(processReset)
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
                ...getFieldEntities().map(entity => (entity.name === name ? {...entity, touched} : entity))
            ]
        }

    const processStorageUpdate =
        (onStorageChange?: (options: OnValueChangeOptions<T>) => void) =>
        (value = {} as T) => {
            storage = {...storage, ...value}
            onStorageChange?.({changedValue: value, value: storage})
        }

    const processValidateResult =
        (entity: FormFieldEntity<T>) =>
        (value = {} as T) =>
        (errors?: ValidationError[]) => {
            const {name} = entity

            if (!name) {
                return
            }

            processStorageUpdate()(value)
            setFieldError({[name]: errors} as FormError<T>)
            setFieldTouched(true)(name)

            entity.onFormStorageChange()
        }

    const processFindEntity =
        (rawName: keyof T) =>
        ({name}: FormFieldEntity<T>) =>
            name === rawName

    const processItemUpdate =
        (skipValidate?: boolean) =>
        (value = {} as T) =>
        async (name: keyof T) => {
            const entities = getFieldEntities()
            const findEntity = processFindEntity(name)
            const entity = entities.find(findEntity)

            if (!entity) {
                return
            }

            const processResult = processValidateResult(entity)(value)

            skipValidate ? processResult() : await entity.validate(value[entity.name!]).then(processResult)
        }

    const processValueChange =
        (value = {} as T) =>
        () =>
            callback.onValueChange?.({changedValue: value, value: storage})

    const setFieldValue =
        (skipValidate = false) =>
        (updateItem = true) =>
        (value = {} as T) => {
            const {onValueChange} = callback
            const processChange = processValueChange(value)
            const processUpdate = processItemUpdate(skipValidate)(value)

            updateItem ?
                Promise.all(Object.keys(value).map(processUpdate)).then(processChange)
            :   processStorageUpdate(onValueChange)(value)
        }

    const setInitialValue =
        (initialized?: boolean) =>
        (value = {} as T) => {
            if (initialized) {
                return
            }

            initialValue = {...initialValue, ...value}
        }

    const signInField = (rawEntity: FormFieldEntity<T>) => {
        const {name} = rawEntity

        if (!name) {
            return
        }

        const entities = getFieldEntities(true)
        const exist = entities.find(entity => entity.name === name)

        if (exist) {
            return
        }

        fieldEntities = [...entities, rawEntity]

        setFieldValue()(false)({[name]: initialValue[name]} as T)
        setFieldError({[name]: undefined} as FormError<T>)

        return {
            signOut: () => signOutField(name)
        }
    }

    const signOutField = (name?: NamePath<T>) => {
        const entities = getFieldEntities(true)
        const names = namePath(name)
        const processSignOut = (signOutName?: keyof T) => {
            if (!signOutName) {
                return
            }

            const fieldEntity = entities.find(entity => entity.name === signOutName)

            if (!fieldEntity) {
                return
            }

            const {[signOutName]: _signOutError, ...nextError} = error
            const {[signOutName]: _signOutStorage, ...nextFormStorage} = storage

            setFieldValue()(false)(nextFormStorage as T)
            setFieldError(nextError as FormError<T>)

            fieldEntities = entities.filter(entity => entity.name !== signOutName)
        }

        getFieldEntitiesName()(names).forEach(processSignOut)
    }

    const submit = (skipValidate?: boolean) => {
        const {onFinish, onFinishFailed} = callback
        const processFailed = (err: FormError<T>) => onFinishFailed?.(err)
        const processFinish = () => onFinish?.(storage)

        skipValidate ? processFinish() : (
            validateField().then(err => {
                Object.entries(err).some(([, value]) => value) ? processFailed(err) : processFinish()
            })
        )
    }

    const validateField = (async (name?: NamePath<T>) => {
        const entities = getFieldEntities()
        const names = namePath(name)
        const processValidate = async (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            const value = getFieldValue(entityName)
            const fieldEntity = entities.find(entity => entity.name === entityName)

            return fieldEntity?.validate(value).then(errors => {
                const err = {[entityName]: errors} as FormError<T>

                setFieldError(err)
                errors && fieldEntity.onFormStorageChange()

                return err
            })
        }

        const fieldErrors = await Promise.all(getFieldEntitiesName()(names).map(processValidate))
        const err = fieldErrors.reduce(
            (accumulator, currentValue) => ({...accumulator, ...currentValue}),
            {} as FormError<T>
        )

        return !Array.isArray(name) && name ? err[name] : err
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
