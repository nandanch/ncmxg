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

	  public graphData = [
        {
            "id": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
            "name": "Finance",
            "color": "#000",
            "levelNumber": 1,
            "children": [
                {
                    "id": "39C9A0F152C82C6947E510B951D32E29D0D870B8AD62E178",
                    "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                    "name": "Generate more revenue",
                    "color": "#3f92f8",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": [
                        {
                            "id": "39C9A0F152C82C6947E510B951D32E29AB6FE00E50F263D7",
                            "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                            "name": "objec01",
                            "color": "#000",
                            "levelNumber": 3,
                            "shapeTags": [],
                            "children": []
                        },
                        {
                            "id": "39C9A0F152C82C6947E510B951D32E29AB6FE34E50F263D7",
                            "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                            "name": "objec02",
                            "color": "#0f0",
                            "levelNumber": 3,
                            "shapeTags": [],
                            "children": []
                        },
                        {
                            "id": "3E3GA0F152C82C6947E510B951D32E29AB6FE34E50F263D7",
                            "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                            "name": "objec03",
                            "color": "#0ff",
                            "levelNumber": 3,
                            "shapeTags": [],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "39C9A0F152C82C6947E510B951D32E29C87C8E91C11F043C",
                    "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                    "name": "Reduce losses",
                    "color": "#13e16a",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": []
                },
                {
                    "id": "39C9A0F152C82C6947E510B951D32E298D927F8C709585A2",
                    "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                    "name": "Get funding",
                    "color": "#ffff00",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": []
                },
                {
                    "id": "39C9A0F152C82C6947E510B951D32E29C0C92D8AEB671827",
                    "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                    "name": "test",
                    "color": "#008040",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": []
                },
                {
                    "id": "39C9A0F152C82C6947E510B951D32E29EE1609345C98F22C",
                    "parentId": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
                    "name": "test2",
                    "color": "#ff8000",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": []
                }
            ],
            "connections": [
                {
                    "from": "39C9A0F152C82C6947E510B951D32E29AB6FE00E50F263D7",
                    "to": "39C9A0F152C82C6947E510B951D32E29D0D870B8AD62E178"
                },
                {
                    "from": "39C9A0F152C82C6947E510B951D32E29AB6FE34E50F263D7",
                    "to": "39C9A0F152C82C6947E510B951D32E29D0D870B8AD62E178"
                },
                {
                    "from": "3E3GA0F152C82C6947E510B951D32E29AB6FE34E50F263D7",
                    "to": "39C9A0F152C82C6947E510B951D32E29D0D870B8AD62E178"
                }
            ]
        },
        {
            "id": "39C9A0F152C82C6947E510B951D32E29ACB905BAE0DE5E35",
            "name": "Customers",
            "color": "#000",
            "levelNumber": 1,
            "children": [
                {
                    "id": "39C9A0F152C82C6947E510B951D32E29D15A2FA244AAD89A",
                    "parentId": "39C9A0F152C82C6947E510B951D32E29ACB905BAE0DE5E35",
                    "name": "Get more customers",
                    "color": "#000",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": []
                }
            ],
            "connections": [
                
            ]
        },
        {
            "id": "39C9A0F152C82C6947E510B951D32E295C47ED392D341065",
            "name": "p1",
            "color": "#000",
            "levelNumber": 1,
            "children": [
                {
                    "id": "39C9A0F152C82C6947E510B951D32E298CF1D96B4082997C",
                    "parentId": "39C9A0F152C82C6947E510B951D32E295C47ED392D341065",
                    "name": "t1",
                    "color": "#000",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": [
                        {
                            "id": "39C9A0F152C82C6947E510B951D32E291FF11DF5712CF1E6",
                            "parentId": "39C9A0F152C82C6947E510B951D32E295C47ED392D341065",
                            "name": "o1",
                            "color": "#000",
                            "levelNumber": 3,
                            "shapeTags": [],
                            "children": []
                        }
                    ]
                },
                {
                    "id": "39C9A0F152C82C6947E510B951D32E2940CC8DE3C4CAA5DF",
                    "parentId": "39C9A0F152C82C6947E510B951D32E295C47ED392D341065",
                    "name": "t2",
                    "color": "#000",
                    "levelNumber": 2,
                    "shapeTags": [],
                    "children": []
                }
            ],
            "connections": [
                {
                    "from": "39C9A0F152C82C6947E510B951D32E291FF11DF5712CF1E6",
                    "to": "39C9A0F152C82C6947E510B951D32E298CF1D96B4082997C"
                }
            ]
        },
        {
            "id": "39C9A0F152C82C6947E510B951D32E29A2EECBB291898CF0",
            "name": "p2",
            "color": "#000",
            "levelNumber": 1,
            "children": [],
            "connections": []
        },
        {
            "id": "39C9A0F152C82C6947E510B951D32E299F6FE171771B8CB8",
            "name": "p3",
            "color": "#000",
            "levelNumber": 1,
            "children": [],
            "connections": []
        },
        {
            "id": "39C9A0F152C82C6947E510B951D32E29CBD8894A654F7BC3",
            "name": "p4",
            "color": "#000",
            "levelNumber": 1,
            "children": [],
            "connections": []
        }
    ];	

	  ngOnInit(){
		  this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
	  }
}
