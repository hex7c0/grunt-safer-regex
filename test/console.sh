#!/bin/sh

echo "\nRunnning bash test\n"

# 1° run
grunt1=`grunt --no-color`

object_output1="Running \"safer:object\" (safer) task
 > tmp/bad
>> /^(a?){25}(a){25}$/
>> /foo|(x+x+)+y/
>> /(.*){1,32000}[bc]/
>> /^(a?){25}(a){25}$/
>> /foo|(x+x+)+y/
>> /(.*){1,32000}[bc]/
>> '^(a?){25}(a){25}$'
>> 'foo|(x+x+)+y'
>> '(.*){1,32000}[bc]'
>> '^(a?){25}(a){25}$'
>> 'foo|(x+x+)+y'
>> '(.*){1,32000}[bc]'

Warning: Task \"safer:object\" failed. Use --force to continue.

Aborted due to warnings."

if [ "$grunt1" != "$object_output1" ]; then
  echo "ERROR: 1° run output is different from test"
  exit 1 # terminate and indicate error
fi

# 2° run
grunt2=`grunt --no-color --force`

object_output2="Running \"safer:object\" (safer) task
 > tmp/bad
>> /^(a?){25}(a){25}$/
>> /foo|(x+x+)+y/
>> /(.*){1,32000}[bc]/
>> /^(a?){25}(a){25}$/
>> /foo|(x+x+)+y/
>> /(.*){1,32000}[bc]/
>> '^(a?){25}(a){25}$'
>> 'foo|(x+x+)+y'
>> '(.*){1,32000}[bc]'
>> '^(a?){25}(a){25}$'
>> 'foo|(x+x+)+y'
>> '(.*){1,32000}[bc]'

Warning: Task \"safer:object\" failed. Used --force, continuing.

Running \"safer:with_dot\" (safer) task
 > tmp/bad
>> /^(a?){25}(a){25}$/
>> /foo|(x+x+)+y/
>> /(.*){1,32000}[bc]/
>> /^(a?){25}(a){25}$/
>> /foo|(x+x+)+y/
>> /(.*){1,32000}[bc]/
>> '^(a?){25}(a){25}$'
>> 'foo|(x+x+)+y'
>> '(.*){1,32000}[bc]'
>> '^(a?){25}(a){25}$'
>> 'foo|(x+x+)+y'
>> '(.*){1,32000}[bc]'

Warning: Task \"safer:with_dot\" failed. Used --force, continuing.

Done, but with warnings."

if [ "$grunt2" != "$object_output2" ]; then
  echo "ERROR: 2° run output is different from test"
  exit 1 # terminate and indicate error
fi
