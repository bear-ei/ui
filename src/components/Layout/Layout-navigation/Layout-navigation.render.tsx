import {type FC} from 'react'

import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'

import {useTheme} from '../../../hooks'
import {DURATION, EASING} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'

const ENTRY_EXIT = {
	entry: {duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE},
	exit: {duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}
}

export const RenderLayoutNavigation: FC<RenderLayoutNavigationProps> = ({
	children,
	className,
	id,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classesName} = token.classes
	const {entry, exit} = ENTRY_EXIT

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
