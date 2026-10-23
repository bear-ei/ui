import {validate, ValidationError} from 'class-validator'

import type {
	CreateFormFieldValidatorOptions,
	FormCallbacks,
	FormErrors,
	FormFieldEntity,
	FormStore,
	FormStoreOptions,
	FormValidateRule,
	FormValidatorOptions,
	SetFieldsValueOptions,
	SignInFieldOptions,
	ValuesChangeEvent
} from './Form.interface'

import {namePath, type NamePath} from '../../utils'

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

const createFormFieldValidator = <T>(name: keyof T, {rule, validatorOptions}: CreateFormFieldValidatorOptions) => {
	const {
		forbidNonWhitelisted: isForbidNonWhitelisted = true,
		skipMissingProperties: isSkipMissingProperties = true,
		whitelist: isWhitelist = true,
		...otherValidatorOptions
	} = validatorOptions ?? {}

	return async (value?: unknown) =>
		name && rule ?
			validate(Object.assign(new rule(), {[name]: value}), {
				...otherValidatorOptions,
				forbidNonWhitelisted: isForbidNonWhitelisted,
				skipMissingProperties: isSkipMissingProperties,
				whitelist: isWhitelist
			}).then(errors => (errors.length ? errors : undefined))
		:	([] as ValidationError[])
}

