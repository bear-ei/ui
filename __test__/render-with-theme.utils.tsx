import {act, render} from '@testing-library/react-native'
import React from 'react'
import {ThemeProvider} from '../src/contexts'

export const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>)
export const renderWithAct = async (ui: React.ReactElement) => {
	const result = renderWithTheme(ui)

	await act(async () => {
		await Promise.resolve()
	})

	return result
}
