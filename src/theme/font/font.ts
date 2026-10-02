import {PLATFORM} from '../theme.enum'
import type {Platform} from '../theme.interface'
import type {Font} from './font.interface'

export const createFont =
	(fontFamily?: string) =>
	(codeFontFamily?: string) =>
	(platform: Platform = PLATFORM.IOS): Font => {
		const platformCodeFontFamily = {
			[PLATFORM.ANDROID]: 'System',
			[PLATFORM.IOS]: 'System',
			[PLATFORM.MACOS]: 'SF Mono',
			[PLATFORM.WEB]:
				'Source Code Pro, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
			[PLATFORM.WINDOWS]: 'System'
		}

		const platformFontFamily = {
			[PLATFORM.ANDROID]: 'System',
			[PLATFORM.IOS]: 'System',
			[PLATFORM.MACOS]:
				'-apple-system, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
			[PLATFORM.WEB]:
				'-apple-system, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
			[PLATFORM.WINDOWS]: 'System'
		}

		return {
			family: {
				codeFamily: codeFontFamily ?? platformCodeFontFamily[platform] ?? 'System',
				family: fontFamily ?? platformFontFamily[platform] ?? 'System'
			},
			letterSpacing: {
				letterSpacing0: -0.25,
				letterSpacing1: 0,
				letterSpacing2: 0.25,
				letterSpacing3: 0.1,
				letterSpacing4: 0.15,
				letterSpacing5: 0.4,
				letterSpacing6: 0.5
			},
			height: {
				height0: 16,
				height1: 16,
				height2: 20,
				height3: 24,
				height4: 28,
				height5: 32,
				height6: 36,
				height7: 40,
				height8: 44,
				height9: 52,
				height10: 64
			},
			lineHeight: {
				lineHeight0: 1.45,
				lineHeight1: 1.33,
				lineHeight2: 1.43,
				lineHeight3: 1.5,
				lineHeight4: 1.27,
				lineHeight5: 1.33,
				lineHeight6: 1.29,
				lineHeight7: 1.25,
				lineHeight8: 1.22,
				lineHeight9: 1.16,
				lineHeight10: 1.12
			},
			size: {
				size0: 11,
				size1: 12,
				size2: 14,
				size3: 16,
				size4: 22,
				size5: 24,
				size6: 28,
				size7: 32,
				size8: 36,
				size9: 45,
				size10: 57
			},
			style: {normal: 'normal'},
			weight: {bold: 700, medium: 500, regular: 400}
		}
	}
