import pandas as pd
df_json = pd.read_json("normal-output.json")
df_json.to_csv("normal-output.xls")