// @flow

import {xvar} from "x-reactor"
import type {XVar} from "x-reactor"
import {List} from "immutable"

type Leaf<T> = XVar<T>
type Branch<T> = XVar<List<XTree<T>>>

export type XTree<T> = <R>(
  Leaf : Leaf<T> => R,
  Branch: Branch<T> => R
) => R

export function makeLeaf<T>(xt : XVar<T>) : XTree<T>{
  return function<R>(Leaf: Leaf<T> => R, Branch) : R{
    return Leaf(xt)
  }
}

export function makeBranch<T>(axxt : Branch<T>) : XTree<T>{
  return function<R>(Leaf, Branch : Branch<T> => R) : R{
    return Branch(axxt)
  }
}

function xgetFirst<T>(tree : XTree<T>): T{
  return tree(
    /*Leaf*/ (t) => t.get(),
    /*Branch*/ (a) => xgetFirst(a[0].get())
  )
}
