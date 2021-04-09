#!/usr/bin/env python

import sys

# In Hadoop streaming, the mapper converts the input data into strings of text and pipes it to the stdin.
# And the mapper pipes the output of the key-value pair to the stdout.

for line in sys.stdin: # Reads input data line by line
    line = line.strip() # Removes whitespace from string
    word_list = line.split(",") # Splits a string into a word list.
    name, price, dis = word_list[0], word_list[1], word_list[2]
    print('{}\t{}\t{}'.format(price,name,dis))
#print('{0}\t{1}\t{2}\t{3}'.format(1,name, price ,dis)) # word = key, count = value
