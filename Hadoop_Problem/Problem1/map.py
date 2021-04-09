#!/usr/bin/env python

import sys

# In Hadoop streaming, the mapper converts the input data into strings of text and pipes it to the stdin.
# And the mapper pipes the output of the key-value pair to the stdout.

for line in sys.stdin: # Reads input data line by line
    line = line.strip() # Removes whitespace from string
    word_list = line.split(',') # Splits a string into a word list.
    
    if len(word_list)==4: #dept
        deptNo=word_list[0]
        deptName=word_list[1]
        dCampus=word_list[2]
        print('{0}\t{1}\t{2}'.format(deptNo, deptName, dCampus)) # word = key, count = value

    elif len(word_list)==6: #student
        sGpa=word_list[5]
        sDeptno=word_list[4]
        print('{0}\t{1}'.format(sDeptno, sGpa)) # word = key, count = value
