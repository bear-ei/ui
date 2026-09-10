import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {AvatarBase} from './Avatar-base.component'
import type {AvatarProps} from './Avatar.interface'

const AvatarWithRef = forwardRef<View, AvatarProps>((props, ref) => (
	<AvatarBase
		{...props}
		ref={ref}
	/>
))

AvatarWithRef.displayName = 'AvatarWithRef'

export const Avatar = typedMemo(AvatarWithRef)()
