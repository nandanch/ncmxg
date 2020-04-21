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
		"id": "39C9A0F152C82C6947E510B951D32E29587A3B42EA8A798F",
		"name": "Finance",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "v1",
				"parentId": "39C9A0F152C82C6947E510B951D32E29587A3B42EA8A798F",
				"name": "v1",
				"description": "description",
				"color": "#2e9833",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "v2",
				"parentId": "39C9A0F152C82C6947E510B951D32E29587A3B42EA8A798F",
				"name": "v2",
				"description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
				"color": "#2821be",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
            "from": "v2",
            "to": "v12"
        }, {
            "from": "v1",
            "to": "v10"
        }]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2957811650D176BBF5",
		"name": "Customers",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "v3",
				"parentId": "39C9A0F152C82C6947E510B951D32E2957811650D176BBF5",
				"name": "v3",
				"description": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "v4",
				"parentId": "39C9A0F152C82C6947E510B951D32E2957811650D176BBF5",
				"name": "v4",
				"description": "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
				"from": "v3",
				"to": "v1"
			}, {
				"from": "v3",
				"to": "v2"
			}, {
				"from": "v3",
				"to": "v5"
			}, {
				"from": "v3",
				"to": "v6"
			}, {
				"from": "v3",
				"to": "v11"
			}, {
				"from": "v3",
				"to": "v12"
			}, {
				"from": "v3",
				"to": "v13"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
		"name": "1",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "v5",
				"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
				"name": "s",
				"description": "v5",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "v6",
				"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
				"name": "v6",
				"description": "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "v7",
						"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
						"name": "v7",
						"description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}, {
						"id": "v8",
						"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
						"name": "v8",
						"description": "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}, {
						"id": "v9",
						"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
						"name": "v9",
						"description": "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}
				]
			}, {
                "id": "v10",
                "parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
                "name": "v10",
                "description": "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
                "color": "#000",
                "levelNumber": 3,
                "shapeTags": [],
                "children": []
            }
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
		"name": "2",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "v11",
				"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
				"name": "v11",
				"description": "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "v12",
				"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
				"name": "v12",
				"description": "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "v13",
				"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
				"name": "v13",
				"description": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "v14",
						"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
						"name": "v14",
						"description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}, {
						"id": "v15",
						"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
						"name": "v15",
						"description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}
				]
			}
		],
		"connections": [
           /*  {
				"from": "v12",
				"to": "v2"
			}, */ {
				"from": "v12",
				"to": "v1"
			}, {
				"from": "v12",
				"to": "v3"
			}, {
				"from": "v12",
				"to": "v4"
			}, {
				"from": "v12",
				"to": "v5"
			}, {
				"from": "v12",
				"to": "v6"
            }
            , {
				"from": "v14",
				"to": "v8"
			}, {
				"from": "v14",
				"to": "v9"
			}
		]
	}
];

	  ngOnInit(){
		  this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
	  }
}
