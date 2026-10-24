import {type FC} from 'react'

import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'

import {useTheme} from '../../../hooks'
import {ENTRY_EXIT} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'

export const RenderLayoutNavigation: FC<RenderLayoutNavigationProps> = ({
	children,
	className,
	id,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const {entry, exit} = ENTRY_EXIT.EMPHASIZED

	return (
		<LayoutAnimated
			{...containerProps}
			className={classesName(
				'flex min-w-[--density-layout-navigation] max-w-[--density-layout-sidebar] flex-col self-stretch bg-[--color-surface-container]',
				className
			)}
			entry={entry}
			exit={exit}
			testID={testID ?? `layoutNavigation--${id}`}
		>
			{children}
		</LayoutAnimated>
	)
}
