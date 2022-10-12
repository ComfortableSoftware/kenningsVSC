#!/usr/bin/env /usr/bin/python


from cson import parser
import sys


_extensionFilename_ = sys.argv[1]
_workspaceFilename_ = sys.argv[2]
_filename_ = sys.argv[3]
_thisLanguage_ = sys.argv[4]


CBRCE = "}"
CBRKT = "]"
DBLQT = '"'
NEWLINE = "\n"
OBRCE = "{"
OBRKT = "["


_TDict_ = {}
try:
  with open(_extensionFilename_, "tr") as _FDIn_:
    _TDict_.update(parser.load(_FDIn_))
except IOError:
  pass

try:
  with open(_workspaceFilename_, "tr") as _FDIn_:
    _TDict_.update(parser.load(_FDIn_))
except  IOError:
  pass

try:
  with open(_filename_, "tr") as _FDIn_:
    _TDict_.update(parser.load(_FDIn_))
except IOError:
  pass

# print(f"""{_TDict_}""")
_dictToRtn_ = {}
try:
  _dictToRtn_.update(_TDict_["*"])
except KeyError:
  pass
try:
  _dictToRtn_.update(_TDict_[_thisLanguage_])
except KeyError:
  pass
# print(f"""_dictToRtn_ {_dictToRtn_}""")


_strToRtn_ = f"""{OBRKT}{NEWLINE}"""
for _key1_, _val1_ in _dictToRtn_.items():
  _strToRtn_ += f"""  {OBRCE}{NEWLINE}    {DBLQT}label{DBLQT}: {DBLQT}{_key1_}{DBLQT},{NEWLINE}"""
  for _key2_, _val2_ in _val1_.items():
    _strToRtn_ += f"""    {DBLQT}{_key2_}{DBLQT}: {DBLQT}{_val2_}{DBLQT},{NEWLINE}"""
  _strToRtn_ = _strToRtn_[:-1] + f"""{NEWLINE}  {CBRCE},{NEWLINE}"""
_strToRtn_ = _strToRtn_[:-2] + f"""{NEWLINE}{CBRKT}{NEWLINE}"""
print(f"""{_strToRtn_}""")


#
