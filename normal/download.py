
import requests
import time

url = "https://polkadot.api.subscan.io/api/v2/scan/transfers"
headers = {'content-type': 'application/json', 'X-API-Key': 'aae65ed10f55479d993d5103aafa61b1'}

for i in range(1, 91):
#for i in range(1, 2):
  datatemp = '{"row": 100,"block_range": "1-1211000","page": %s}' %(i)
  #print(datatemp)
  
  response = requests.post(url, data=datatemp, headers=headers)
  with open("%s.json" %(i), "w") as fd:
      fd.write(response.text)
  time.sleep(1)
