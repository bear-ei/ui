import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SupportingTextBase} from './Supporting-text-base.component'
import type {SupportingTextProps} from './Supporting-text.interface'

const SupportingTextWithRef = forwardRef<View, SupportingTextProps>((props, ref) => (
        <SupportingTextBase
                {...props}
                ref={ref}
        />
))

SupportingTextWithRef.displayName = 'SupportingTextWithRef'

export const SupportingText = typedMemo(SupportingTextWithRef)()
