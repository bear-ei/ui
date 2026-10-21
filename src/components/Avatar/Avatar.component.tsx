import type {AvatarProps} from './Avatar.interface'

import {typedMemo} from '../../utils'
import {AvatarBase} from './Avatar-base.component'

export const Avatar = typedMemo((props: AvatarProps) => <AvatarBase {...props} />)
Avatar.displayName = 'Avatar'
