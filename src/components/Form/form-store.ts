import {ValidationError} from 'class-validator'
import type {NamePath} from '../../utils'
import {asyncDebounce, namePath} from '../../utils'
import {handleFormValidate} from './Form-handle'
import type {
	FormCallback,
	FormError,
	FormFieldEntity,
	FormStore,
	FormValidateRule,
	FormValidatorOptions,
	OnValuesChangeOptions,
	SetFieldsValueOptions
} from './Form.interface'

const createFormContext = <T>() => ({
	callback: {} as FormCallback<T>,
	error: {} as FormError<T>,
	fieldEntities: [] as FormFieldEntity<T>[],
	fieldKeys: [] as (keyof T)[],
	initialValue: {} as T,
	signInFieldCompleted: false,
	store: {} as T,
	validatorOptions: undefined as FormValidatorOptions | undefined
})

export const formStore = <T extends Record<string, unknown> = Record<string, unknown>>() => {
	let {
		callback,
		error,
		fieldEntities,
		fieldKeys,
		initialValue,
		signInFieldCompleted: isSignInFieldCompleted,
		store,
		validatorOptions
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
							{...accumulator, [entityName]: error[entityName]}
						:	accumulator,
					{} as FormError<T>
				)
			:	error

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
						:	accumulator,
					{} as T
				)
			:	store

		return !Array.isArray(namePaths) && namePaths ? value[namePaths] : value
	}) as FormStore<T>['getFieldsValue']

	const getInitialValues = ((namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const value =
			names ?
				getFieldEntitiesName()(names).reduce(
					(accumulator, entityName) =>
						entityName ?
							{
								...accumulator,
								[entityName]: initialValue[entityName]
							}
						:	accumulator,
					{} as T
				)
			:	store

		return !Array.isArray(namePaths) && namePaths ? value[namePaths] : value
	}) as FormStore<T>['getInitialValues']

	const isFieldsTouched = (namePaths?: NamePath<T>) => {
		const entities = getFieldEntities()
		const names = namePath(namePaths)
		const handleFieldsTouched = (entityName?: keyof T) =>
			entityName && entities.find(entity => entity.name === entityName)?.touched

		return getFieldEntitiesName()(names).map(handleFieldsTouched).every(Boolean)
	}

	const resetFields = (namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const handleReset = (entityName?: keyof T) => {
			if (!entityName) {
				return
			}

			setFieldsError()({[entityName]: undefined} as FormError<T>)
			setFieldsValue({componentUpdate: true, skipValidate: true})({[entityName]: undefined} as T)
		}

		getFieldEntitiesName()(names).forEach(handleReset)
	}

	const setCallbacks = (callbackValues: FormCallback<T>) => (callback = {...callback, ...callbackValues})
	const setFieldsError =
		(componentUpdate = false) =>
		(err: FormError<T>) => {
			error = {...error, ...err}

			if (componentUpdate) {
				const entities = getFieldEntities()
				const errKeys = Object.keys(err) as (keyof T)[]

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
		({delay = 300, ...restValidatorOptions}: FormValidatorOptions = {}) =>
		(validateRule: FormValidateRule<T>) => {
			if (!isSignInFieldCompleted) {
				return
			}

			const entities = getFieldEntities()
			const ruleKeysSet = new Set(Object.keys(validateRule) as (keyof T)[])

			fieldEntities = entities.reduce(
				(accumulator, entity) =>
					entity.name && ruleKeysSet.has(entity.name) ?
						[
							...accumulator,
							{
								...entity,
								validate: asyncDebounce(
									handleFormValidate<T>({
										rule: validateRule[entity.name],
										validatorOptions: {
											...restValidatorOptions,
											...validatorOptions
										}
									})(entity.name)
								)(delay) as (
									value?: unknown
								) => Promise<ValidationError[] | undefined>
							}
						]
					:	accumulator,
				[] as FormFieldEntity<T>[]
			)

			validatorOptions ??= restValidatorOptions
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

	const handleStoreUpdate =
		(onStorageChange?: (options: OnValuesChangeOptions<T>) => void) =>
		(value = {} as T) => {
			store = {...store, ...value}
			onStorageChange?.({changedValue: value, value: store})
		}

	const handleComponentUpdate = (skipValidate = false) => {
		const findEntity = (name: keyof T) => getFieldEntities().find(entityItem => name === entityItem.name)

		return (value = {} as T) =>
			async (name: keyof T) => {
				const entity = findEntity(name)

				if (!entity?.name) {
					return
				}

				handleStoreUpdate()(value)

				if (error[name]) {
					setFieldsError()({[name]: undefined} as FormError<T>)
				}

				setFieldsTouched(true)(name)

				if (!skipValidate) {
					validateFields(name)

					return
				}

				entity.onComponentUpdate()
			}
	}

	const handleValueChange =
		(value = {} as T) =>
		() =>
			callback.onValuesChange?.({changedValue: value, value: store})

	const setFieldsValue =
		({componentUpdate = true, skipValidate = false} = {} as SetFieldsValueOptions) =>
		(value = {} as T) => {
			const {onValuesChange} = callback
			const handleChange = handleValueChange(value)
			const handleUpdate = handleComponentUpdate(skipValidate)(value)

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

			initialValue = {...initialValue, ...value}
		}

	const signInField = (rawEntity: FormFieldEntity<T>) => {
		const {name, validatorOptions: rawValidatorOptions, rule} = rawEntity
		const {delay = 300, ...restValidatorOptions} = rawValidatorOptions ?? {}

		if (!name) {
			return
		}

		const entities = getFieldEntities(true)
		const exist = entities.find(entity => entity.name === name)

		if (exist) {
			return
		}

		const asyncDebouncedValidate = asyncDebounce(
			handleFormValidate<T>({rule: rule, validatorOptions: restValidatorOptions})(rawEntity.name)
		)(delay) as (value?: unknown) => Promise<ValidationError[] | undefined>

		fieldEntities = [...entities, {...rawEntity, validate: asyncDebouncedValidate}]

		setFieldsError()({[name]: undefined} as FormError<T>)
		setFieldsValue({componentUpdate: false, skipValidate: true})({[name]: initialValue[name]} as T)

		const fieldKeySting = fieldKeys?.toSorted((a, b) => (a as string).localeCompare(b as string)).join(',')
		const fieldEntitySting = Object.keys(fieldEntities)
			.toSorted((a, b) => a.localeCompare(b))
			.join(',')

		if (fieldKeySting === fieldEntitySting) {
			isSignInFieldCompleted = true
		}

		return {
			signOut: () => signOutFields(name)
		}
	}

	const signOutFields = (namePaths?: NamePath<T>) => {
		const entities = getFieldEntities(true)
		const names = namePath(namePaths)
		const handleSignOut = (signOutName?: keyof T) => {
			if (!signOutName || !isSignInFieldCompleted) {
				return
			}

			const fieldEntity = entities.find(entity => entity.name === signOutName)

			if (!fieldEntity) {
				return
			}

			const {[signOutName]: _signOutError, ...nextError} = error
			const {[signOutName]: _signOutStorage, ...nextFormStore} = store

			setFieldsError()(nextError as FormError<T>)
			setFieldsValue({componentUpdate: false, skipValidate: true})(nextFormStore as T)

			fieldEntities = entities.filter(entity => entity.name !== signOutName)
		}

		getFieldEntitiesName()(names).forEach(handleSignOut)
	}

	const submit = (skipValidate?: boolean) => {
		const {onFinish, onFinishFailed} = callback
		const handleFailed = (err: FormError<T>) => onFinishFailed?.(err)
		const handleFinish = () => onFinish?.(store)

		if (skipValidate) {
			handleFinish()

			return
		}

		validateFields().then(err =>
			Object.entries(err).some(([, value]) => value) ? handleFailed(err) : handleFinish()
		)
	}

	const validateFields = (async (namePaths?: NamePath<T>) => {
		const entities = getFieldEntities()
		const names = namePath(namePaths)
		const handleValidate = async (entityName?: keyof T) => {
			if (!entityName) {
				return
			}

			const value = getFieldsValue(entityName)
			const fieldEntity = entities.find(entity => entity.name === entityName)

			return fieldEntity?.validate?.(value).then(errors => {
				const err = {[entityName]: errors} as FormError<T>

				setFieldsError(true)(err)

				return err
			})
		}

		const fieldErrors = await Promise.all(getFieldEntitiesName()(names).map(handleValidate))
		const err = fieldErrors.reduce((accumulator, value) => ({...accumulator, ...value}), {} as FormError<T>)

		return !Array.isArray(namePaths) && namePaths ? err[namePaths] : err
	}) as FormStore<T>['validateFields']

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
