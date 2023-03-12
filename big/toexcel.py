import pandas as pd
df_json = pd.read_json("big-product.json")
df_json.to_csv("big-product.xls")