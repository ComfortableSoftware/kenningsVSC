#!/usr/bin/env /usr/bin/python


from cson import parser
import sys


with open ("/rcr/0-sourceCode/0-development/0-ide/0-vscode/0-extensions/kenningsVSC/test.txt", "tw") as FDOUT:
  FDOUT.write(f"""{sys.argv}\n""")
  FDOUT.flush()
  FDOUT.close()


FILENAME = f"""../../.vscode/kennings.cson"""


with open(FILENAME, "tr") as FDIN:
  _dictToRtn_ = parser.load(FDIN)
_strToRtn_ = ""
for _key_, _val_ in _dictToRtn_.items():
  for _key1_, _val1_ in _val_.items():
    _strToRtn_ += f"""\"{_key_}:{_key1_}:{_val1_["description"]}\","""
print(f"""{_strToRtn_}""")


#
