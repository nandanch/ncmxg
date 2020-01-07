/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxRecursiveParallelEdgeLayout
 * 
 * Extends <mxGraphLayout> for arranging parallel edges. This layout works
 * on edges for all pairs of vertices where there is more than one edge
 * connecting the latter.
 * 
 * Example:
 * 
 * (code)
 * var layout = new mxRecursiveParallelEdgeLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 * 
 * To run the layout for the parallel edges of a changed edge only, the
 * following code can be used.
 * 
 * (code)
 * var layout = new mxRecursiveParallelEdgeLayout(graph);
 * 
 * graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt)
 * {
 *   var model = graph.getModel();
 *   var edge = evt.getProperty('edge');
 *   var src = model.getTerminal(edge, true);
 *   var trg = model.getTerminal(edge, false);
 *   
 *   layout.isEdgeIgnored = function(edge2)
 *   {
 *     var src2 = model.getTerminal(edge2, true);
 *     var trg2 = model.getTerminal(edge2, false);
 *     
 *     return !(model.isEdge(edge2) && ((src == src2 && trg == trg2) || (src == trg2 && trg == src2)));
 *   };
 *   
 *   layout.execute(graph.getDefaultParent());
 * });
 * (end)
 * 
 * Constructor: mxCompactTreeLayout
 * 
 * Constructs a new fast organic layout for the specified graph.
 */
function mxRecursiveParallelEdgeLayout(graph)
{
	mxParallelEdgeLayout.call(this, graph);
};

/**
 * Extends mxGraphLayout.
 */
mxRecursiveParallelEdgeLayout.prototype = new mxGraphLayout();
mxRecursiveParallelEdgeLayout.prototype.constructor = mxRecursiveParallelEdgeLayout;

/**
 * Variable: spacing
 * 
 * Defines the spacing between the parallels. Default is 20.
 */
mxRecursiveParallelEdgeLayout.prototype.spacing = 20;

/**
 * Function: execute
 * 
 * Implements <mxGraphLayout.execute>.
 */

mxRecursiveParallelEdgeLayout.prototype.execute = function(parent)
{
    this.getAllVertices(parent)
    //console.log(this.getAllVertices(parent));
    var lookup = this.findParallels(parent);    
	
	this.graph.model.beginUpdate();	
	try
	{
		for (var i in lookup)
		{
			var parallels = lookup[i];
			if (parallels.length > 1)
			{
				this.layout(parallels);
			}
		}
	}
	finally
	{
		this.graph.model.endUpdate();
	}
};

/**
 * Function: getAllVertices
 * 
 * Finds the all vertices in the given parent.
 */
mxRecursiveParallelEdgeLayout.prototype.getAllVertices = function(parent){
    var lookup = {}, viewLookup = {};
    if(parent.children != null && parent.children.length > 0){
        parent.children.forEach(subNode => {
            if(subNode.vertex && !subNode.connectable){
                if(subNode.children != null && subNode.children.length > 0){
                    subNode.children.forEach(node => {
                        if(node.vertex && node.connectable){
                            if(node.edges != null && node.edges.length > 1){
                                node.edges.forEach(edge => {
                                    var view = this.graph.getView();
                                    var model = this.graph.getModel();
                                    var src = model.getGeometry(view.getVisibleTerminal(edge, true));
                                    var trg = model.getGeometry(view.getVisibleTerminal(edge, false));

                                    //console.log(edge.value, ":", src, trg);

                                    if(viewLookup["x"+src.x+"y"+src.y+"w"+src.width+"h"+src.height] == null){
                                        viewLookup["x"+src.x+"y"+src.y+"w"+src.width+"h"+src.height] = [];
                                    } else {
                                        viewLookup["x"+src.x+"y"+src.y+"w"+src.width+"h"+src.height].push(edge);
                                    }
                                    if(viewLookup["x"+trg.x+"y"+trg.y+"w"+trg.width+"h"+trg.height] == null){
                                        viewLookup["x"+trg.x+"y"+trg.y+"w"+trg.width+"h"+trg.height] = [];
                                    } else {
                                        viewLookup["x"+trg.x+"y"+trg.y+"w"+trg.width+"h"+trg.height].push(edge);
                                    }
                                    /* if(viewLookup["y"+src.y] == null){
                                        viewLookup["y"+src.y] = [];
                                    } else {
                                        viewLookup["y"+src.y].push(edge);
                                    }
                                    if(viewLookup["y"+trg.y] == null){
                                        viewLookup["y"+trg.y] = [];
                                    } else {
                                        viewLookup["y"+trg.y].push(edge);
                                    } */

                                    //console.log(viewLookup);

                                    var id = this.getEdgeId(edge);
                                    if (id != null) {
                                        if (lookup[id] == null) {
                                            lookup[id] = [];
                                        }

                                        lookup[id].push(edge);
                                    }
                                })
                            }
                        }
                    })
                }
            }
        });
    }
    //console.log(parallelEdges);
    return lookup;
}

