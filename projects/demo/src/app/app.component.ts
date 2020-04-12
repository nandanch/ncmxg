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
				"id": "39C9A0F152C82C6947E510B951D32E29E3E411BAE5459447",
				"parentId": "39C9A0F152C82C6947E510B951D32E29587A3B42EA8A798F",
				"name": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
				"description": "description",
				"color": "#2e9833",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29595A5FAA8593D035",
				"parentId": "39C9A0F152C82C6947E510B951D32E29587A3B42EA8A798F",
				"name": "Reduce Expenses",
				"description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
				"color": "#2821be",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2957811650D176BBF5",
		"name": "Customers",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"parentId": "39C9A0F152C82C6947E510B951D32E2957811650D176BBF5",
				"name": "Existing",
				"description": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29F00B57D6215B8C63",
				"parentId": "39C9A0F152C82C6947E510B951D32E2957811650D176BBF5",
				"name": "New",
				"description": "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E29E3E411BAE5459447"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E29595A5FAA8593D035"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E29FD779640E35BA7B7"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E295E392F77086A9F26"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E29C047CA1CA907BC67"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C",
				"to": "39C9A0F152C82C6947E510B951D32E298E39A25B7441F877"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
		"name": "1",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29FD779640E35BA7B7",
				"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
				"name": "s",
				"description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E295E392F77086A9F26",
				"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
				"name": "a",
				"description": "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29B8FBC38C5F11C333",
						"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
						"name": "p",
						"description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}, {
						"id": "39C9A0F152C82C6947E510B951D32E2927EBA28F387B2670",
						"parentId": "39C9A0F152C82C6947E510B951D32E2958D3AC6001221998",
						"name": "l",
						"description": "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}
				]
			}
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
		"name": "2",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29C047CA1CA907BC67",
				"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
				"name": "q",
				"description": "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
				"name": "e",
				"description": "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E298E39A25B7441F877",
				"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
				"name": "k",
				"description": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
				"color": "#000",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29D5E3CD3591F3D6B3",
						"parentId": "39C9A0F152C82C6947E510B951D32E2977D8E5B0FFB48816",
						"name": "h",
						"description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					}
				]
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"to": "39C9A0F152C82C6947E510B951D32E29595A5FAA8593D035"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"to": "39C9A0F152C82C6947E510B951D32E29E3E411BAE5459447"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"to": "39C9A0F152C82C6947E510B951D32E290AED916C41D1CF5C"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"to": "39C9A0F152C82C6947E510B951D32E29F00B57D6215B8C63"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"to": "39C9A0F152C82C6947E510B951D32E29FD779640E35BA7B7"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296BB1260FC9E67AF9",
				"to": "39C9A0F152C82C6947E510B951D32E295E392F77086A9F26"
			}
		]
	}
];

	  ngOnInit(){
		  this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
	  }
}
