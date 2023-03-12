import pandas as pd
df_json = pd.read_json("multi-product.json")
df_json.to_csv("multi-product.xls")