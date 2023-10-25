const express = require("express");
const router = express.Router();
const client = require("../elasticsearch/client");
const csvtojson = require('csvtojson');


// Index settings and custom analyzer definition
const indexSettings = {
  "analysis": {
    "analyzer": {
      "default": {
        "type": "standard"
      },
      "sinhala_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": ["edgeNgram", "stop"],
        "char_filter": ["dot_filter", "comma_delimited_filter", "dash_delimited_filter"]
      }
    },
    "filter": {
      "edgeNgram": {
        "type": "edge_ngram",
        "min_gram": 3,
        "max_gram": 50,
        "side": "front"
      },
      "stop": {
        "type": "stop",
        "stopwords": [
          "කියවෙන",
          "පිළිබඳ",
          "ගැන",
          "වගේ",
          "නම් වූ",
          "නැමැති",
          "නැමති",
          "නමැති",
          "නමති",
          "කවි",
          "කාව්‍ය",
          "කව",
          "කාව",
          "රූපක",
          "ගැන",
          "පිළිබඳ",
          "පිළිබඳව",
          "කියවෙන",
          "ගත්කරු",
          "රචකයා",
          "ලියන්නා",
          "ලියන",
          "රචිත",
          "ලියපු",
          "ලියව්ව",
          "රචනා",
          "රචක",
          "ලියන්",
          "ලිවූ",
          "ලියූ",
          "කියූ",
          "ලියවුණු",
          "කියව්ව",
          "කියපු",
          "කියවපු",
          "කළ",
          "වර්ගය",
          "වර්ගයේ",
          "වර්ගයේම",
          "වැනි"
        ]
      }
    },
    "char_filter": {
      "dot_filter": {
        "type": "mapping",
        "mappings": ["\\u002E => \\u0020"]
      },
      "comma_delimited_filter": {
        "type": "pattern_replace",
        "pattern": ",",
        "replacement": " "
      },
      "dash_delimited_filter": {
        "type": "pattern_replace",
        "pattern": "-",
        "replacement": " "
      },      
    }
  }
};

// Mapping definition
const mappings = {
  "properties": {
    "ID": {
      "type": "keyword"
    },
    "Poem Name": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Poem Number": {
      "type": "integer"
    },
    "Poem Line": {
      "type": "text",
      "analyzer": "sinhala_analyzer"
    },
    "Metaphor Present": {
      "type": "boolean"
    },
    "Count of the Metaphors": {
      "type": "integer"
    },
    "Metaphoric Terms": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Metaphor Type": {
      "type": "keyword"
    },
    "Source Domain": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Target Domain": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Interpretation": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Year": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    },
    "Poet": {
      "type": "text",
      "analyzer": "sinhala_analyzer",
      "fields": {
        "keyword": {
          "type": "keyword"
        }
      }
    }
  }
};

// Create an index with the custom analyzer and mappings
async function createIndex() {
  await client.indices.create({
    "index": "final_test",
    "body": {
      "settings": indexSettings,
      "mappings": mappings
    }
  });
}

router.get("/create", async function (req, res) {
  console.log("Loading Application...");
  res.json("Running Application...");

  indexData = async () => {
    try {
      console.log("Reading data from the local CSV file");

      const records = await csvtojson().fromFile(__dirname + '/../../corpus/data.csv');

      console.log(records);

      console.log("Data read successfully!");

      console.log(
        "Creating the Elasticsearch index with custom analyzers and mappings"
      );
      await createIndex();

      console.log("Indexing data...");

      for (const record of records) {
        await client.index({
          "index": "final_test",
          "body": record
        });
      }

      console.log("Data has been indexed successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  indexData();
});

module.exports = router;
