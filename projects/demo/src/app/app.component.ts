import { Component, Output, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NcmxgraphComponent } from '../../../ncmxg/src/public_api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private myrenderer: Renderer2) { }

	//public graphData = [];

	title = 'demo';

	public selectedNode:any;

	public isCalledBack(value) {
    this.selectedNode = value.id;
    //console.log(`Outside component: selected menu item ${JSON.stringify(value)}`);
	}
  
	public readItemType(value){
		console.log("read id: ", value);
		this.selectedNode = value;
	}

	public menuItems = [{
		"id": "_actionAdd",
		"label": "Add"
	}, {
		"id": "_actionEdit",
		"label": "Edit"
	}, {
		"id": "_actionDelete",
		"label": "Delete"
	}, {
		"id": "_actionConnect",
		"label": "Connect"
	}];

	public menuItemClicked(val:string, actId:string){
		console.log(`For node: ${val}, actionId: ${actId}`);
	}

	public levelMap = {};
	private mapNodeLevels(data: Array<any>, levelMap: any) {
		for (let parent of data) {
		  levelMap[parent.id] = parent.levelNumber;
		  if (parent.children != null || parent.children.length > 0) {
			this.mapNodeLevels(parent.children, levelMap);
		  }
		}
		return levelMap;
	  }

	  public graphData = [{
        "id": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
        "name": "p1",
        "color": "#000",
        "levelNumber": 1,
        "children": [{
                "id": "39C9A0F152C82C6947E510B951D32E294C531DA26C7FA55D",
                "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                "name": "t1",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": [{
                        "id": "39C9A0F152C82C6947E510B951D32E296374A51A1005DE7E",
                        "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                        "name": "o1",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }
                ]
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E29305628EB9837C3A6",
                "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                "name": "this is a very long name test for the first level of strategy map nodes",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": []
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E29727E6B331F5A09C5",
                "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                "name": "t3",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": [{
                        "id": "39C9A0F152C82C6947E510B951D32E2901A7F80231A4495F",
                        "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                        "name": "o2",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }
                ]
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E29E61D6A01347E3FB7",
                "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                "name": "t4",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": []
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E2968E0CE7537008831",
                "parentId": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
                "name": "t5",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": []
            }
        ],
        "connections": [{
                "from": "39C9A0F152C82C6947E510B951D32E294C531DA26C7FA55D",
                "to": "39C9A0F152C82C6947E510B951D32E29C4E3C897DE4DC796"
            }, {
                "from": "39C9A0F152C82C6947E510B951D32E29E61D6A01347E3FB7",
                "to": "39C9A0F152C82C6947E510B951D32E29A61BD2CA344CEA3B"
            }
        ]
    }, {
        "id": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
        "name": "p2",
        "color": "#000",
        "levelNumber": 1,
        "children": [{
                "id": "39C9A0F152C82C6947E510B951D32E29C4E3C897DE4DC796",
                "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                "name": "pt1",
                "color": "#e62437",
                "levelNumber": 2,
                "shapeTags": [],
                "children": [{
                        "id": "39C9A0F152C82C6947E510B951D32E29DA8979A4EF179404",
                        "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                        "name": "po1",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }, {
                        "id": "39C9A0F152C82C6947E510B951D32E29EB7227F3A0224518",
                        "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                        "name": "po2",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }, {
                        "id": "39C9A0F152C82C6947E510B951D32E2918778B0C04A2EF32",
                        "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                        "name": "po4",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }, {
                        "id": "39C9A0F152C82C6947E510B951D32E2943638987AF1E7601",
                        "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                        "name": "po5",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }
                ]
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E29CCB56BE636216800",
                "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                "name": "pt2",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": []
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E29A61BD2CA344CEA3B",
                "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                "name": "pt3",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": [{
                        "id": "39C9A0F152C82C6947E510B951D32E29AE8DAD1BC2BA678B",
                        "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                        "name": "po3",
                        "color": "#000",
                        "levelNumber": 3,
                        "shapeTags": [],
                        "children": []
                    }
                ]
            }, {
                "id": "39C9A0F152C82C6947E510B951D32E2901445C966072A881",
                "parentId": "39C9A0F152C82C6947E510B951D32E29EC5BCA021A25A95A",
                "name": "pt4",
                "color": "#000",
                "levelNumber": 2,
                "shapeTags": [],
                "children": []
            }
        ],
        "connections": [{
                "from": "39C9A0F152C82C6947E510B951D32E29C4E3C897DE4DC796",
                "to": "39C9A0F152C82C6947E510B951D32E29727E6B331F5A09C5"
            }, {
                "from": "39C9A0F152C82C6947E510B951D32E29C4E3C897DE4DC796",
                "to": "39C9A0F152C82C6947E510B951D32E29305628EB9837C3A6"
            }
        ]
    }
];

	  ngOnInit(){
		  this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
	  }
}
