#!/usr/bin/env bash
mongodump --db=emmaus-team-selection-dev --out=emmaus-teamselection-db-$(date +%Y-%m-%d-%H-%M-%S)
