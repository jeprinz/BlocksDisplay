// @flow

import only from "onlyjs"
import {xvar} from "x-reactor"
import type {XVar} from "x-reactor"

export function xdiv(contents_f : () => HTMLElement){
  let contents : XVar<HTMLElement> = xvar(contents_f)
  let div : HTMLElement = only.html({
      div : contents.get(),
      css : {display: "inline_block"}
    })
    contents.onUpdate(() => {
      div.innerHTML = "";
      div.appendChild(contents.get());
      })
  return div
}
