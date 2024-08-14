import {createContext, useContext} from 'react'
import {FormStorage} from './Form.interface'

export const FormContext = createContext<FormStorage<Record<string, unknown>> | undefined>(undefined)
export const useFormContext = () => {
    const contextValue = useContext(FormContext)

    if (!contextValue) {
        throw new Error('useFormContext must be used within a FormProvider')
    }

    return contextValue
}
