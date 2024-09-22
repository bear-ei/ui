import {ValidationError} from 'class-validator'
import {NamePath, namePath} from '../../util'
import {FormCallback, FormError, FormFieldEntity, FormStorage, OnValueChangeOptions} from './Form.interface'

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
        const processError = (entityName?: keyof T) => entityName && (err = {...err, [entityName]: error[entityName]})

        names && getFieldEntitiesName()(names).forEach(processError)
        !names && (err = {...err, ...error})

        return !Array.isArray(name) && name ? err[name] : err
    }) as FormStorage<T>['getFieldError']

    const getFieldValue = ((name?: NamePath<T>) => {
        let value = {} as T
        const names = namePath(name)
        const processValue = (entityName?: keyof T) =>
            entityName && (value = {...value, [entityName]: storage[entityName]})

        names && getFieldEntitiesName()(names).forEach(processValue)
        !names && (value = {...value, ...storage})

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStorage<T>['getFieldValue']

    const getInitialValue = ((name?: NamePath<T>) => {
        let value = {} as T
        const names = namePath(name)
        const processValue = (entityName?: keyof T) =>
            entityName && (value = {...value, [entityName]: initialValue[entityName]})

        names && getFieldEntitiesName()(names).forEach(processValue)
        !names && (value = {...value, ...storage})

        return !Array.isArray(name) && name ? value[name] : value
    }) as FormStorage<T>['getInitialValue']

    const isFieldTouched = (name?: NamePath<T>) => {
        const names = namePath(name)
        const entities = getFieldEntities()
        const processFieldTouched = (entityName?: keyof T) =>
            entityName && entities.find(({props}) => props.name === entityName)?.touched

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
                ...getFieldEntities().map(fieldEntity =>
                    fieldEntity.props.name === name ? {...fieldEntity, touched} : fieldEntity
                )
            ]
        }

    const processStorageUpdate =
        (onStorageChange?: (options: OnValueChangeOptions<T>) => void) =>
        (value = {} as T) => {
            storage = {...storage, ...value}
            onStorageChange?.({changedValue: value, value: storage})
        }

    const processValidateResult =
        (entity: FormFieldEntity) =>
        (value = {} as T) =>
        (err?: ValidationError[]) => {
            const name = entity.props.name

            if (!name) {
                return
            }

            processStorageUpdate()(value)
            setFieldError({[name]: err} as FormError<T>)
            setFieldTouched(true)(name)

            entity.onFormStorageChange()
        }

    const processFindEntity =
        (name: keyof T) =>
        ({props}: FormFieldEntity) =>
            props.name === name

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

            skipValidate ? processResult() : await entity.validate(value[entity.props.name!]).then(processResult)
        }

    const processValueChange =
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
            const processUpdate = processItemUpdate(skipValidate)(value)
            const processChange = processValueChange(value)

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
        const processSignOut = (signOutName?: keyof T) => {
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
        const names = namePath(name)
        const entities = getFieldEntities()
        const processValidate = async (entityName?: keyof T) => {
            if (!entityName) {
                return
            }

            const value = getFieldValue(entityName)
            const entity = entities.find(({props}) => props.name === entityName)

            return entity?.validate(value).then(errors => {
                const err = {[entityName]: errors} as FormError<T>

                setFieldError(err)
                errors && entity.onFormStorageChange()

                return err
            })
        }

        const fieldErrors = await Promise.all(getFieldEntitiesName()(names).map(processValidate))

        return fieldErrors.reduce((accumulator, currentValue) => ({...accumulator, ...currentValue}), {})
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
