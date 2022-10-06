

# Intro
  - %N% insert newline
  - %NW% insert windows newline
  - %QB% insert back quote
  - %QD% insert double quote
  - %QS% insert single quote
  - %R%°CHARACTERS≈number؟ insert a string with CHARACTERS repeated number times.
  - %RF% read file and insert it after running it through the processing subsection.
  - %SA% paste selected text as is
  - %SL% paste selection lower cased
  - %SU% paste selection upper cased
  - %T% insert tab/spaces
  - ~~%SC% paste selected text camel cased~~
  - ~~%SG% paste selected text slug cased~~
  - ~~%SN% paste selected text snaked cased~~
  - ~~%SP% paste selected text pascal cased~~
  - ~~%SS% paste selected text space cased~~
  - ~~%ST% paste selection title cased~~


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
