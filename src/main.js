// @flow

import only from "onlyjs"
import {xvar} from "x-reactor"
import {xdiv} from "./X-Html"
import {makeLeaf, makeBranch} from "./X-Tree"
import type {XTree} from "./X-Tree"
import {mirrorHTMLTree} from "./mirrorTree"

let timesClicked = xvar(() => 0);

let button = only.html({button: "Click!"})

button.addEventListener("click", () => {
  timesClicked.set(() => timesClicked.get() + 1)
})

let leafy  = xvar(() => only.html({p : "leafy initial text"}))
let tree : XTree<HTMLElement> = makeBranch(xvar(() =>[
    makeLeaf(xvar(() => only.html({p : "Leaf1"}))),
    makeLeaf(leafy)
  ]))

only.setHtml([
  {p : "Hello World!"},
  button,
  xdiv(() => only.html({p : "Times clicked:" + timesClicked.xget()})),
  mirrorHTMLTree(tree)
  ])
