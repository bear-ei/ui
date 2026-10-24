import {type FC} from 'react'

import type {RenderLayoutPaneProps} from './Layout-pane.interface'

import {ORIENTATION} from '../../../constants'
import {useTheme} from '../../../hooks'
import {ENTRY_EXIT} from '../../../theme'
import {LayoutAnimated} from '../../Layout-animated'

export const RenderLayoutPane: FC<RenderLayoutPaneProps> = ({
	children,
	className,
	id,
	orientation,
	testID,
	...containerProps
}) => {
	const {token} = useTheme()
	const {classNames} = token.classes
	const {entry, exit} = ENTRY_EXIT.EMPHASIZED

	return (
		<LayoutAnimated
			{...containerProps}
			className={classNames(
				'flex min-w-[--density-layout-sidebar] flex-1 self-stretch bg-[--color-surface]',
				className,
				{
					['flex-col']: orientation === ORIENTATION.VERTICAL,
					['flex-row']: orientation === ORIENTATION.HORIZONTAL
				}
			)}
			entry={entry}
			exit={exit}
			testID={testID ?? `layoutPane--${id}`}
		>
			{children}
		</LayoutAnimated>
	)
}
