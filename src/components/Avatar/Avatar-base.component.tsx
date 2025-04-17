import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {AvatarBaseProps} from './Avatar.interface'

export const AvatarBase = forwardRef<View, AvatarBaseProps>(
	({labelText = 'A', render, testID, ...avatarProps}, ref) => {
		const id = useId()

		return render({...avatarProps, labelText: labelText[0], ref, testID: testID ?? id})
	}
)
