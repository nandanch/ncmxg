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
		"id": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
		"name": "Financial",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29988D83E9B0D00583",
				"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
				"name": "Increase Revenue",
				"description": "Align Sales and Marketing. The terms sales and marketing are often used",
				"color": "#cb9e25",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E2936A129383FC1805C",
						"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
						"name": "Net Profits",
						"description": "Net profit margin is one of the most important indicators of a company's",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E296FB217B3E9786155",
								"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
								"name": "Above 5% per year",
								"description": "KPI Targets",
								"color": "#3614e1",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29D775ACB99660FDAF",
				"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
				"name": "Increase Profitability",
				"description": "Develop a broader array of products that you can cross-sell or upsell to existing",
				"color": "#cb9e25",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E2912C6ED0AA3B5035C",
						"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
						"name": "Revenue in Target Market",
						"description": "Revenue is the measure of the total amount of sales made by a company",
						"color": "#000000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E290D5CAFC4CA04422F",
								"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
								"name": "Above 3% per year",
								"description": "KPI Targets",
								"color": "#3614e1",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E299610AB37BC87664B",
				"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
				"name": "Decrease Operating Costs",
				"description": "Leasing office space, paying utility costs, and managing a physical office can be a",
				"color": "#cb9e25",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E2904D89292BD8D7442",
						"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
						"name": "Operating Costs",
						"description": "Operating costs are expenses associated with the maintenance and administration",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E296C35FCBB95546482",
								"parentId": "39C9A0F152C82C6947E510B951D32E29856F87C93BDD993F",
								"name": "Above 12% per year",
								"description": "KPI Targets",
								"color": "#3614e1",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}
		],
		"connections": []
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
		"name": "Customer",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29391BDD3A15F39863",
				"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
				"name": "Improve Clarity of Offering",
				"description": "Determine how clearly you design and develop your market “touch points” to",
				"color": "#52f019",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29D9B6E6EA93EF6D29",
				"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
				"name": "Improve Market Preception",
				"description": "Schedule time for discussing strengths and weaknesses with other teams, along",
				"color": "#52f019",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E2933F4FC1A1F3D381D",
						"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
						"name": "Focus Group Index",
						"description": "A focus group is a small, but demographically diverse group of people",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E292665259CD768D63C",
								"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
								"name": "Less than 90% each focus session",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}, {
						"id": "39C9A0F152C82C6947E510B951D32E298FDF69BF5E0655D9",
						"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
						"name": "Market Share Index",
						"description": "Market share represents the percentage of an industry, or a market's total sales,",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E2953AE92DB5C43072A",
								"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
								"name": "Above 3% per year",
								"description": "KPI Targets",
								"color": "#000",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E292DC61C3CD3E96E2F",
				"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
				"name": "Improve Customer Satisfaction",
				"description": "Encourage operators to take ownership of problems and spend time dealing with the",
				"color": "#52f019",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29CAC47BB5759338B6",
						"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
						"name": "Customer Satisfaction Index",
						"description": "Customer Satisfaction Index is based on the premise that satisfied customers will",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E297A7E691DECD87844",
								"parentId": "39C9A0F152C82C6947E510B951D32E2966276554A88818B9",
								"name": "80% of the year",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E29391BDD3A15F39863",
				"to": "39C9A0F152C82C6947E510B951D32E29988D83E9B0D00583"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29D9B6E6EA93EF6D29",
				"to": "39C9A0F152C82C6947E510B951D32E29988D83E9B0D00583"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29D9B6E6EA93EF6D29",
				"to": "39C9A0F152C82C6947E510B951D32E299610AB37BC87664B"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E292DC61C3CD3E96E2F",
				"to": "39C9A0F152C82C6947E510B951D32E299610AB37BC87664B"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
		"name": "Internal Process",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E292B76C46E7A491E0C",
				"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
				"name": "Improve Offering Selection",
				"description": "A good-better-best strategy consists of offering different versions of your product,",
				"color": "#17ded0",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29E714C96BA172D357",
						"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
						"name": "New Product Sales",
						"description": "Listen and Learn. Long before you start selling your new product, you have to",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29E3A3C55D286E5671",
								"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
								"name": "12% of the year",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E2921882A86C5E342B8",
				"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
				"name": "Improve Information Services",
				"description": "Having a properly integrated web-based ECM allows for multiple people to be",
				"color": "#17ded0",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E2934E5F4EF8F869769",
				"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
				"name": "Improve Stock Reliability",
				"description": "An upfront planning\nand study of the critical factors of the",
				"color": "#17ded0",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E297B318737463E00AC",
						"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
						"name": "Brand Awareness Score",
						"description": "In brand recall tests, researchers measure the ability of consumers to recall",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29EABD33F17B4B7E28",
								"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
								"name": "Above 5% per year",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E2920F1E2DEED24E184",
				"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
				"name": "Improve Cost Control",
				"description": "Identify the value of the work that has been carried out thus far, it is very helpful",
				"color": "#17ded0",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E2938C6BE377CFC2AC0",
						"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
						"name": "Cost Efficiency Index",
						"description": "It represents the amount of completed work for every unit of cost spent.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29B3BFEA75B22C12CB",
								"parentId": "39C9A0F152C82C6947E510B951D32E2935C1258C4A8D1A27",
								"name": "Less than 90% every reporting period",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E292B76C46E7A491E0C",
				"to": "39C9A0F152C82C6947E510B951D32E29391BDD3A15F39863"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E2921882A86C5E342B8",
				"to": "39C9A0F152C82C6947E510B951D32E29D9B6E6EA93EF6D29"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E2934E5F4EF8F869769",
				"to": "39C9A0F152C82C6947E510B951D32E292DC61C3CD3E96E2F"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E2920F1E2DEED24E184",
				"to": "39C9A0F152C82C6947E510B951D32E299610AB37BC87664B"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
		"name": "Organizational Capability",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29D0EC1F8DA275EA94",
				"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
				"name": "Improve Knowledge and Skills",
				"description": "Take Professional Development Courses. Professional development courses can",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29C7C39FDE5C798897",
				"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
				"name": "Improve Supply Chain",
				"description": "Improve your distribution network. Your company's distribution network is the",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29227A52B4E44A24AF",
						"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
						"name": "Supply Chain Efficiency Index",
						"description": "Supply chain efficiency is a measure of how a company's processes harness",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E2945E597075E0E8420",
								"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
								"name": "95%",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E292FEC45CDAB7EEE0B",
				"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
				"name": "Improve Technology",
				"description": "Boost Business Productivity. Technology has been used today in business to boost",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29EBE7FBF49116BE66",
						"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
						"name": "Employee Development Plan",
						"description": "Individuals must own, self-direct, and control their learning futures.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E2942C75B288C5C0461",
								"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
								"name": "95% in place",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}, {
						"id": "39C9A0F152C82C6947E510B951D32E298F83D100B3A0ADBB",
						"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
						"name": "Technology Training Index",
						"description": "The use of technology driven training delivers benefits to employees and",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29D0475B61BB769895",
								"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FF",
								"name": "95% efficiency",
								"description": "KPI Targets",
								"color": "#0835e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}
		],
		"connections": [{
				"from": "39C9A0F152C82C6947E510B951D32E29D0EC1F8DA275EA94",
				"to": "39C9A0F152C82C6947E510B951D32E292B76C46E7A491E0C"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29D0EC1F8DA275EA94",
				"to": "39C9A0F152C82C6947E510B951D32E2921882A86C5E342B8"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29C7C39FDE5C798897",
				"to": "39C9A0F152C82C6947E510B951D32E2920F1E2DEED24E184"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E292FEC45CDAB7EEE0B",
				"to": "39C9A0F152C82C6947E510B951D32E2921882A86C5E342B8"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E292FEC45CDAB7EEE0B",
				"to": "39C9A0F152C82C6947E510B951D32E2934E5F4EF8F869769"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FFOC",
		"name": "O C",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29D0EC1F8DA275EA94OC",
				"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FFOC",
				"name": "Improve Knowledge and Skills",
				"description": "Take Professional Development Courses. Professional development courses can",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29C7C39FDE5C798897OC",
				"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FFOC",
				"name": "Improve Supply Chain",
				"description": "Improve your distribution network. Your company's distribution network is the",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E292FEC45CDAB7EEE0BOC",
				"parentId": "39C9A0F152C82C6947E510B951D32E2971E7EB35ED9822FFOC",
				"name": "Improve Technology",
				"description": "Boost Business Productivity. Technology has been used today in business to boost",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [
				]
			}
		],
		"connections": []
	}
];

    ngOnInit() {
        this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
    }
}
