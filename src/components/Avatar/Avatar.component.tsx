import {forwardRef, memo, type FC} from 'react'
import type {View} from 'react-native'
import {AvatarBase} from './Avatar-base.component'
import type {AvatarProps} from './Avatar.interface'
import {renderAvatar} from './Avatar.render'

const AvatarWithRef = forwardRef<View, AvatarProps>((props, ref) => (
	<AvatarBase
		{...props}
		ref={ref}
		renderAvatar={renderAvatar}
	/>
))

export const Avatar = memo(AvatarWithRef) as FC<AvatarProps>
