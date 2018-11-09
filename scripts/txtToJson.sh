#!/bin/bash
count=0
oxford_dic_prefix="https://www.oxfordlearnersdictionaries.com/definition/english/"
larousse_dic_prefix="https://www.larousse.fr/dictionnaires/rechercher?q="
larousse_dic_suffix="&l=francais&culture="
outfile="$PWD/data/elle_et_lui.json"


while IFS='' read -r line || [[ -n "$line" ]]; do
  # echo "{\"id\": $count, \"word\":\" $line\", \"oxford_dic\": {\"link\": \"$oxford_dic_prefix$line\"}},"  >> $outfile
  line_without_tailing_space="$(echo -e "${line}" | tr -d '[:space:]')"
  echo "{\"id\": $count, \"word\":\"$line_without_tailing_space\", \"oxford_dic\": {\"link\": \"$larousse_dic_prefix$line_without_tailing_space$larousse_dic_suffix\"}},"  >> $outfile
  ((count++))
done < "$1"
