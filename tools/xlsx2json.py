#!/usr/bin/python3
## -*- coding: utf-8 -*-

import json
import os
import argparse 
import openpyxl

parser = argparse.ArgumentParser(description='Перегоняет xslx в JSON для подготовки компендиума для The Witcher RPG')

parser.add_argument('--xlsx', 
    type=str, 
    help='Файл до эксельки', 
    dest = 'xlsx',
    required=True
)

args = parser.parse_args()

book = openpyxl.load_workbook(args.xlsx)
sheet = book.active

spells = []

for col in range(2, 999):
    
    if sheet.cell(row=1, column=col).value in ["", None]:
        break

    print(sheet.cell(row=1, column=col).value)

    distantion_value = sheet.cell(row=11, column=col).value
    if distantion_value in ["", None]:
        distantion_value = 0

    costStamina = sheet.cell(row=6, column=col).value
    if costStamina in ["", None]:
        costStamina = 0

    spells.append({
        "name": sheet.cell(row=1, column=col).value,
        "img": sheet.cell(row=5, column=col).value,
        "type": "spell",
        "data": {
            "costStamina": costStamina,
            "source": "core",
            "effect": sheet.cell(row=3, column=col).value,
            "magicType": "spells",
            "specData": {
                "element": sheet.cell(row=8, column=col).value,
                "LevelType": sheet.cell(row=9, column=col).value,
                "DistantionType": sheet.cell(row=10, column=col).value,
                "DistantionValue": distantion_value,
                "defence": sheet.cell(row=12, column=col).value,
                "duration": sheet.cell(row=13, column=col).value
            }
        }
    })

cf = open('spells.json', 'w', encoding='utf-8')
cf.writelines(json.dumps(spells, ensure_ascii=False))
cf.close()