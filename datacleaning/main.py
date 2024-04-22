import pandas as pd
from openpyxl.workbook import Workbook
data1=pd.read_csv("datacleaning/anon_data1.csv")
data2=pd.read_csv("datacleaning/anon_data2.csv")
data1.fillna(" ")
data2.fillna(" ")
new_dict={}
data1.columns = [c.replace(' ', '_') for c in data1.columns]
data2.columns = [c.replace(' ', '_') for c in data2.columns]
data2.columns = [c.replace("'", '_') for c in data2.columns]
new_dict={      "Participant Name":[],
                "Team Name":[] ,
                "Participant Type":[],
                "Participant Phone Number":[],
                "Participant Email":[]
            }
df=pd.DataFrame(new_dict)

for (index,row) in data1.iterrows():
    df.loc[len(df.index)]=[row.Leader_Name,row.Team_Name ,"Leader",row.Leader_Phone,row.Leader_Email]
for (index,row) in data2.iterrows():
    type=row.Candidate_Type.split(" ")[1]
    if (type=="leader"):
        df.loc[len(df.index)]=[row.Candidate_s_Name,row.Team_Name ,"Leader",row.Candidate_s_Mobile,row.Candidate_s_Email]
    else:
        df.loc[len(df.index)]=[row.Candidate_s_Name,row.Team_Name ,"Member",row.Candidate_s_Mobile,row.Candidate_s_Email] 
        
for (index,row1) in data1.iterrows():
    memberslist=row1.Members.split(",")
    secondmember=""
    thirdmember=""
    if(len(memberslist)==2):
        secondmember=memberslist[1].split("@")[0].title().lstrip() 
        if not(any(pd.Series(df['Participant Email'])==memberslist[1].lstrip())):
            df.loc[len(df.index)]=[secondmember,row1.Team_Name ,"Member","NA",memberslist[1].lstrip()]   
    elif (len(memberslist)==3):
        secondmember=memberslist[1].split("@")[0].title().lstrip()
        thirdmember=memberslist[2].split("@")[0].title().lstrip()
        if not(any(pd.Series(df['Participant Email'])==memberslist[1].lstrip())):
            df.loc[len(df.index)]=[secondmember,row1.Team_Name ,"Member","NA",memberslist[1].lstrip()]
        if not(any(pd.Series(df['Participant Email'])==memberslist[2].lstrip())):
         df.loc[len(df.index)]=[thirdmember,row1.Team_Name ,"Member","NA",memberslist[2].lstrip()]
    
df=df.sort_values(by=['Team Name','Participant Type'])
df=df.drop_duplicates(keep='first') 
df.to_csv("datacleaning/combined.csv",mode='a',index=False)       
df_new = pd.read_csv("datacleaning/combined.csv")
df_new.to_excel("datacleaning/sheet.xlsx",sheet_name="Testing",index=False)
