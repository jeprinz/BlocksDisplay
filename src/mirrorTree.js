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
    /*Branch*/ (branch: XVar<List<XTree<HTMLElement>>>) => xdiv(() => {

      let div : HTMLElement = only.html({
        div : branch.xget().map((tree) => mirrorHTMLTree(tree)).toArray(),
        css : {
          border : "solid",
          display : "inline-block"
        }
      })
      return div
    })
  )
}

      // let addLeafButton: HTMLElement = only.html({button : "addLeaf"})
      // addLeafButton.addEventListener("click", () => {
      //   let newLeaf : XTree<HTMLElement> = makeLeaf(xvar(() => only.html({p : "New leaf"})))
      //   branch.set(() => branch.get().concat(newLeaf))
      // })
      //
      // let addBranchButton: HTMLElement = only.html({button : "addBranch"})
      // addBranchButton.addEventListener("click", () => {
      //   let newBranch : XTree<HTMLElement> = makeBranch(xvar(() => List.of()))
      //   branch.set(() => branch.get().concat(newBranch))
      // })
