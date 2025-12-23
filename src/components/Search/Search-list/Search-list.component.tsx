import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {ScrollView} from 'react-native'
import {SearchListBase} from './Search-list-base.component'
import type {SearchListProps} from './Search-list.interface'

const SearchListWithRef = forwardRef<ScrollView, SearchListProps>((props, ref) => (
        <SearchListBase
                {...props}
                ref={ref}
        />
))

SearchListWithRef.displayName = 'SearchListWithRef'

export const SearchList = typedMemo(SearchListWithRef)()
