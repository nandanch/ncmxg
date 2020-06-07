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
			"children": [],
			"connections": []
		}, {
			"id": "39C9A0F152C82C6947E510B951D32E292575576283890044",
			"name": "customers",
			"color": "#000",
			"levelNumber": 1,
			"children": [],
			"connections": []
		}
	];

    ngOnInit() {
        this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
    }
}
