// @flow

export type ObjectId = string

export type NodeBase = {
  id: ObjectId,
  name: string,
  uniqueName: string,
  importedStyle: any,
  parent: ?ObjectId,
  style: any,
  // TODO make a distinction between "imported styles" and "overridden styles"
  // e.g. we'll want to do layout things w/ the "overridden styles" stuff
  // and not have re-importing mess that up.
}

export type NodeT = ({
  type: 'ComponentInstance',
  replacedObjectId: ObjectId, // this is the objectID of the thing that was replaced.
  componentId: ObjectId,
} & NodeBase) | ({
  type: 'SymbolMaster',
  svgSource: string,
  symbolId: string,
  children: ObjectId[],
  childSize: {width: number, height: number},
} & NodeBase) | ({
  type: 'Group',
  children: ObjectId[],
  childSize: {width: number, height: number},
  /*
} & NodeBase) | ({
  type: 'SymbolInstance',
  symbolId: string, // TODO can we drop this (& replace w/ the objectid)? I wonder if we need it for syncing
  */
} & NodeBase) | ({
  type: 'ShapeGroup',
  svgSource: string,
} & NodeBase) | ({
  type: 'Text',
  stringValue: string,
} & NodeBase) | ({
  type: 'Image',
  imageData: string,
  tintColor: ?string,
} & NodeBase) | ({
  type: 'Hole',
} & NodeBase) | ({
  // TODO I should handle ovals as well
  type: 'Rectangle',
  svgSource: string,
} & NodeBase) | ({
  type: 'RectangleGroup',
  children: ObjectId[],
  replacedGroupId: ObjectId,
  styleFromGroup: any,
} & NodeBase) | ({
  type: 'ImportError',
} & NodeBase)

// TODO I want to use an intersection of unions but bugs
// https://github.com/facebook/flow/issues/3391
// export type Node = NodeBase & NodeExtra

// OOOoooh component instances need unique names too
export type SkreactFile = {
  topLevelSketchNodeIds: ObjectId[], // objectIDs
  nodes: {
    [id: ObjectId]: NodeT,
    // Soooo maybe this also have component instances too? maybe shouldn't hurt.
  },
  idsByName: {
    [name: string]: ObjectId,
  },
  components: {
    [id: string]: {
      name: string,
      source: string,
      Component: any & {rootName: string},
      savedConfigurations: {
        [id: string]: {
          name: string,
          props: any,
          state: any,
        },
      },
      visibleConfigurations: string[],
    },
  },
}
