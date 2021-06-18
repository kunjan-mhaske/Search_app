import json
import pandas as pd
from collections import defaultdict

college_dict = defaultdict(list)

with open("colleges-list.json") as file:
    data = json.load(file)
    for row in data:
        college_dict["College_Name"].append(row[0])
        college_dict["URL_CtP"].append(row[1])

records = pd.DataFrame(college_dict)
records.to_csv("colleges_list.csv", index=False)
print("Done..")