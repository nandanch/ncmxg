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
		"id": "39C9A0F152C82C6947E510B951D32E2997A5702BEE3C4520",
		"name": "Financial Perspective",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29FCBD0EC136833364",
				"parentId": "39C9A0F152C82C6947E510B951D32E2997A5702BEE3C4520",
				"name": "Revenue Growth",
				"description": "Focus on sustainable revenue growth",
				"color": "#80ff80",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29F2B014648D79DAC3",
				"parentId": "39C9A0F152C82C6947E510B951D32E2997A5702BEE3C4520",
				"name": "Cost Management",
				"description": "To execute within the agreed cost budget without compromising quality",
				"color": "#80ff80",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29D8AAB0C153D6814E",
				"parentId": "39C9A0F152C82C6947E510B951D32E2997A5702BEE3C4520",
				"name": "Fund raising/Financing",
				"description": "Secure funding for phase 1 of shams media city development",
				"color": "#00ff80",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2972AACF423E2B3CBD",
		"name": "Customer Perspective",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E298CD079C9838C4D01",
				"parentId": "39C9A0F152C82C6947E510B951D32E2972AACF423E2B3CBD",
				"name": "Customer acquisition",
				"description": "Increase the customer base",
				"color": "#ff8080",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E298E13351968F1CAFE",
						"parentId": "39C9A0F152C82C6947E510B951D32E2972AACF423E2B3CBD",
						"name": "Media sector focus",
						"description": "To increase media sector proportion ",
						"color": "#ff0080",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}, {
						"id": "39C9A0F152C82C6947E510B951D32E29F45B9CB607272627",
						"parentId": "39C9A0F152C82C6947E510B951D32E2972AACF423E2B3CBD",
						"name": "International",
						"description": "To increase the international proportion",
						"color": "#ff0080",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E296373EC66E34B7DE4",
				"parentId": "39C9A0F152C82C6947E510B951D32E2972AACF423E2B3CBD",
				"name": "Customer retention",
				"description": "To maximize retention of existing customers",
				"color": "#ff8080",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E298CD079C9838C4D01",
				"to": "39C9A0F152C82C6947E510B951D32E29D089FB6951B3ABFE"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E29B88BC3A6F3CED64F",
		"name": "Customer Financial",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29F08F699FB57C0A1A",
				"parentId": "39C9A0F152C82C6947E510B951D32E29B88BC3A6F3CED64F",
				"name": "Develop media and creative talent",
				"description": "To impart technical knowledge & skills to expand the media talent pool",
				"color": "#ffff00",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E292C664E0A978CD7F9",
				"parentId": "39C9A0F152C82C6947E510B951D32E29B88BC3A6F3CED64F",
				"name": "Customer experience",
				"description": "To meet and exceed customer needs that leads to satisfied customers",
				"color": "#ffff00",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E293608B300651A9FEF",
		"name": "Brand perspective",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29D089FB6951B3ABFE",
				"parentId": "39C9A0F152C82C6947E510B951D32E293608B300651A9FEF",
				"name": "Brand Positioning ",
				"description": "To establish a brand identity that attracts customers",
				"color": "#0000ff",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E29D089FB6951B3ABFE",
				"to": "39C9A0F152C82C6947E510B951D32E292C664E0A978CD7F9"
			}
		]
	}
];

    ngOnInit() {
        this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
    }
}
