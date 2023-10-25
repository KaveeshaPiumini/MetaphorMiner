import csv 
import json 
import os

data_csv_path = os.path.join(os.getcwd(), 'data.csv')
data_json_path = os.path.join(os.getcwd(), 'data.json')

def csv_to_json():
    jsonArray = []
      
    #read csv file
    with open('corpus/data.csv' , 'r' ) as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader: 
            #add this python dict to json array
            jsonArray.append(row)
  
    #convert python jsonArray to JSON String and write to file
    with open('corpus/data2.json' , 'w') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)

csv_to_json()