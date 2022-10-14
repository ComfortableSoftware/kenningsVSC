

# Intro
- An ***OPINIONATED‼*** snippets replacement/enhancement extension for VS-Code
- ### COMMANDS
  - %N% insert newline
    - "body": `this is an example%N%of using newline` inserts:
      <pre>this is an example
      of using newline</pre>
  - %QB% insert back quote / backtick
    - "body": `this inserts a %QB% backtick character` inserts:
      <pre>this inserts a ` backtick character</pre>
  - %QD% insert double quote
    - "body": `this inserts a %QD% double quote character` inserts:
      <pre>this inserts a " double quote character</pre>
  - %QS% insert single quote
    - "body": `this inserts a %QS% single quote character` inserts:
      <pre>this inserts a ' single quote character</pre>
  - %R%°CHARACTERS°number° insert a string with CHARACTERS repeated number times.
  - %RF% read file and insert it after running it through the processing subsection.
  - %SL% paste selection lower cased
  - %ST% paste selected text as is
  - %SU% paste selection upper cased
    - %SL% %ST% and %SU% paste all selections into the area between first selected character and last selected character, anything not included in a selection between those characters will be lost.
    - These three paste all selections in order when included in a "body" string.
  - %SL°#% paste selection # lower cased
  - %ST°#% paste selection # text as is
  - %SU°#% paste selection # upper cased
    - %SL°#% %ST°#% and %SU°#% paste the numbered selection into the area between same numbered space.
    - Anything not selected between first and last character, or not explicitly inserted bay one of the %S** commands will be lost.
  - %T% insert tab/spaces
  - ctrl+alt+c characters/communicate
  - ctrl+alt+d define
    - If if, elif, else.
    - Function normal, class, boolean option, multi option, single option.
    - Class.
  - ctrl+alt+p phrases
    - Empty _dictToRtn_, _boolToRtn_, _intToRtn_, _tuplToRtn_, _strToRtn_
    - Return _dictToRtn_, _boolToRtn_, _intToRtn_, _tuplToRtn_, _strToRtn_
    - Add to _dictToRtn_, _boolToRtn_, _intToRtn_, _tuplToRtn_, _strToRtn_
    - locals().update()
  - ~~%NW% insert windows newline~~
  - ~~%SC% paste selected text camel cased~~
  - ~~%SG% paste selected text slug cased~~
  - ~~%SN% paste selected text snaked cased~~
  - ~~%SP% paste selected text pascal cased~~
  - ~~%SS% paste selected text space cased~~
  - ~~%ST% paste selection title cased~~
        <pre>quick examples of todo case changing
        to.camel('what_the_heck')      // "whatTheHeck"
        to.capital('what the heck')    // "What The Heck"
        to.constant('whatTheHeck')     // "WHAT_THE_HECK"
        to.dot('whatTheHeck')          // "what.the.heck"
        to.inverse('whaT tHe HeCK')    // "WHAt ThE HeCK"
        to.lower('whatTheHeck')        // "what the heck"
        to.pascal('what.the.heck')     // "WhatTheHeck"
        to.sentence('WHAT THE HECK.')  // "What the heck."
        to.slug('whatTheHeck')         // "what-the-heck"
        to.snake('whatTheHeck')        // "what_the_heck"
        to.space('what.the.heck')      // "what the heck"
        to.title('what the heck')      // "What the Heck"
        to.upper('whatTheHeck')        // "WHAT THE HECK"
        </pre>
- ### CONFIGURATION
  - Ignore file extensions.
    - Array
  - Ignore per directory kennings.
    - Boolean
  - Ignore per project kennings.
    - Boolean
  - Ignore global kennings.
    - Boolean
  - Alias file extensions.
    - > Alias file extensions to a known file type
    - Array
      - "python": [`.zpy`, `.pyz`, `.md`]
      - > These extensions will be treated as python files
- ### FILES
  1. At initialization time files are loaded global first, workbench, directory.
  2. Any entries repeated are replaced so that the quick load file written to `{workbenchPath}/.vscode/kennings/.kenningsTemp/{extension}.kennings.json` contains the closest matches and replaces the previously entered matches.
  - #### GLOBAL FILES.
    - `{extensionPath}/.vscode/kennings.json`
      - > Contains all all file languageIDs together.
        <pre>
        {
          "*": {
            "keys": {
                "body": "stuff to insert",
                "description": "tell people what it does"
            }
          },
          "python": {
            "keys": {
                "body": "stuff to insert",
                "description": "tell people what it does"
          }
        }
        </pre>
    - `{extensionPath}/.vscode/kennings/{fileExtension}.kennings.json`
      - > Contains entries to be used only on a specific file extension.
        <pre>
        {
          "keys": {
              "body": "stuff to insert",
              "description": "tell people what it does"
          }
        }
        </pre>
    - `{extensionPath}/.vscode/kennings/{languageId}.kennings.json`
      - > Contains entries to be used only on a specific languageId.
        <pre>
        {
          "keys": {
              "body": "stuff to insert",
              "description": "tell people what it does"
          }
        }
        </pre>
  - #### PROJECT/WORKBENCH FILES.
    - `{workbenchPath}/.vscode/kennings.json`
      - > Contains all all file languageIDs together.
        <pre>
        {
          "*": {
            "keys": {
                "body": "stuff to insert",
                "description": "tell people what it does"
            }
          },
          "python": {
            "keys": {
                "body": "stuff to insert",
                "description": "tell people what it does"
          }
        }
        </pre>
    - `{workbenchPath}/.vscode/kennings/{fileExtension}.kennings.json`
      - > Contains entries to be used only on a specific file extension.
        <pre>
        {
          "keys": {
              "body": "stuff to insert",
              "description": "tell people what it does"
          }
        }
        </pre>
    - `{workbenchPath}/.vscode/kennings/{languageId}.kennings.json`
      - > Contains entries to be used only on a specific languageId.
        <pre>
        {
          "keys": {
              "body": "stuff to insert",
              "description": "tell people what it does"
          }
        }
        </pre>
  - #### DIRECTORY FILES.
    - `{filePath}/kennings.json`
      - > Contains all all file languageIDs together.
        <pre>
        {
          "*": {
            "keys": {
                "body": "stuff to insert",
                "description": "tell people what it does"
            }
          },
          "python": {
            "keys": {
                "body": "stuff to insert",
                "description": "tell people what it does"
          }
        }
        </pre>
    - `{filePath}/{fileExtension}.kennings.json`
      - > Contains entries to be used only on a specific file extension.
        <pre>
        {
          "keys": {
              "body": "stuff to insert",
              "description": "tell people what it does"
          }
        }
        </pre>
    - `{filePath}/{languageId}.kennings.json`
      - > Contains entries to be used only on a specific languageId.
        <pre>
        {
          "keys": {
              "body": "stuff to insert",
              "description": "tell people what it does"
          }
        }
        </pre>


#
