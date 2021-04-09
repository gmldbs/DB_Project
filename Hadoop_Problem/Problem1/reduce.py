#!/usr/bin/env python

import sys

last_word = None
index = 0
max_gpa = -1
max_dept = -1
last_deptno = 0
cur_deptNo=0
num = 0
total=0
dept_info = []
max_info = []
for word_count in sys.stdin:
    word_count = word_count.strip() # Removes whitespace from key_value string
    data = word_count.split("\t") # Splits a key_value string into a key and a value.
    if len(data)==3: #dept data
        node = [data[0],data[1],data[2]]
        dept_info.append(node)
    elif len(data)==2: #student data
        deptNo, gpa = data[0], data[1]
        if last_deptno!=data[0]: #another group (another deptno)
            if num!=0 and (total/num) > 3.5 :
                node = [max_dept, max_gpa]
                max_info.append(node)
            last_deptno=data[0]
            max_gpa=data[1]
            max_dept=data[0]
            num=0
            total=0
        else: 
            if max_gpa<data[1]:
                max_gpa=data[1]
                max_dept=data[0]
        total+=float(gpa)
        num+=1
if (total/num)>3.5 : 
    node = [max_dept, max_gpa]
    max_info.append(node)
for i in max_info:
    for j in dept_info:
        if(i[0]==j[0]):
            print("{}\t{}\t{}".format(j[1], i[1], j[2]))
            break
