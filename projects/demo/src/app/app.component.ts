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

    public selectedNode: any;

    public isCalledBack(value) {
        this.selectedNode = value.id;
        //console.log(`Outside component: selected menu item ${JSON.stringify(value)}`);
    }

    public readItemType(value) {
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

    public menuItemClicked(val: string, actId: string) {
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
		"id": "39C9A0F152C82C6947E510B951D32E29F250AFE779EA1620",
		"name": "1",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "v1",
				"parentId": "39C9A0F152C82C6947E510B951D32E29F250AFE779EA1620",
				"name": "v1",
				"description": null,
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "v2",
						"parentId": "39C9A0F152C82C6947E510B951D32E29F250AFE779EA1620",
						"name": "v2",
						"description": null,
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "v3",
								"parentId": "39C9A0F152C82C6947E510B951D32E29F250AFE779EA1620",
								"name": "v3",
								"description": null,
								"color": "#000",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}, {
								"id": "v4",
								"parentId": "39C9A0F152C82C6947E510B951D32E29F250AFE779EA1620",
								"name": "v4",
								"description": null,
								"color": "#000",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "v5",
				"parentId": "39C9A0F152C82C6947E510B951D32E29F250AFE779EA1620",
				"name": "v5",
				"description": null,
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
				"from": "v1",
				"to": "v7"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E291BA29AFA77C0F0AE",
		"name": "2",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "v6",
				"parentId": "39C9A0F152C82C6947E510B951D32E291BA29AFA77C0F0AE",
				"name": "v6",
				"description": null,
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "v7",
				"parentId": "39C9A0F152C82C6947E510B951D32E291BA29AFA77C0F0AE",
				"name": "v7",
				"description": null,
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
				"from": "v6",
				"to": "v1"
			}
		]
	}
];

    ngOnInit() {
        this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
    }
}
