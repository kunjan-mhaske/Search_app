import pandas as pd
import random

columns = ["URL","School_Name","City","State","Zip"]

sample_record = {"URL": "rit.edu",
                "School_Name": "RIT",
                "City": "Rochester",
                "State":"NY",
                "Zip": 14623}

random_names = ["GCCIS", "Kate_Gleason", "Saunders", "Liberal Arts"]
random_cities = ["Rochester","Downtown", "Suburban", "Monroe", "Henrietta", "Brighton"]
random_states = ["NY", "MI", "NJ", "MA", "VA", "WA", "DC", "TX", "MN", "AZ", "CA"]
random_zips = [14,15,16,17,18,19,20,21,22,23,24,25]

records = pd.DataFrame([sample_record])
print(records)
for state in random_states:
    for city in random_cities:
        for school in random_names:
            school_name = "RIT_"+school
            dummy_records = {}
            dummy_records["URL"] = "rit.edu/"+school_name.lower()
            dummy_records["School_Name"] = school_name
            dummy_records["City"] = city
            dummy_records["State"] = state
            dummy_records["Zip"] = str(random.choice(random_zips))+str(random.randint(111,999))
            new_record = pd.DataFrame([dummy_records])
            ## Append is costly
            # records.append(dummy_records, ignore_index=True) 
            records = pd.concat([records, new_record], ignore_index=True, sort=False)
            # print(records)

records.reset_index()
records.to_csv("Search_app/records.csv", index=False)
print("Done..")