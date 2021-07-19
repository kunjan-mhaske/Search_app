import pandas as pd
import random

columns = ["np_name","city","state","zip","cause","ethnic","url_ctp"]

sample_record = {
                "np_name": "Changing The Present",
                "city": "Rochester",
                "state":"New York",
                "zip": 14623,
                "cause":"Cause_1",
                "ethnic":"Ethnic_1",
                "url_ctp":"https://changingthepresent.org"}

random_names = ["CtP", "Global Sea", "We Are CtP", "CtP Global"]
random_cities = ["Rochester","Downtown", "Suburban", "Monroe", "Henrietta", "Brighton"]
random_states = ["New York", "Michigan", "New Jersey", "Ohio", "Virginia", "Washington", "Colombo", "Texas", "California", "Arizona", "Florida"]
random_zips = [14,15,16,17,18,19,20,21,22,23,24,25]
random_alpha = [chr(x) for x in range(65,65+26)]

records = pd.DataFrame([sample_record])
print(records)
for state in random_states:
    for city in random_cities:
        for name in random_names:
            np_name = random.choice(random_alpha)+"_"+name
            dummy_records = {}
            dummy_records["np_name"] = np_name
            dummy_records["city"] = city
            dummy_records["state"] = state
            dummy_records["zip"] = str(random.choice(random_zips))+str(random.randint(111,999))
            dummy_records["cause"] = "Cause_"+str(random.randrange(0,30))
            dummy_records["ethnic"] = "Ethnic_"+str(random.randrange(40,70))
            dummy_records["url_ctp"] = "https://changingthepresent.org/"+np_name.lower()

            new_record = pd.DataFrame([dummy_records])
            ## Append is costly
            # records.append(dummy_records, ignore_index=True) 
            records = pd.concat([records, new_record], ignore_index=True, sort=False)
            # print(records)

records.reset_index()
records.to_csv("np_records.csv", index=False)
print("Done..")