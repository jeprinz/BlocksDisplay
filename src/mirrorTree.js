// @flow

import only from "onlyjs"
import {xvar} from "x-reactor"
import type {XVar} from "x-reactor"
import {makeLeaf, makeBranch} from "./X-Tree"
import type {XTree} from "./X-Tree"
import {xdiv} from "./X-Html"
import {List} from "immutable"

export function mirrorHTMLTree(tree : XTree<HTMLElement>) : HTMLElement{
  return tree(
    /*Leaf*/ (t) => xdiv(() => t.xget()),
    /*Branch*/ (branch: XVar<List<XTree<HTMLElement>>>) => xdiv(() => only.html({
        div : branch.xget().map((tree) => mirrorHTMLTree(tree)),
        css : {
          border : "solid",
          display : "inline-block"
        }
      }))
  )
}
