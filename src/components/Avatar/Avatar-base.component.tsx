import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {AvatarBaseProps} from './Avatar.interface'

export const AvatarBase = forwardRef<View, AvatarBaseProps>(({labelText = 'A', renderAvatar, ...avatarProps}, ref) => {
	const id = useId()

	return renderAvatar({...avatarProps, labelText: labelText[0], ref, id})
})
