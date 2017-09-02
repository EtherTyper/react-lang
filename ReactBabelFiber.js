/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFiber
 * @flow
 */

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */

'use strict';

var ReactFiberReconciler = require('ReactFiberReconciler');

function recursivelyAppendChildren(parent, child) {
  if (!child) {
    return;
  }
  /* $FlowFixMe: Element should have this property. */
  if (child.nodeType === 1) { // If is simple element.
    /* $FlowFixMe: Refinement issue. I don't know how to express different. */
    if (!parent) parent = { };
    if (!parent.children) parent.children = [ ];
    parent.children.push(child);
  } else { // If is user-defined element.
    /* As a result of the refinement issue this type isn't known. */
    let node = child;
    do {
      recursivelyAppendChildren(parent, node.output);
    } while (node = node.sibling);
  }
}

var JSONRenderer = ReactFiberReconciler({

  updateContainer(container, children)  {
    container.innerHTML = '';
    recursivelyAppendChildren(container, children);
  },

  createInstance(type, props, children) {
    const element = {
      type: type,
      children: children
    };
    recursivelyAppendChildren(element, children);
    if (typeof props.children === 'string') {
      element.textContent = props.children;
    }
    return element;
  },

  prepareUpdate(element, oldProps, newProps, children) {
    return true;
  },

  commitUpdate(element, oldProps, newProps, children) {
    // element.innerHTML = '';
    recursivelyAppendChildren(element, children);
    if (typeof newProps.children === 'string') {
      element.textContent = newProps.children;
    }
  },

  deleteInstance(instance) {
    // Noop
  },

  scheduleHighPriCallback: (callback) => {
    undefined;
  },

  scheduleLowPriCallback: (callback) => {
    undefined;
  },

});

const ReactJSON = {

  render(element, container) {
    if (!container._reactRootContainer) {
      container._reactRootContainer = JSONRenderer.mountContainer(element, container);
    } else {
      JSONRenderer.updateContainer(element, container._reactRootContainer);
    }
  },

};

module.exports = ReactJSON;