/**
 * Function: findParallels
 * 
 * Finds the parallel edges in the given parent.
 */
mxRecursiveParallelEdgeLayout.prototype.findParallels = function(parent)
{
	var model = this.graph.getModel();
	var lookup = [];
	var childCount = model.getChildCount(parent);
	
	for (var i = 0; i < childCount; i++)
	{
		var child = model.getChildAt(parent, i);
		
		if (!this.isEdgeIgnored(child))
		{
			var id = this.getEdgeId(child);
			
			if (id != null)
			{
				if (lookup[id] == null)
				{
					lookup[id] = [];
				}
				
				lookup[id].push(child);
			}
        }
    }
    
	return lookup;
};

/**
 * Function: getEdgeId
 * 
 * Returns a unique ID for the given edge. The id is independent of the
 * edge direction and is built using the visible terminal of the given
 * edge.
 */
mxRecursiveParallelEdgeLayout.prototype.getEdgeId = function(edge)
{
	var view = this.graph.getView();
	
	// Cannot used cached visible terminal because this could be triggered in BEFORE_UNDO
	var src = view.getVisibleTerminal(edge, true);
	var trg = view.getVisibleTerminal(edge, false);

	if (src != null && trg != null)
	{
		src = mxObjectIdentity.get(src);
		trg = mxObjectIdentity.get(trg);
		
		return (src > trg) ? trg + '-' + src : src + '-' + trg;
	}
	
	return null;
};

/**
 * Function: layout
 * 
 * Lays out the parallel edges in the given array.
 */
mxRecursiveParallelEdgeLayout.prototype.layout = function(parallels)
{
    console.log(parallels);
	var edge = parallels[0];
	var view = this.graph.getView();
	var model = this.graph.getModel();
	var src = model.getGeometry(view.getVisibleTerminal(edge, true));
	var trg = model.getGeometry(view.getVisibleTerminal(edge, false));
	
	// Routes multiple loops
	if (src == trg)
	{
		var x0 = src.x + src.width + this.spacing;
		var y0 = src.y + src.height / 2;

		for (var i = 0; i < parallels.length; i++)
		{
			this.route(parallels[i], x0, y0);
			x0 += this.spacing;
		}
	}
	else if (src != null && trg != null)
	{
		// Routes parallel edges
		var scx = src.x + src.width / 2;
		var scy = src.y + src.height / 2;
		
		var tcx = trg.x + trg.width / 2;
		var tcy = trg.y + trg.height / 2;
		
		var dx = tcx - scx;
		var dy = tcy - scy;

		var len = Math.sqrt(dx * dx + dy * dy);
		
		if (len > 0)
		{
			var x0 = scx + dx / 2;
			var y0 = scy + dy / 2;
			
			var nx = dy * this.spacing / len;
			var ny = dx * this.spacing / len;
			
			x0 += nx * (parallels.length - 1) / 2;
			y0 -= ny * (parallels.length - 1) / 2;
	
			for (var i = 0; i < parallels.length; i++)
			{
				this.route(parallels[i], x0, y0);
				x0 -= nx;
				y0 += ny;
			}
		}
	}
};

/**
 * Function: route
 * 
 * Routes the given edge via the given point.
 */
mxRecursiveParallelEdgeLayout.prototype.route = function(edge, x, y)
{
	if (this.graph.isCellMovable(edge))
	{
		this.setEdgePoints(edge, [new mxPoint(x, y)]);
	}
};

//__mxOutput.mxRecursiveParallelEdgeLayout = typeof mxRecursiveParallelEdgeLayout !== 'undefined' ? mxRecursiveParallelEdgeLayout : undefined;

export {mxRecursiveParallelEdgeLayout};