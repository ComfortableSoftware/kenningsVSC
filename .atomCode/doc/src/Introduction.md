# INTRODUCTION

#### MY OWN PERSONAL SNIPPITS.
  - I do a bit of writing and coding, both of which often have often repeated strings, need for selected text to be inserted, duplicated, changed into a markdown link, etc.
  - I didn't find anything that worked for me so I started with a package I called "Wrapperizer" which was limited but functional.
  - I upgraded to "Insertizer" which is less limited, but still not perfect.
  - Kennings is what my Scottosh great-grandmother called snippets.
  1. Allows substitution of troublesome characters using %`command`%
  2. Upcases selected text for headings, per grammar.
  3. Different keystrokes and strings to insert per grammar.
  4. Turn selected text into an `.md` link.
  5. Needs a support utility called `Kennings Manager`.
    - Atom doesn't do a great job of managing literally generated on the fly keybindings that I have found.
    - This utility takes a `kennings.cson` file and creates the keymap and initialization section of `kennings.coffee` in this package.
      - It also creates a new copy of the source file that is sorted and prettified.

#### QUICK AND DIRTY
  1. Install this package, and the `kenningsManager` Python app.
  2. `cd <directory>` 
     1. Cd to the directory containing your `kennings.cson` file.
  3. `python -m kenningsManager` or 'kenningsManager'
     1. Run the Python utility that creates all of the right files ad snippets.
  4. Edit `~/.atom/packages/kennings/lib/kennings.coffee` file.
     1. The manager left a file `init.coffee` in this directory.
     2. Replace the existing initialization section with the contents of `init.coffee`.
  5. Edit ``~/.atom/packages/kennings/keymaps/kennings.cson` file.
     1. The manager left a file `keymaps.cson` in this directory.
     2. Check it for errors.
  6. `mv kennings.cson kennings.cson.cson`
     1. Any name will work, so will removing it.
     2. It needs to be out of the way for the new keymap file
  7. `mv keymap.cson kennings.cson`
     1. Make the new file created by the utility the keymap to be used.
  8. Restart any open editors.
  9. Enjoy.


###### End of Introduction
