import React from "react";

import '../styles/RequestFormClass.css';
import '../components/css/style.css';

import SearchResults from "./SearchResults";
import Header from "./Header";

class RequestFormClass extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {
                inn: '',
                numberOfDocs: '',
                dateStart: '',
                dateEnd: ''
            },
            errors: {},
            formValid: false,
            resultHistogram: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.validate();
        this.setState({
            input
        })
        console.log('after handleChange formValid =', this.state.formValid)

    }

    async handleSubmit(event) {
        event.preventDefault();

        /* if (this.validate()) {
            console.log('работает if handleSubmit state = ', this.state);
            let input = {};
            input['inn'] = '';
            input['numberOfDocs'] = '';
            input['dateStart'] = '';
            input['dateEnd'] = '';

            this.setState({input:input});
            console.log('работает обнуление в if handleSubmit state = ', this.state);

        } */
      
      if(this.state.formValid) {
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        // this.setState({formDataJson:formJson});
        const token = localStorage.getItem('token');
        console.log('token = ', token);

        console.log('итоговое в handleSubmit state = ', this.state);
        
        console.log("запускаем fetch в RequestFormClass");      
        let response = await fetch("https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
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
                "startDate": "${this.state.input.dateStart}",
                "endDate": "${this.state.input.dateEnd}"
                },
                
                "searchContext": {
                "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                  "type": "company",
                  "sparkId": null,
                  "entityId": null,
                  "inn": "${this.state.input.inn}",
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
      });

      if (response.ok) {
        let json = await response.json();
        console.log("json after await fetch = ", json);        
        this.setState({resultHistogram:json});
        console.log('resultHistogram = ', this.state.resultHistogram);

      } else {
        alert('Ошибка HTTP: ' + response.status);
      }

      /* .then(function(response) {
        console.log('работает первый then')
        let json = response.json(); //ждем, пока получим ответ сервера в JSON
        console.log("json = ", json);
        return json
      })
      .then(function(json) {
        console.log('работает второй then')
        console.log("json: ", json)
      }) */

      } else {
        console.log('handleSubmit валидация не прошла');
      }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValidINN = true;
        let isValidNumberOfDocs = true;
        let isValidDateStart = true;
        let isValidDateEnd = true;
        let currentDate = new Date();

        if (!input['inn']) {
            isValidINN = false;
            errors['inn'] = 'Введите ИНН';
        }

        if (!input['numberOfDocs']) {
            isValidNumberOfDocs = false;
            errors['numberOfDocs'] = 'Введите количество документов в выдаче';
        }

        if (!input['dateStart']) {
          isValidDateStart = false;
          errors['dateStart'] = 'Введите начальную дату';
        }
        
        if (input.dateStart) {
          const dateObjectStart = new Date(input.dateStart);
          if (dateObjectStart > currentDate) {
            isValidDateStart = false;
            errors['dateStart'] = 'Дата не может быть больше текущей';
          }
        }

        if (!input.dateEnd) {
          isValidDateEnd = false;
          errors['dateEnd'] = 'Введите конечную дату';
        }
        
        if (input.dateEnd) {
          const dateObjectEnd = new Date(input.dateEnd);
          if (dateObjectEnd > currentDate) {
            isValidDateEnd = false;
            errors['dateEnd'] = 'Дата не может быть больше текущей';
          }
        }

        if ((input.dateStart && input.dateEnd) &&
             this.state.input.dateEnd < this.state.input.dateStart) {
              isValidDateEnd = false;
              errors['dateEnd'] = 'Конечная дата не может быть меньше начальной';
             }        

        let isValid = isValidINN && isValidNumberOfDocs &&
                      isValidDateStart && isValidDateEnd;

        this.setState({
            errors: errors,
            formValid: isValid
        });

        return isValid;

    }

    render() {
      return (
        <React.Fragment>
        <nav>
          <Header />
        </nav>
        <div className="container">
          <header>
          <h2>Форма для ввода параметров запроса</h2>
          </header>
          <div>
            <form method='post' onSubmit={this.handleSubmit}>
              
              <div className='form-group'>
                <label htmlFor='inn'>ИНН: *</label>
                  <input
                    type='number'
                    name='inn'
                    value={this.state.input.inn}
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Введите ИНН'
                    id='inn'
                    required
                  />
                <div className='text-danger'>{this.state.errors.inn}</div>
              </div>
              
              <div className='form-group'>
                <label htmlFor='mood'>Тональность</label>             
                  <select
                    type='text'
                    name='mood'
                    value={this.state.input.mood}
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Тональность'
                    id='mood'
                    >
                      <option value='positive'>позитивная</option>
                      <option value='negative'>негативная</option>
                      <option value='any'>любая</option>
                    </select>
                </div>

              <div className='form-group'>
                <label htmlFor='numberOfDocs'>Количество документов в выдаче (1 - 1000): * </label>
                <input
                  type='number'
                  name='numberOfDocs'
                  value={this.state.input.numberOfDocs}
                  onChange={this.handleChange}
                  className='form-control'
                  placeholder='Введите количество документов'
                  id='numberOfDocs'
                  min='1'
                  max='1000'
                  required
                />
                <div className='text-danger'>{this.state.errors.numberOfDocs}</div>
              </div>

              <div className='form-group'>
                <label>Дипазон дат для поиска *</label>
                  <input
                    type='date'
                    name='dateStart'
                    value={this.state.input.dateStart}
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Начальная дата'
                    id='dateStart'
                    required
                  />
                  <input
                    type='date'
                    name='dateEnd'
                    value={this.state.input.dateEnd}
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Конечная дата'
                    id='dateEnd'
                    required
                  />
               
                <div className='text-danger'>{this.state.errors.dateStart}</div>
                <div className='text-danger'>{this.state.errors.dateEnd}</div>
              </div>
   
              <div className='form-group'>
                <label>
                Признак максимальной полноты 
                  <input type='checkbox' name='flagMaximumCompleteness' />
                </label>
              </div>

              <div className='form-group'>
                <label>
                Упоминания в бизнес-контексте <input type='checkbox' name='referencesInBusinessContext' />
                </label>
              </div>
              
              <div className='form-group'>
                <label>
                Главная роль в публикации <input type='checkbox' name='mainRoleInPublication' />
                </label>
              </div>
              
              <div className='form-group'>
                <label>
                Публикации только с риск-факторами <input type='checkbox' name='riskFactorInPublication' />
                </label>
              </div>
              
              <div className='form-group'>
                <label>
                Включать технические новости рынков <input type='checkbox' name='includeTechnicalMarketNews' />
                </label>
              </div>
              
              <div className='form-group'>
                <label>
                Включать анонсы и календари <input type='checkbox' name='includeNoticeAndCalendar' />
                </label>
              </div>
              
              <div className='form-group'>
                <label>
                Включать сводки новостей <input type='checkbox' name='includeNewsBulletin' />
                </label>
              </div>

              <input type='submit' disabled={!this.state.formValid} value='Поиск' className='btn' />
              <p> * поля, обязательные к заполнению</p>
            </form>
            
        </div>
        {/* <div>
           <SearchResults formjson={this.state.formDataJson}/>
        </div> */}
      </div>
    </React.Fragment>
    );
  }
}

export default RequestFormClass;
