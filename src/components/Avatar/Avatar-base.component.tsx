import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {AvatarBaseProps} from './Avatar.interface'

export const AvatarBase = forwardRef<View, AvatarBaseProps>(({labelText = 'A', render, ...renderProps}, ref) => {
	const id = useId()

	return render({...renderProps, labelText: labelText[0], ref, id})
})
