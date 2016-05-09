#!/usr/bin/env bash
mongoimport --db=emmaus --collection=walk445 --headerline --type=csv 2015-EmmausTeam-Walk445-List.csv
