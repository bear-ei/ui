import type {RADIUS, SHAPE} from './shape.enum'

export type RadiusType = (typeof RADIUS)[keyof typeof RADIUS]
export type ShapeType = (typeof SHAPE)[keyof typeof SHAPE]
export interface Radius {
	bottomLeft: number
	bottomRight: number
	topLeft: number
	topRight: number
}

export type ShapeRadius = Record<ShapeType, Radius>
export type Shape = Record<RadiusType, ShapeRadius> & {radius: Record<RadiusType, number>}