export const formStore = <T extends Record<string, unknown>>(
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
	const getFieldEntitiesName = (names?: (keyof T)[], signOut = false) => {
		const entityNames = getFieldEntities(signOut).map(({name}) => name)
		const namesSet = new Set(names)

		return [...(names ? entityNames.filter(name => name && namesSet.has(name)) : entityNames)]
	}

	const getFieldsError = ((namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const err =
			names ?
				getFieldEntitiesName(names).reduce(
					(accumulator, entityName) =>
						entityName ? {...accumulator, [entityName]: errors[entityName]} : accumulator,
					{} as FormErrors<T>
				)
			:	errors

		return !Array.isArray(namePaths) && namePaths ? err[namePaths] : err
	}) as FormStore<T>['getFieldsError']

	const getFieldsValue = ((namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const value =
			names ?
				getFieldEntitiesName(names).reduce(
					(accumulator, entityName) =>
						entityName ? {...accumulator, [entityName]: store[entityName]} : accumulator,
					{} as T
				)
			:	store

		return !Array.isArray(namePaths) && namePaths ? value[namePaths] : value
	}) as FormStore<T>['getFieldsValue']

	const getInitialValues = ((namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const value =
			names ?
				getFieldEntitiesName(names).reduce(
					(accumulator, entityName) =>
						entityName ? {...accumulator, [entityName]: initialValues[entityName]} : accumulator,
					{} as T
				)
			:	initialValues

		return !Array.isArray(namePaths) && namePaths ? value[namePaths] : value
	}) as FormStore<T>['getInitialValues']

	const isFieldsTouched = (namePaths?: NamePath<T>) => {
		const entities = getFieldEntities()
		const names = namePath(namePaths)
		const isFieldTouchedByName = (entityName?: keyof T) =>
			entityName && entities.find(entity => entity.name === entityName)?.touched

		return getFieldEntitiesName(names).map(isFieldTouchedByName).every(Boolean)
	}

	const resetFields = (namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const resetFormFieldByName = (entityName?: keyof T) => {
			if (!entityName) {
				return
			}

			setFieldsError({[entityName]: undefined} as FormErrors<T>)
			setFieldsValue({[entityName]: undefined} as T, {componentUpdate: true, enableValidate: false})
		}

		getFieldEntitiesName(names).forEach(resetFormFieldByName)
	}

	const setCallbacks = (callbackValues: FormCallbacks<T>) => (callbacks = {...callbacks, ...callbackValues})
	const setFieldsError = (errs: FormErrors<T>, componentUpdate = false) => {
		errors = {...errors, ...errs}

		if (componentUpdate) {
			const entities = getFieldEntities()
			const errKeys = Object.keys(errs) as (keyof T)[]

			entities.forEach(entity => entity.name && errKeys.includes(entity.name) && entity.onComponentUpdate())
		}
	}

	const setFieldKeys = (keys?: (keyof T)[]) => keys && (fieldKeys = keys)
	const setFieldsValidate = (validateRule: FormValidateRule<T>, validatorOptions: FormValidatorOptions = {}) => {
		if (!isSignInFieldCompleted) {
			return
		}

		const createNextValidator = (entity: FormFieldEntity<T>) =>
			entity.name &&
			createFormFieldValidator(entity.name, {
				rule: validateRule[entity.name],
				validatorOptions: {...validatorOptions, ...rawValidatorOptions}
			})

		const entities = getFieldEntities()
		const ruleKeysSet = new Set(Object.keys(validateRule) as (keyof T)[])

		fieldEntities = entities.reduce(
			(accumulator, entity) =>
				entity.name && ruleKeysSet.has(entity.name) ?
					[...accumulator, {...entity, validate: createNextValidator(entity)}]
				:	[...accumulator, entity],
			[] as FormFieldEntity<T>[]
		)

		rawValidatorOptions ??= validatorOptions
	}

	const setFieldsTouched = (name: keyof T, touched = false) => {
		if (!(name || isSignInFieldCompleted)) {
			return
		}

		fieldEntities = [...getFieldEntities().map(entity => (entity.name === name ? {...entity, touched} : entity))]
	}

	const updateStoreWithCallback = (values = {} as T, onStoreChange?: (event: ValuesChangeEvent<T>) => void) => {
		store = {...store, ...values}

		onStoreChange?.({changedValues: values, values: store})
	}

	const createFieldEntityUpdateHandler = (value = {} as T, enableValidate = true) => {
		const findEntity = (name: keyof T) => getFieldEntities().find(entityItem => name === entityItem.name)

		return async (name: keyof T) => {
			const entity = findEntity(name)

			if (!entity?.name) {
				return
			}

			updateStoreWithCallback(value)

			if (errors[name]) {
				setFieldsError({[name]: undefined} as FormErrors<T>)
			}

			setFieldsTouched(name, true)

			if (enableValidate) {
				validateFields(name)

				return
			}

			entity.onComponentUpdate()
		}
	}

	const setFieldsValue = (
		values = {} as T,
		{componentUpdate = true, enableValidate = true} = {} as SetFieldsValueOptions
	) => {
		const {onValuesChange} = callbacks
		const fieldEntityUpdateHandler = createFieldEntityUpdateHandler(values, enableValidate)

		if (componentUpdate) {
			Promise.all(Object.keys(values).map(fieldEntityUpdateHandler)).then(() =>
				callbacks.onValuesChange?.({changedValues: values, values: store})
			)

			return
		}

		updateStoreWithCallback(values, onValuesChange)
	}

	const setInitialValues = (values = {} as T) => (initialValues = {...initialValues, ...values})
	const signInField = (rawEntity: SignInFieldOptions<T>) => {
		const {name, rule, validatorOptions} = rawEntity

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
			{
				...rawEntity,
				validate: rawEntity.name && createFormFieldValidator<T>(rawEntity.name, {rule, validatorOptions})
			}
		]

		setFieldsError({[name]: undefined} as FormErrors<T>)
		setFieldsValue({[name]: initialValues[name]} as T, {componentUpdate: false, enableValidate: false})

		const fieldEntityNames = fieldEntities.map(entity => entity.name)
		const fieldKeysSet = new Set(fieldKeys)
		const fieldEntityNamesSet = new Set(fieldEntityNames.filter(Boolean))
		const isFieldKeysComplete =
			fieldKeysSet.size === fieldEntityNamesSet.size &&
			[...fieldKeysSet].every(key => fieldEntityNamesSet.has(key))

		if (isFieldKeysComplete) {
			isSignInFieldCompleted = true
		}

		return {signOut: () => signOutFields(name)}
	}

	const signOutFields = (namePaths?: NamePath<T>) => {
		const names = namePath(namePaths)
		const signOutFormField = (signOutName?: keyof T) => {
			if (!signOutName || !isSignInFieldCompleted) {
				return
			}

			const entities = getFieldEntities(true)
			const fieldEntity = entities.find(entity => entity.name === signOutName)

			if (!fieldEntity) {
				return
			}

			const {[signOutName]: _signOutError, ...nextErrors} = errors
			const {[signOutName]: _signOutStorage, ...nextFormValues} = store

			errors = nextErrors as FormErrors<T>
			store = nextFormValues as T

			fieldEntities = entities.filter(entity => entity.name !== signOutName)
		}

		getFieldEntitiesName(names).forEach(signOutFormField)
	}

	const defaultValidateFields = (async (namePaths?: NamePath<T>) => {
		const entities = getFieldEntities()
		const names = namePath(namePaths)
		const validateFormField = async (entityName?: keyof T) => {
			if (!entityName) {
				return undefined
			}

			const value = getFieldsValue(entityName)
			const fieldEntity = entities.find(entity => entity.name === entityName)
			const error = await fieldEntity?.validate?.(value)

			return {[entityName]: error} as FormErrors<T>
		}

		const fieldErrors = await Promise.all(getFieldEntitiesName(names).map(validateFormField))
		const errs = fieldErrors.reduce((accumulator, value) => ({...accumulator, ...value}), {} as FormErrors<T>)

		setFieldsError(errs, true)

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
