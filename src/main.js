// @flow

import only from "onlyjs"
import {xvar} from "x-reactor"
import {xdiv} from "./X-Html"
import {makeLeaf, makeBranch} from "./X-Tree"
import type {XTree} from "./X-Tree"
import {mirrorHTMLTree} from "./mirrorTree"
import {List} from 'immutable'

let timesClicked = xvar(() => 0);

let button : HTMLElement = only.html({button: "Click!"})

button.addEventListener("click", () => {
  timesClicked.set(() => timesClicked.get() + 1)
})

let leafy  = xvar(() => only.html({p : "leafy initial text"}))
let branch = xvar(() => List.of(
    makeLeaf(xvar(() => only.html({p : "Leaf1"}))),
    makeLeaf(leafy)
  ))
let tree : XTree<HTMLElement> = makeBranch(branch);
// let display = xdiv(() => branch.xget().map((tree) => tree((t) => t, () => {})).toArray()[0])

only.setHtml([
  {p : "Hello World!"},
  button,
  xdiv(() => only.html({p : "Times clicked:" + timesClicked.xget()})),
  mirrorHTMLTree(tree)
  ])

window.branch = branch
