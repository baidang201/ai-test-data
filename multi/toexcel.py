import pandas as pd
df_json = pd.read_json("multi-output.json")
df_json.to_csv("multi-output.xls")