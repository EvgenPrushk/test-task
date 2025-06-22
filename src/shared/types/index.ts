export type UnionToIntersection<U> = (
  U extends string ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;