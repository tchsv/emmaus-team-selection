#!/usr/bin/env bash
mongoexport  --db=emmaus --collection=wholeteamlists  --type=csv  -f "Name,Committee,Roommate,PaidAmount,Paid" > walk445_Paid.csv

