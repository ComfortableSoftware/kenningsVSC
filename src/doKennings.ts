

import * as vscode from "vscode";
import * as path from "path";
import * as PARSER from "cson-parser";
import * as FS from "fs";
import * as CP from "child_process";

// editor.edit((edit: string) => edit.replace(thisSelection, thisSelectedUpcaseText));
// editor.selections = vscode.editor.selections.map( sel => new vscode.Selection(sel.start.translate(0,1), sel.end.translate(0,1)));


export class doKennings {
  extensionPath: any;
  window: any;
  editor: any;
  thisTabsize: any;
  thisSelection: any;
  document: any;
  activeFilename: any;
  thisLanguage: any;
  thisSelectedText: any;
  activeFilepath: any;
  thisIndent: any;
  workspaceUri: any;
  workspacePath: any;
  myERR: any;
  mySTDERR: any;
  mySTDOUT: any;
  RESULT: any;

  constructor(context: vscode.ExtensionContext) {
    this.extensionPath = "";
    this.window = "";
    this.editor = "";
    this.thisTabsize = "";
    this.thisSelection = "";
    this.document = "";
    this.activeFilename = "";
    this.thisLanguage = "";
    this.thisSelectedText = "";
    this.activeFilepath = "";
    this.thisIndent = "";
    this.workspaceUri = "";
    this.workspacePath = "";
    this.myERR = "";
    this.mySTDERR = "";
    this.mySTDOUT = "";
    this.RESULT = "";
  }


  insertKennings (args: any, context:vscode.ExtensionContext): void {
    this.extensionPath = context.asAbsolutePath("");
    //console.log(`extensionPath ${this.extensionPath}`);

    this.window = vscode.window;
    //console.log(`window`, this.window);

    this.editor = this.window.activeTextEditor;
    //console.log(`editor `, this.editor);
    this.thisTabsize = this.editor.options.tabSize;
    //console.log(`thisTabsize ${this.thisTabsize}`);
    this.thisSelection = this.editor?.selection;
    //console.log(`thisSelection `, this.thisSelection);

    this.document = this.editor.document;
    //console.log(`document `, this.document);
    this.activeFilename = this.document.fileName;
    //console.log(`activeFilename ${this.activeFilename}`);
    this.thisLanguage = this.document.languageId;
    //console.log(`thisLanguage ${this.thisLanguage}`);
    this.thisSelectedText = this.document.getText(this.thisSelection);
    //console.log(`thisSelectedText ${this.thisSelectedText}`);

    this.activeFilepath = path.dirname(this.activeFilename);
    //console.log(`activeFilepath ${this.activeFilepath}`);
    this.thisIndent = this.thisSelection.active.character / this.thisTabsize;
    //console.log(`thisIndent ${this.thisIndent}`);

    this.workspaceUri = vscode.workspace.textDocuments[0].uri;
    //console.log(`workspaceUri ${this.workspaceUri}`);
    this.workspacePath = vscode.workspace.getWorkspaceFolder(this.workspaceUri)?.uri.fsPath;
    //console.log(`workspacePath ${this.workspacePath}`);

    //console.log(`args `);
    //console.log(args);
    //console.log(args["myKey"]);

    try {
      const execCommand = `${this.extensionPath}/src/utils/makeList.py`;
      this.RESULT = CP.exec(
          execCommand,
          (ERR, STDOUT, STDERR) => {
              this.myERR = ERR;
              this.mySTDERR = STDERR;
              this.mySTDOUT = STDOUT;
          }
      );
    }
    finally {
      console.log(`RESULT `);
      console.log(this.RESULT);
      console.log(`exec failed ${this.myERR}`);
    }
    console.log(`myERR `);
    console.log(this.myERR);
    console.log(`mySTDERR `);
    console.log(this.mySTDERR);
    console.log(`mySTDOUT `);
    console.log(this.mySTDOUT);
  }

}
