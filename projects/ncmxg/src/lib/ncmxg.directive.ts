import { Directive, AfterViewInit, Input, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';
import { mxRecursiveParallelEdgeLayout } from './extensions/mxRecursiveParallelEdgeLayout';

declare var mxGraph: any;
declare var mxClient: any;
declare var mxUtils: any;
declare var mxEvent: any;
declare var mxConstants: any;
declare var mxCellOverlay: any;
declare var mxImage: any;
declare var mxSwimlaneManager: any;
declare var mxStackLayout: any;
declare var mxLayoutManager: any;
declare var mxPoint: any;
declare var mxParallelEdgeLayout: any;
declare var mxEdgeStyle: any;
declare var mxCompactTreeLayout: any;
declare var mxCell: any;
declare var mxGraphModel: any;
declare var mxGeometry: any;
declare var mxCellTracker: any;

@Directive({
  selector: '[ncmxGraphlib]'
})
export class NcmxgDirective implements AfterViewInit {
  @Input() gwidth: number;
  @Input() gdata: Array<any>;
  onNodeMenuClicked: EventEmitter<any> = new EventEmitter();
  private graph: any;
  private element: HTMLInputElement;
  private elMap: {};
  private root: any;
  private model: any;
  private colorTabMap: any = {};
  private nodeDim = {
    w: 300,
    h: 60
  };
  private swlDim = {
    labelHt: 80
  };
  allLayers: {};

  constructor(private elRef: ElementRef, private zone: NgZone) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    window['nc'] = window['nc'] || {};
    window['nc']['mxg'] = window['nc']['mxg'] || {};
    window['nc']['mxg']['menuCallback'] = this.bindPublic.bind(this);
  }

  bindPublic(value) {
    this.zone.run(() => this.callMenuItem(value));
  }

  callMenuItem(value: string) {
    var _rect = this.getOffset(value);
    this.onNodeMenuClicked.emit({ "id": value, "x": _rect.left, "y": _rect.top });
  }

  getOffset(elId) {
    var el = document.getElementById(elId);
    let parentElem: any = el.parentElement;
    while (!parentElem.matches("foreignObject")) {
      parentElem = parentElem.parentElement;
    }

    let left = parentElem.getScreenCTM().e;
    if (el.classList.contains("ncmxg-perspective")) {
      left += 20;
    }

    return {
      left: left,
      top: parentElem.getScreenCTM().f
    }
  }

  private flatten(data: Array<any>, levelMap: ({ [index: string]: any[] }), level: number) {
    if (levelMap[level] == undefined && data && data.length) {
      levelMap[level] = [];
    }
    for (let parent of data) {
      levelMap[level].push(parent);
      if (parent.children != null || parent.children.length > 0) {
        this.flatten(parent.children, levelMap, level + 1);
      }
    }
    return levelMap;
  }

  ngAfterViewInit(): void {
    this.gdata = this.gdata || [];
    this.gwidth = this.gwidth * 100 || 12000;

    this.elMap = {};
    this.elMap = this.flatten(this.gdata, this.elMap, 0);

    if (!mxClient.isBrowserSupported()) {
      mxUtils.error('Browser is not supported!', 200, false);
    }
    else {
      mxEvent.disableContextMenu(this.element);
      this.root = new mxCell();
      this.model = new mxGraphModel(this.root);
      this.graph = new mxGraph(this.element, this.model);
      this.graph.graphHandler.scaleGrid = true;
      //this.graph = new mxGraph(this.element);

      this.graph.setCellsMovable(true);
      this.graph.setAutoSizeCells(true);
      this.graph.setHtmlLabels(true);
      this.graph.setTolerance(20);

      this.configureGraphStyles(this.graph);

      new mxSwimlaneManager(this.graph);

      var parent = this.graph.getDefaultParent();

      var highlight = new mxCellTracker(this.graph, '#3a83ff', function (_mxcell) {
        try {
          if (!_mxcell.state.cell.vertex)
            return _mxcell.state.cell;
        } catch (e) {

        }
      });

      try {
        this.addSwimlanes(this.graph, parent);
        /** Add perspectives and objectives */

        this.addNodes(this.graph);

        /** Add all connections */
        this.makeNodeConnections(this.graph, parent);

        this.addColorTabs();

      } finally {
        this.graph.setCellsResizable(true);
        this.graph.setEnabled(false);
        this.graph.getView().setScale(0.8);
      }
    }
  }

  private addColorTabs() {
    for (let colorKey in this.colorTabMap) {
      let pNode = this.graph.model.getCell(colorKey);
      let colorCodeTab = this.graph.insertVertex(pNode, null, '', -10, 0, 6, 60, ';COLORTAB;foldable=0;fillColor=' + this.colorTabMap[colorKey]);
      colorCodeTab.geometry.offset = new mxPoint(-180, -40);
    }
  }

  private configureGraphStyles(graph: any) {
    var style = mxUtils.clone(graph.getStylesheet().getDefaultVertexStyle());
    //style[mxConstants.STYLE_FONTFAMILY] = 'GothamBookRegular';
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
    style[mxConstants.STYLE_FONTSIZE] = 14;
    style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
    //Swimlane title height
    style[mxConstants.STYLE_STARTSIZE] = this.swlDim.labelHt;
    style[mxConstants.STYLE_HORIZONTAL] = false;
    style[mxConstants.STYLE_FONTCOLOR] = '#757575';
    style[mxConstants.STYLE_STROKECOLOR] = 'none';
    //Swimlane title and contents divider
    style[mxConstants.STYLE_SWIMLANE_LINE] = 0;
    style[mxConstants.STYLE_DASHED] = 1;
    delete style[mxConstants.STYLE_FILLCOLOR];
    graph.getStylesheet().putCellStyle('CSTSWLANE', style);
    var style1 = mxUtils.clone(graph.getStylesheet().getDefaultVertexStyle());
    style1[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style1[mxConstants.STYLE_OPACITY] = 100;
    //style1[mxConstants.STYLE_ROUNDED] = 1;
    style1[mxConstants.STYLE_FONTSIZE] = 12;
    style1[mxConstants.STYLE_FONTSTYLE] = mxConstants.DEFAULT_FONTSTYLE;
    style1[mxConstants.STYLE_FONTCOLOR] = '#757575';
    style1[mxConstants.STYLE_HORIZONTAL] = true;
    style1[mxConstants.STYLE_STROKECOLOR] = '#B5B5B5';
    style1[mxConstants.STYLE_STROKEWIDTH] = 2;
    style1[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
    style1[mxConstants.STYLE_DASHED] = 0;
    style1[mxConstants.STYLE_FOLDABLE] = 0;
    graph.getStylesheet().putCellStyle('ROUNDED', style1);

    var style2 = mxUtils.clone(style1);
    //style2[mxConstants.STYLE_ROUNDED] = 1;
    style2[mxConstants.STYLE_STROKEWIDTH] = 0;
    style2[mxConstants.STYLE_FOLDABLE] = 0;
    graph.getStylesheet().putCellStyle('COLORTAB', style2);

    var styleEdge1 = mxUtils.clone(graph.getStylesheet().getDefaultEdgeStyle());
    styleEdge1['edgeStyle'] = 'topToBottomEdgeStyle';
    graph.getStylesheet().putCellStyle('TBEdge', styleEdge1);
    var styleEdge2 = mxUtils.clone(graph.getStylesheet().getDefaultEdgeStyle());
    //styleEdge2['edgeStyle'] = mxEdgeStyle.SegmentConnector;
    graph.getStylesheet().putCellStyle('LinkEdge', styleEdge2);
    //graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'topToBottomEdgeStyle';//mxEdgeStyle.ElbowConnector;//'topToBottomEdgeStyle';
  }

  private addSwimlanes(graph: any, parent: any) {
    let laneDepth = {};
    for (let depth = 1; depth < Object.keys(this.elMap).length; depth++) {
      for (let vertex of this.elMap[depth]) {
        if (laneDepth[vertex.parentId] == undefined) {
          laneDepth[vertex.parentId] = depth;
        }
        else {
          laneDepth[vertex.parentId] = depth > laneDepth[vertex.parentId] ? depth : laneDepth[vertex.parentId];
        }
      }
    }

    if (Object.keys(laneDepth).length < this.elMap[0].length) {
      for (let excludedVertex of this.elMap[0]) {
        if (!laneDepth.hasOwnProperty(excludedVertex.id)) {
          laneDepth[excludedVertex.id] = 1;
        }
      }
    }
    /** Add swimlanes */
    let laneGap = 0;
    let minLaneGap = 180;

    graph.getModel().beginUpdate();
    try {
      for (let perspective of this.elMap[0]) {
        var layer = this.root.insert(new mxCell());
        var lane = graph.insertVertex(layer, perspective.id, '<table><tr><td><span style="margin-left: -15px;"><font style="display:inline-block;max-width:150px;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis;white-space:nowrap;" title="' + perspective.name + '">' + perspective.name + '</font></span></td><td><span class="noselect ncmxg-perspective" id=' + perspective.id + ' onClick="nc.mxg.menuCallback(\'' + perspective.id + '\')" style="color:#757575;font-weight:bold;font-size:14px;cursor:pointer;"><i style="position: relative;top: -2px;right: -10px;" class="fas fa-ellipsis-h ml-2" title="Options"></i></span></td></tr></table>', 0, laneGap, this.gwidth, 20 + (laneDepth[perspective.id] * minLaneGap), ';CSTSWLANE;horizontal=1;align=left;spacingLeft=15;spacingRight=15;');
        laneGap += laneDepth[perspective.id] * minLaneGap;
        lane.setConnectable(false);
        //use foldable=0 to hide the expander icon in swimlane title
        lane.setStyle(lane.getStyle().concat('swimlaneFillColor=#eee;foldable=0;resizable=1'));
        graph.translateCell(lane, 0, -35);
      }
    } finally {
      graph.getModel().endUpdate();
    }
  }

  private addNodes(graph: any) {
    let layers = {};

    let compactTreelayout = new mxCompactTreeLayout(graph, false);
    compactTreelayout.useBoundingBox = false;
    compactTreelayout.edgeRouting = false;
    compactTreelayout.levelDistance = 30;
    compactTreelayout.nodeDistance = 50;
    compactTreelayout.resizeParent = true;
    compactTreelayout.moveParent = false;
    compactTreelayout.invert = true;
    graph.keepEdgesInBackground = false;

    let layerX = 0;
    let visitedPerspective = 0;
    for (let node of this.elMap[1]) {
      let offsetX = 0;

      if (layers[node.parentId] == undefined || layers[node.parentId].length == undefined) {
        layers[node.parentId] = [];
      }

      let newLayer = new mxCell();
      newLayer.setId(node.name.trim().replace(/\s/g, "_").toLowerCase());
      layers[node.parentId].push(graph.model.getCell(node.parentId).insert(newLayer));

      if (visitedPerspective == Object.keys(layers).indexOf(node.parentId)) {
        if (layers[node.parentId].length > 1) {
          layerX += layers[node.parentId][layers[node.parentId].length - 2].getGeometry().width + 100;
        } else {
          layerX = 0;
        }
      } else {
        layerX = 0;
        visitedPerspective = Object.keys(layers).indexOf(node.parentId);
      }
      //Adjust initial x position for each layer
      let xDelta = layerX + 30;
      let currentLayer = layers[node.parentId][layers[node.parentId].length - 1];
      currentLayer.setGeometry(new mxGeometry(xDelta, 0, 0, 0));
      graph.getModel().beginUpdate();

      let insertedNode = null;
      try {
        insertedNode = graph.insertVertex(currentLayer, node.id, null, 0, 0, this.nodeDim.w, this.nodeDim.h, ';ROUNDED;fillColor=#fff;foldable=0;sourcePortConstraint=north;targetPortConstraint=south');
        var nameBlock = graph.insertVertex(insertedNode, null, '<div style="width:220px;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis" title="' + node.name + '">' + node.name + '</div>', 1, 1, 240, 16, 'fontColor=#000;fontSize=14;strokeOpacity=0;align=left;verticalAlign=top;fillColor=none;', true);
        nameBlock.geometry.offset = new mxPoint(-281, -55);

        var descBlock = graph.insertVertex(insertedNode, null, '<div style="width:220px;height:30px;overflow:hidden;word-wrap:break-word;white-space:break-spaces;text-overflow:ellipsis;" title="' + node.description + '">' + node.description + '</div>', 1, 1, 240, 32, 'fontSize=12;strokeOpacity=0;align=left;verticalAlign=top;fillColor=none;', true);
        descBlock.geometry.offset = new mxPoint(-280, -36);

        var actionsBlock = graph.insertVertex(insertedNode, null, '<span class="noselect" id=' + node.id + ' onClick="nc.mxg.menuCallback(\'' + node.id + '\')" style="color:#757575;font-weight:bold;font-size:14px;cursor:pointer;"><i class="fas fa-ellipsis-h ml-2" title="Options"></i></span>', 1, 1, 30, 60, 'fontSize=12;strokeOpacity=0;align=center;verticalAlign=middle;fillColor=none;', true);
        actionsBlock.geometry.offset = new mxPoint(-30, -60);
        for (let icon of node.shapeTags) {
          var overlay = new mxCellOverlay(new mxImage('assets/mxgraph/images/' + icon + '.svg', 14, 14), 'Overlay tooltip', mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, new mxPoint(offsetX, 0));
          graph.addCellOverlay(insertedNode, overlay);
          offsetX += 14;
        }

        this.colorTabMap[node.id] = node.color;

        if (node.children.length > 0) {
          this.addChildNodes(graph, currentLayer, insertedNode, node.children)
        }

      } finally {
        graph.getModel().endUpdate();
      }
      compactTreelayout.execute(currentLayer);
      /**
       * Finally adjust height to mid of the swimlane for each layer
       * where 40 is half of swimlane title height (mxConstants.STYLE_STARTSIZE)
       * */
      let yMid = (graph.model.getCell(node.parentId).getGeometry().height - currentLayer.getGeometry().height) / 2 - (this.swlDim.labelHt / 2);
      graph.translateCell(currentLayer, 0, yMid)
    }

    this.allLayers = layers;
  }

  private addChildNodes(graph: any, currentLayer: any, nodeParent: any, children: Array<any>) {
    let offsetX = 0;
    for (let child of children) {
      let currentInserted = graph.insertVertex(currentLayer, child.id, null, 0, 0, this.nodeDim.w, this.nodeDim.h, ';ROUNDED;fillColor=#fff;whiteSpace=wrap;');
      graph.insertEdge(currentLayer, null, '', currentInserted, nodeParent, ';TBEdge;strokeColor=#B5B5B5;strokeWidth=2');

      for (let icon of child.shapeTags) {
        var overlay = new mxCellOverlay(new mxImage('assets/mxgraph/images/' + icon + '.svg', 14, 14), 'Overlay tooltip', mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, new mxPoint(offsetX, 0));
        graph.addCellOverlay(currentInserted, overlay);
        offsetX += 14;
      }

      var nameBlock = graph.insertVertex(currentInserted, null, '<div style="width:220px;overflow:hidden;word-wrap:break-word;text-overflow:ellipsis" title="' + child.name + '">' + child.name + '</div>', 1, 1, 240, 16, 'fontColor=#000;fontSize=14;strokeOpacity=0;align=left;verticalAlign=top;fillColor=none;', true);
      nameBlock.geometry.offset = new mxPoint(-281, -55);

      var descBlock = graph.insertVertex(currentInserted, null, '<div style="width:220px;height:30px;overflow:hidden;word-wrap:break-word;white-space:break-spaces;text-overflow:ellipsis;" title="' + child.description + '">' + child.description + '</div>', 1, 1, 240, 32, 'fontSize=12;strokeOpacity=0;align=left;verticalAlign=top;fillColor=none;', true);
      descBlock.geometry.offset = new mxPoint(-280, -36);

      var actionsBlock = graph.insertVertex(currentInserted, null, '<span class="noselect" id=' + child.id + ' onClick="nc.mxg.menuCallback(\'' + child.id + '\')" style="color:#757575;font-weight:bold;font-size:14px;cursor:pointer;"><i class="fas fa-ellipsis-h ml-2" title="Options"></i></span>', 1, 1, 30, 60, 'fontSize=12;strokeOpacity=0;align=center;verticalAlign=middle;fillColor=none;', true);
      actionsBlock.geometry.offset = new mxPoint(-30, -60);
      this.colorTabMap[child.id] = child.color;

      if (child.children.length > 0) {
        this.addChildNodes(graph, currentLayer, currentInserted, child.children);
      }
    }
  }

  private makeNodeConnections(graph: any, parent: any) {
    let coordinateMap:Map<string, any> = this.mapAbsoluteNodeCoordinates();
    this.gdata.forEach(perspective => {
      perspective.connections.forEach(item => {
        /**
         * To avoid edge duplication
         * connections are listed in
         * perspective containing <from> nodes
         */
        let fromNode = graph.model.getCell(item.from);
        let toNode = graph.model.getCell(item.to);

        let ed = graph.insertEdge(this.root, null, null, fromNode, toNode, ';LinkEdge;strokeColor=#8796b7;strokeWidth=2;sourcePort=north;targetPort=north;rounded=0');
        let ctrlPts = [];
        let srcAbsCrd = coordinateMap.get(ed.source.id);
        let tgtAbsCrd = coordinateMap.get(ed.target.id);

        /** ____
         * |a   |
         * |   b|
         * |____|
         */
        if (srcAbsCrd.xs <= tgtAbsCrd.xs && srcAbsCrd.ys < tgtAbsCrd.ys) {
          ctrlPts.push(new mxPoint(srcAbsCrd.xs + (srcAbsCrd.width / 2), srcAbsCrd.ye + 30 ));
          ctrlPts.push(new mxPoint(srcAbsCrd.xe + 30, srcAbsCrd.ye + 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xe + 30, tgtAbsCrd.ys - 30));
          ctrlPts.push(new mxPoint(tgtAbsCrd.xs + (tgtAbsCrd.width / 2), tgtAbsCrd.ys - 30 ));
        }
        /** ____
         * |   b|
         * |a   |
         * |____|
         */
         else if (srcAbsCrd.xs <= tgtAbsCrd.xs && srcAbsCrd.ys > tgtAbsCrd.ys) {
          ctrlPts.push(new mxPoint(srcAbsCrd.xs + (srcAbsCrd.width / 2), srcAbsCrd.ys - 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xe + 30, srcAbsCrd.ys - 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xe + 30, tgtAbsCrd.ye + 30));
          ctrlPts.push(new mxPoint(tgtAbsCrd.xs + (tgtAbsCrd.width / 2), tgtAbsCrd.ye + 30));
        } 
        /** ___
         * |   a|
         * |b   |
         * |____|
         */
        else if (srcAbsCrd.xs > tgtAbsCrd.xs && srcAbsCrd.ys < tgtAbsCrd.ys) {
          ctrlPts.push(new mxPoint(srcAbsCrd.xs + (srcAbsCrd.width / 2), srcAbsCrd.ye + 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xs - 30, srcAbsCrd.ye + 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xs - 30, tgtAbsCrd.ys - 30));
          ctrlPts.push(new mxPoint(tgtAbsCrd.xs + (tgtAbsCrd.width / 2), tgtAbsCrd.ys - 30));
        } 
        /** ____
         * |b   |
         * |   a|
         * |____|
         */
        else if (srcAbsCrd.xs > tgtAbsCrd.xs && srcAbsCrd.ys > tgtAbsCrd.ys) {
          ctrlPts.push(new mxPoint(srcAbsCrd.xs + (srcAbsCrd.width / 2), srcAbsCrd.ys - 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xs - 30, srcAbsCrd.ys - 30));
          ctrlPts.push(new mxPoint(srcAbsCrd.xs - 30, tgtAbsCrd.ye + 30));
          ctrlPts.push(new mxPoint(tgtAbsCrd.xs + (tgtAbsCrd.width / 2), tgtAbsCrd.ye + 30));
        }

        ed.geometry.points = ctrlPts;
      });
    });
  }

  mapAbsoluteNodeCoordinates() {
    let coordinateMap = new Map();
    for (let pId in this.allLayers) {
      for (let node of this.allLayers[pId]) {
        for (let childNode of node.children) {
          if (!childNode.edge) {
            let w = node.geometry.width;
            let h = node.geometry.height;
            let xs = node.geometry.x + node.parent.geometry.x;
            let ys = node.geometry.y + node.parent.geometry.y
            let xe = node.geometry.x + node.parent.geometry.x + w;
            let ye = node.geometry.y + node.parent.geometry.y + h;
            coordinateMap.set(childNode.id, { xs: xs, xe: xe, ys: ys, ye: ye, width: w, height: h})
          }
        }
      }
    }

    return coordinateMap;
  }

  ngOnDestroy() {
    this.graph.destroy();
  }
}