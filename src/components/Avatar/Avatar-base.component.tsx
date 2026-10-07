import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {AvatarBaseProps} from './Avatar.interface'
import {RenderAvatar} from './Avatar.render'

export const AvatarBase = forwardRef<View, AvatarBaseProps>(({labelText = 'A', ...renderAvatarProps}, ref) => {
	const id = useId()

	return (
		<RenderAvatar
			{...renderAvatarProps}
			id={id}
			labelText={labelText[0]}
			ref={ref}
		/>
	)
})

AvatarBase.displayName = 'AvatarBase'
