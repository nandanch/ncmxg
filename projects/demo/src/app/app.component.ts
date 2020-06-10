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
		"id": "39C9A0F152C82C6947E510B951D32E29680496EAD3A64F2B",
		"name": "finance",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
			"id": "39C9A0F152C82C6947E510B951D32E290D99046F594DA564",
			"parentId": "39C9A0F152C82C6947E510B951D32E29680496EAD3A64F2B",
			"name": "one2",
			"description": null,
			"color": "#000",
			"levelNumber": 2,
			"shapeTags": [],
			"children": [{
					"id": "39C9A0F152C82C6947E510B951D32E29FDCE2A22A1C90E59",
					"parentId": "39C9A0F152C82C6947E510B951D32E29680496EAD3A64F2B",
					"name": "one21",
					"description": null,
					"color": "#000",
					"levelNumber": 3,
					"shapeTags": [],
					"children": []
				},{
					"id": "39C9A0F152C82C6947E510B951D32E29FDCE2A22A1C90E591",
					"parentId": "39C9A0F152C82C6947E510B951D32E29680496EAD3A64F2B",
					"name": "one211",
					"description": null,
					"color": "#000",
					"levelNumber": 3,
					"shapeTags": [],
					"children": []
				},{
					"id": "39C9A0F152C82C6947E510B951D32E29FDCE2A22A1C90E592",
					"parentId": "39C9A0F152C82C6947E510B951D32E29680496EAD3A64F2B",
					"name": "one212",
					"description": null,
					"color": "#000",
					"levelNumber": 3,
					"shapeTags": [],
					"children": []
				}
			]
		},{
				"id": "39C9A0F152C82C6947E510B951D32E29BF56ACAA24AF7A8E",
				"parentId": "39C9A0F152C82C6947E510B951D32E29680496EAD3A64F2B",
				"name": "one1",
				"description": "one1",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [
				]
			}
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E292575576283890044",
		"name": "customers",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29D58E840678F57FC0",
				"parentId": "39C9A0F152C82C6947E510B951D32E292575576283890044",
				"name": "two1",
				"description": null,
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E298D1FCAD5C9EC1D33",
				"parentId": "39C9A0F152C82C6947E510B951D32E292575576283890044",
				"name": "two2",
				"description": null,
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": []
	}
];

    ngOnInit() {
        this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
    }
}
