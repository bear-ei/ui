import {createContext, useContext} from 'react'
import type {FormStore} from './Form.interface'

export const FormContext = createContext<FormStore<Record<string, unknown>> | undefined>(undefined)
export const useFormContext = () => {
	const contextValue = useContext(FormContext)

	if (!contextValue) {
		throw new Error(
			`[useFormContext] Form context not found.
			This hook must be called inside a <Form> that has reached SUCCEEDED status
			(i.e. from a FormItem rendered by Form, not standalone).`
		)
	}

	return contextValue
}
