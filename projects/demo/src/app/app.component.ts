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
		"id": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
		"name": "Financial",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E297D9B913623E87F0E",
				"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
				"name": "Increase Revenue",
				"description": "Align Sales and Marketing. The terms sales and marketing are often used interchangeably. However, these vital functions provide very different—and equally important—contributions to the company or organization. ",
				"color": "#cb9e25",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E290430D8265BA65493",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "Net Profit",
						"description": "Net profit margin is one of the most important indicators of a company's financial health. By tracking increases and decreases in its net profit margin, a company can assess whether current practices are working and forecast profits based on revenues. ",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29D0D870B8AD62E178",
								"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
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
				"id": "39C9A0F152C82C6947E510B951D32E295891A2541FD534E2",
				"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
				"name": "Increase Profitability ",
				"description": "Develop a broader array of products that you can cross-sell or upsell to existing customers. ",
				"color": "#e6a519",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29EC26A984C2D06673",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "Revenue in Target Market",
						"description": "Revenue is the measure of the total amount of sales made by a company during a specific time period. It comprises the top line of a company's financial statements.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29C87C8E91C11F043C",
								"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
								"name": "Above 3% per year",
								"description": "KPI Targets",
								"color": "#1434d7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E296E315A5762FB89D5",
				"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
				"name": "Decrease Operating Costs",
				"description": "Leasing office space, paying utility costs, and managing a physical office can be a drain on your financial resources. Consider allowing your team to telecommute as a way to reduce total costs.",
				"color": "#e8a411",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29DDBD80D51156D1F6",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "Operating Costs",
						"description": "Operating costs are expenses associated with the maintenance and administration of a business on a day-to-day basis. ... The operating cost is deducted from revenue to arrive at operating income and is reflected on a company's income statement.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E298D927F8C709585A2",
								"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
								"name": "Above 12% per year",
								"description": "KPI Targets",
								"color": "#112be8",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					},{
						"id": "39C9A0F152C82C6947E510B951D32E29DDBD80D51156D1F61",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "1",
						"description": "Operating costs are expenses associated with the maintenance and administration of a business on a day-to-day basis. ... The operating cost is deducted from revenue to arrive at operating income and is reflected on a company's income statement.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					},{
						"id": "39C9A0F152C82C6947E510B951D32E29DDBD80D51156D1F62",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "2",
						"description": "Operating costs are expenses associated with the maintenance and administration of a business on a day-to-day basis. ... The operating cost is deducted from revenue to arrive at operating income and is reflected on a company's income statement.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					},{
						"id": "39C9A0F152C82C6947E510B951D32E29DDBD80D51156D1F63",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "3",
						"description": "Operating costs are expenses associated with the maintenance and administration of a business on a day-to-day basis. ... The operating cost is deducted from revenue to arrive at operating income and is reflected on a company's income statement.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					},{
						"id": "39C9A0F152C82C6947E510B951D32E29DDBD80D51156D1F64",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "4",
						"description": "Operating costs are expenses associated with the maintenance and administration of a business on a day-to-day basis. ... The operating cost is deducted from revenue to arrive at operating income and is reflected on a company's income statement.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": []
					},{
						"id": "39C9A0F152C82C6947E510B951D32E29DDBD80D51156D1F65",
						"parentId": "39C9A0F152C82C6947E510B951D32E2981D9D6D68C23FDE9",
						"name": "5",
						"description": "Operating costs are expenses associated with the maintenance and administration of a business on a day-to-day basis. ... The operating cost is deducted from revenue to arrive at operating income and is reflected on a company's income statement.",
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
		"id": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
		"name": "Customer",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E295B549827E6145A4E",
				"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
				"name": "Improve Clarity of Offering",
				"description": "Determine how clearly you design and develop your market “touch points” to create the best offering in your target market. ",
				"color": "#52f019",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29AB8F5FA802770A50",
				"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
				"name": "Improve Market Preception",
				"description": "Schedule time for discussing strengths and weaknesses with other teams, along with agents. Through this dialog, much can be learned to continue improving your brand.",
				"color": "#44ce12",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E291E4763E49633E993",
						"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
						"name": "Market Share Index",
						"description": "Market share represents the percentage of an industry, or a market's total sales, that is earned by a particular company over a specified time period.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29A2EECBB291898CF0",
								"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
								"name": "Above 3% per year",
								"description": "KPI Targets",
								"color": "#105cea",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}, {
						"id": "39C9A0F152C82C6947E510B951D32E296F47909E01DC73EF",
						"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
						"name": "Focus Group Index",
						"description": "A focus group is a small, but demographically diverse group of people and whose reactions are studied especially in market research or political analysis in guided or open discussions about a new product or something else to determine the reactions that can be expected from a larger population.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29AB6FE00E50F263D7",
								"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
								"name": "Less than 90% each focus session",
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
				"id": "39C9A0F152C82C6947E510B951D32E29AF348D1A45134880",
				"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
				"name": "Improve Customer Satisfaction",
				"description": "Encourage operators to take ownership of problems and spend time dealing with the customer, rather than escalating or passing over the problem. ",
				"color": "#54ec13",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E295902CF35028F0FFF",
						"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
						"name": "Customer Satisfaction Index",
						"description": "Customer Satisfaction Index is based on the premise that satisfied customers will be more likely to carry out repeat purchase of goods/services, remain loyal to an organisation and offer positive feedback.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E295E8EA9A3031F2603",
								"parentId": "39C9A0F152C82C6947E510B951D32E29CDF73DC55FB14E00",
								"name": "80% of the year",
								"description": "KPI Targets",
								"color": "#0c39ed",
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
				"from": "39C9A0F152C82C6947E510B951D32E295B549827E6145A4E",
				"to": "39C9A0F152C82C6947E510B951D32E297D9B913623E87F0E"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29AB8F5FA802770A50",
				"to": "39C9A0F152C82C6947E510B951D32E297D9B913623E87F0E"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29AB8F5FA802770A50",
				"to": "39C9A0F152C82C6947E510B951D32E296E315A5762FB89D5"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29AF348D1A45134880",
				"to": "39C9A0F152C82C6947E510B951D32E296E315A5762FB89D5"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
		"name": "Internal Process",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E2981792CE626FDE060",
				"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
				"name": "Improve Offering Selection",
				"description": "A good-better-best strategy consists of offering different versions of your product, where each version improves on the previous.",
				"color": "#17ded0",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29BAC941E6C964562A",
						"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
						"name": "New Product Sales",
						"description": "Listen and Learn. Long before you start selling your new product, you have to educate yourself and your sales team about the future new market.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E29D15A2FA244AAD89A",
								"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
								"name": "12% of the year",
								"description": "KPI Targets",
								"color": "#2213ec",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E296C5C1034A6730E30",
				"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
				"name": "Improve Information Services",
				"description": "Having a properly integrated web-based ECM allows for multiple people to be working on same document at the same time without restrictions on viewing the same files. ",
				"color": "#1cd9aa",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E298F755625E35F6EA2",
				"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
				"name": "Improve Stock Reliability ",
				"description": "An upfront planning\nand study of the critical factors of the manufacturing\nprocesses help them identify areas of risk so that\nnecessary planning and control procedures are put in\nplace",
				"color": "#25e4ce",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29FA577F0FF47CC0D3",
						"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
						"name": "Brand Awareness Score",
						"description": "In brand recall tests, researchers measure the ability of consumers to recall brand names in a particular product category. Brand awareness is the percentage of those people who can name your brand, unaided.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E298CF1D96B4082997C",
								"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
								"name": "Above 5% per year",
								"description": "KPI Targets",
								"color": "#0c08e7",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E293E11273C6505407E",
				"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
				"name": "Improve Cost Control",
				"description": "Identify the value of the work that has been carried out thus far, it is very helpful to use the accounting technique commonly known as 'Earned Value'.",
				"color": "#0dd0d3",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E292813751C46E58C07",
						"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
						"name": "Cost Efficiency Index",
						"description": "It represents the amount of completed work for every unit of cost spent. ",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E2940CC8DE3C4CAA5DF",
								"parentId": "39C9A0F152C82C6947E510B951D32E290F3F2A7F8F31BDD5",
								"name": "Less than 90% every reporting period",
								"description": "KPI Targets",
								"color": "#1b18f2",
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
				"from": "39C9A0F152C82C6947E510B951D32E2981792CE626FDE060",
				"to": "39C9A0F152C82C6947E510B951D32E295B549827E6145A4E"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296C5C1034A6730E30",
				"to": "39C9A0F152C82C6947E510B951D32E295B549827E6145A4E"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E296C5C1034A6730E30",
				"to": "39C9A0F152C82C6947E510B951D32E29AB8F5FA802770A50"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E298F755625E35F6EA2",
				"to": "39C9A0F152C82C6947E510B951D32E29AF348D1A45134880"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E293E11273C6505407E",
				"to": "39C9A0F152C82C6947E510B951D32E296E315A5762FB89D5"
			}
		]
	}, {
		"id": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
		"name": "Organizational Capacity",
		"color": "#000",
		"levelNumber": 1,
		"children": [{
				"id": "39C9A0F152C82C6947E510B951D32E29AB19AD1ED046F7EE",
				"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
				"name": "Improve Knowledge and Skills",
				"description": "Take Professional Development Courses. Professional development courses can help you expand your professional skill set, learn something new, or even earn academic credit to put towards a degree.",
				"color": "#e70d0d",
				"levelNumber": 2,
				"shapeTags": [],
				"children": []
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29F3098872BAED2B11",
				"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
				"name": "Improve Technology",
				"description": "Boost Business Productivity. Technology has been used today in business to boost productivity, save money, and enhance profits",
				"color": "#ee1717",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E295FE5B39CEA961010",
						"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
						"name": "Employee Development Plan",
						"description": " Individuals must own, self-direct, and control their learning futures. ",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E291FF11DF5712CF1E6",
								"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
								"name": "95% in place",
								"description": "KPI Targets",
								"color": "#121ec4",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}, {
						"id": "39C9A0F152C82C6947E510B951D32E292AFD0AF506DE62C1",
						"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
						"name": "Technology Training Index",
						"description": "The use of technology driven training delivers benefits to employees and organizations.",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E2980D775EE6CF4D27B",
								"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
								"name": "95% efficiency",
								"description": "KPI Targets",
								"color": "#1d0eec",
								"levelNumber": 4,
								"shapeTags": [],
								"children": []
							}
						]
					}
				]
			}, {
				"id": "39C9A0F152C82C6947E510B951D32E29F5D7B6C891292CD6",
				"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
				"name": "Improve Supply Chain",
				"description": "Improve your distribution network. Your company's distribution network is the operational hinge you should build around.",
				"color": "#e90c0c",
				"levelNumber": 2,
				"shapeTags": [],
				"children": [{
						"id": "39C9A0F152C82C6947E510B951D32E29468D1A72DD69F114",
						"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
						"name": "Supply Chain Efficiency Index",
						"description": "Supply chain efficiency is a measure of how a company's processes harness resources in the best way possible, whether or not those resources are financial, human, technological or physical. ",
						"color": "#000",
						"levelNumber": 3,
						"shapeTags": [],
						"children": [{
								"id": "39C9A0F152C82C6947E510B951D32E294C531DA26C7FA55D",
								"parentId": "39C9A0F152C82C6947E510B951D32E2993D2110512F1B8DE",
								"name": "95%",
								"description": "KPI Targets",
								"color": "#1436e1",
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
				"from": "39C9A0F152C82C6947E510B951D32E29AB19AD1ED046F7EE",
				"to": "39C9A0F152C82C6947E510B951D32E2981792CE626FDE060"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29AB19AD1ED046F7EE",
				"to": "39C9A0F152C82C6947E510B951D32E296C5C1034A6730E30"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29F3098872BAED2B11",
				"to": "39C9A0F152C82C6947E510B951D32E296C5C1034A6730E30"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29F3098872BAED2B11",
				"to": "39C9A0F152C82C6947E510B951D32E298F755625E35F6EA2"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29F5D7B6C891292CD6",
				"to": "39C9A0F152C82C6947E510B951D32E298F755625E35F6EA2"
			}, {
				"from": "39C9A0F152C82C6947E510B951D32E29F5D7B6C891292CD6",
				"to": "39C9A0F152C82C6947E510B951D32E293E11273C6505407E"
			}
		]
	}
];

    ngOnInit() {
        this.levelMap = this.mapNodeLevels(this.graphData, this.levelMap);
    }
}
