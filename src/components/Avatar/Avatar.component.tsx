import type {View} from 'react-native'

import {forwardRef} from 'react'

import type {AvatarProps} from './Avatar.interface'

import {typedMemo} from '../../utils'
import {AvatarBase} from './Avatar-base.component'

const AvatarWithRef = forwardRef<View, AvatarProps>((props, ref) => (
	<AvatarBase
		{...props}
		ref={ref}
	/>
))

AvatarWithRef.displayName = 'Avatar'

export const Avatar = typedMemo(AvatarWithRef)
