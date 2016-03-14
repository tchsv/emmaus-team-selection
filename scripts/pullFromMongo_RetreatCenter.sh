#!/usr/bin/env bash
mongoexport  --db=emmaus --collection=wholeteamlists  --type=csv  -f "Name,Building" > walk445_Building.csv

