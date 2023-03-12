import pandas as pd
df_json = pd.read_json("big-output.json")
df_json.to_csv("big-output.xls")