import {render} from '@testing-library/react-native'
import React, {act} from 'react'
import {ThemeProvider} from '../src/contexts'

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>)

export const renderWithAct = async (ui: React.ReactElement) => {
	const result = renderWithTheme(ui)

	await act(async () => {})

	return result
}
