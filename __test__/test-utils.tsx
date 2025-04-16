import {render} from '@testing-library/react-native'
import React from 'react'
import {ThemeProvider} from '../src/contexts'

export const renderWithTheme = (ui: React.ReactElement) => {
	return render(<ThemeProvider>{ui}</ThemeProvider>)
}
