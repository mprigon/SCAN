import React, { useEffect, useState } from "react";

function SearchResults(props) {
  const[reply, setReply] = useState([]);

  const token = localStorage.getItem('token');

  let arrayFormjson = Object.entries(props.formjson);
  console.log('formjson from SearchResults: ', props.formjson);
  
  useEffect(() => {

  console.log("запускаем fetch в SearchResult");      
  fetch("https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`
                },
      body: `{  
                "limit": 15,
                "sortType": "issueDate",
                "sortDirectionType": "asc",

                "intervalType": "month",
                "histogramTypes": [
                "totalDocuments", "riskFactors"
                ],
                
                "issueDateInterval": {
                "startDate": "2023-06-10T22:20:11.811Z",
                "endDate": "2023-06-16T22:20:11.811Z"
                },
                
                "searchContext": {
                "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                  "type": "company",
                  "sparkId": null,
                  "entityId": null,
                  "inn": "${props.formjson.inn}",
                  "maxFullness": true,
                  "inBusinessNews": null
                  }
                ],
                "onlyMainRole": true,
                "tonality": "any",
                "onlyWithRiskFactors": true,
                "riskFactors": {
                  "and": [
                    {
                      "id": 0
                    }
                  ],
                  "or": [
                    {
                      "id": 0
                    }
                  ],
                  "not": [
                    {
                      "id": 0
                    }
                  ]
                },
                "themes": {
                "and": [
                  {
                    "tonality": "any",
                    "entityId": 0
                  }
                ],
                "or": [
                  {
                    "tonality": "any",
                    "entityId": 0
                  }
                ],
                "not": [
                  {
                    "tonality": "any",
                    "entityId": 0
                  }
                ]
              }
            },
            "searchEntitiesFilter": {
              "and": [
                {
                  "type": "company"
                }
              ],
              "or": [
                {
                  "type": "company"
                }
              ],
              "not": [
                {
                  "type": "company"
                }
              ]
            },
            "locationsFilter": {
              "and": [
                {
                  "countryCode": "string",
                  "regionCode": 0
                }
              ],
              "or": [
                {
                  "countryCode": "string",
                  "regionCode": 0
                }
              ],
              "not": [
                {
                  "countryCode": "string",
                  "regionCode": 0
                }
              ]
            },
            "themesFilter": {
              "and": [
                {
                  "entityId": 0
                }
              ],
              "or": [
                {
                  "entityId": 0
                }
              ],
              "not": [
                {
                  "entityId": 0
                }
              ]
            }
          },
          "attributeFilters": {
            "excludeTechNews": true,
            "excludeAnnouncements": true,
            "excludeDigests": true
          },
          "similarMode": "none"
          }`
    })
    .then(function(response) {
        console.log('работает первый then')
        let json = response.json(); //ждем, пока получим ответ сервера в JSON
        console.log("json = ", json);
        return json
    })
    .then(function(json) {
        console.log('работает второй then')
        setReply(json);
        console.log("reply: ", reply)
    })

  }, []); 

    return (
        <div>
          <p>Исходные данные для поиска:</p>
          {arrayFormjson.map((array, index) => 
          <div>
            <ul>
              <li key={index}>key: {array[0]} value: {array[1]}</li>
            </ul>
          </div>
          )}
          <p>Результаты поиска - POST objectsearch/histograms</p>
        </div>
    )
}

export default SearchResults;
