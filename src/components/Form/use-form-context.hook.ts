import {createContext, useContext} from 'react'
import {FormStore} from './Form.interface'

export const FormContext = createContext<FormStore<Record<string, unknown>> | undefined>(undefined)
export const useFormContext = () => {
        const contextValue = useContext(FormContext)

        if (!contextValue) {
                throw new Error('useFormContext must be used within a FormProvider')
        }

        return contextValue
}
