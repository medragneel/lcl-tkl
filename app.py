from bs4 import BeautifulSoup
import csv
import pandas as pd


with open('jeudi.html','r') as ht:
    data=ht.read()
    bs=BeautifulSoup(data,'lxml')
    print(bs.select('tr th'))
    headers = [th.get_text() for th in bs.select("tr th")]
    print(headers)
    with open("out.csv", "w") as f:
        wr = csv.writer(f)
        wr.writerow(headers)
        wr.writerows([[td.get_text() for td in row.find_all("td")] for row in bs.select("tr + tr")])


df= pd.read_csv('export_tbc_6_9_2022.csv' )
df.to_excel('out1.xlsx',header=True)
