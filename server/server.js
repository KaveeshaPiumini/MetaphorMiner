const express = require('express');
const client = require('./elasticsearch/client');
const app = express();
const cors = require('cors');
// const router = require("./router/_index.routes");

const port = 3001;


const data = require('./data_management/retrieve_and_ingest_data');

app.use('/ingest_data', data);

app.use(cors());

app.get('/results', (req, res) => {

    const passedMsg = req.query.parameter;
  
    async function sendESRequest() {
      const body = await client.search({
        "index": 'final_test',
        "body": {
            "size": 100,
            "query": {
              "bool": {
                "should": [
                  {
                    "match": {
                      "Poem Name": passedMsg
                    }
                  },
                  {
                    "match": {
                      "Poem Line": passedMsg
                    }
                  },
                  {
                    "match": {
                      "Metaphoric Terms": passedMsg
                    }
                  },   
                  {
                    "match": {
                      "Interpretation": passedMsg
                    }
                  },
                  {
                    "match": {
                      "Source Domain": passedMsg
                    }
                  },   
                  {
                    "match": {
                      "Target Domain": passedMsg
                    }
                  },        
                  {
                    "match": {
                      "Poet": passedMsg
                    }
                  },   
                  {
                    "match": {
                      "Metaphor Type": passedMsg
                    }
                  },
                  {
                    "match": {
                      "Year": passedMsg
                    }
                  }       
                ]
              }
            },
            "sort": [
              {
                "Metaphor Present": {
                  "order": "desc"
                },
                "Count of the Metaphors": {
                  "order" : "desc"
                }
              }
            ],
            "aggs": {
              "PoemName" : {
                "terms": {
                  "field": "Poem Name.keyword"
                } 
              } 
            }
        }
      });
      res.json({
        hits: body.hits.hits,
        aggregations: body.aggregations
      });
    }
    sendESRequest();
  });

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));



// app.use(router);