#!/bin/bash
count=0
oxford_dic_prefix="https://www.oxfordlearnersdictionaries.com/definition/english/"
outfile="$PWD/data/jane_eyre.json"

while IFS='' read -r line || [[ -n "$line" ]]; do
  echo "{\"id\": $count, \"word\":\" $line\", \"oxford_dic\": {\"link\": \"$oxford_dic_prefix$line\"}},"  >> $outfile

  ((count++))
done < "$1"
