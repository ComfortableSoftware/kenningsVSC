# kennings PACKAGE

- #### Wraps selected text in arbitrary preconfigured text.
  - ##### Makes .md and .html links
    - ###### LowerCaseFixedText when true lower cases the fixedText before replacing %FT% with it.
    - ###### UpperCaseSelectedText when true upper cases selectedText before replacing %ST% with it.
    - ###### LinkifyFixedText when true replaces spaces and tabs by dashes and removes all disallowed characters from fixedText before replacing %FT% with it.
    - ###### newTextList:
      1. "\[%ST%\]\(\#%FT%\)"
        - Wrap a link in the current file.
      2. "\[%ST%\]\(./fileOne.md\#%FT%\)",
        - Wrap a link in fileOne.md in the local directory.
          - "%ST%" will be replaced with the selected text from the editor unmodified.
          - "%FT%" will be replaced by the text which has been processed through the regex in patternList and replacement in replaceList.
          - Select text to wrap in a link in an editor buffer.
            - Select "Hello there!" alt-ctrl-w, 0 will replace "Hello there!" with "\\[Hello there!\\]\\(#hello-there\\)"
            - Select "Hello there!" alt-ctrl-w, 1 will replace "Hello there!" with "\\[Hello there!\\]\\(./fileOne.md#hello-there\\)"


  - ![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)
[](#)1
