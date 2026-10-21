import {useId, type FC} from 'react'

import type {AvatarBaseProps} from './Avatar.interface'

import {RenderAvatar} from './Avatar.render'

export const AvatarBase: FC<AvatarBaseProps> = ({ref, ...renderAvatarProps}) => {
	const id = useId()

	return (
		<RenderAvatar
			{...renderAvatarProps}
			id={id}
			ref={ref}
		/>
	)
}

AvatarBase.displayName = 'AvatarBase'
