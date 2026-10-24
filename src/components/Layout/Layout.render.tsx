import {type FC} from 'react'

import type {RenderLayoutProps} from './Layout.interface'

import {LAYOUT} from '../../constants'
import {useTheme} from '../../hooks'
import {ENTRY_EXIT} from '../../theme'
import {LayoutAnimated} from '../Layout-animated'

export const RenderLayout: FC<RenderLayoutProps> = ({
	children,
	className,
	id,
	layoutType,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const {entry, exit} = ENTRY_EXIT.EMPHASIZED

	return (
		<LayoutAnimated
			{...containerProps}
			className={classesName('flex flex-1 self-stretch bg-[--color-surface-container]', className, {
				['flex-col']: layoutType === LAYOUT.VERTICAL,
				['flex-row']: layoutType === LAYOUT.HORIZONTAL
			})}
			entry={entry}
			exit={exit}
			testID={testID ?? `layout--${id}`}
		>
			{children}
		</LayoutAnimated>
	)
}
