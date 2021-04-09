#!/usr/bin/env python

import sys


last_word = None
counts = 0
result = []
last_dis=-1
last_price=0
min_dis=0
min_price=0
num=0
for word_count in sys.stdin:
    num+=1
    word_count = word_count.strip() # Removes whitespace from key_value string
    words = word_count.split("\t") # Splits a key_value string into a key and a value.
    price, name, dis = int(words[0]), words[1], int(words[2])
    if last_dis < 0:
        node = [name,price,dis]
        min_dis = dis
        min_price = price
        result.append(node)
    else:
        ck=0
        len_del=0
        index_del=[]
        for i in range(len(result)):
            if result[i][1]>price and result[i][2]>=dis :
                len_del+=1
                index_del.append(i)
            elif result[i][1]>=price and result[i][2]>dis :
                len_del+=1
                index_del.append(i)
            elif result[i][1]<price and result[i][2]>dis :
                ck+=1
            elif result[i][1]>price and result[i][2]<dis:
                ck+=1
            elif result[i][1]<=price and result[i][2]<dis:
                len_del=0
                ck=0
                break
            elif result[i][1]<price and result[i][2]<=dis:
                len_del=0
                ck=0
                break
        if len_del>0:
            index_del.reverse()
            for i in index_del:
                del result[i]
            node = [name, price, dis]
            result.append(node)
        elif ck>0:
            node = [name, price, dis]
            result.append(node)
    last_dis=dis
for i in result:
    print(i[0])
