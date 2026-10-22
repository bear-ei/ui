import type {SupportingTextProps} from './Supporting-text.interface'

import {typedMemo} from '../../utils'
import {SupportingTextBase} from './Supporting-text-base.component'

export const SupportingText = typedMemo((props: SupportingTextProps) => <SupportingTextBase {...props} />)
SupportingText.displayName = 'SupportingText'
