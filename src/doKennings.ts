

import * as vscode from "vscode";
import * as path from "path";
//import * as PARSER from "cson";
import * as FS from "fs";
import * as CP from "child_process";
import { PassThrough } from "stream";

// editor.edit((edit: string) => edit.replace(thisSelection, thisSelectedUpcaseText));
// editor.selections = vscode.editor.selections.map( sel => new vscode.Selection(sel.start.translate(0,1), sel.end.translate(0,1)));


export class doKennings {

  constructor(context: vscode.ExtensionContext) {
    type GenericDictionary<T> = {
      [x: string]: T | GenericDictionary<T>;
    }
    this.activeFilename = "";
    this.activeFilepath = "";
    doKennings.dictToUse = {};
    this.document = "";
    this.editor = "";
    this.extensionPath = "";
    this.myArgs = [];
    this.myContext = "";
    this.myERR = "";
    this.mySTDERR = "";
    this.mySTDOUT = "";
    this.RESULT = "";
    this.stringArray = [];
    this.thisIndent = "";
    this.thisLanguage = "";
    this.thisSelectedText = "";
    this.thisSelection = "";
    this.thisTabsize = "";
    this.window = "";
    this.workspacePath = "";
    this.workspaceUri = "";
  }

  activeFilename: any;
  activeFilepath: any;
  static dictToUse: any;
  document: any;
  editor: any;
  extensionPath: any;
  myArgs: any;
  myContext: any;
  myERR: any;
  mySTDERR: any;
  mySTDOUT: any;
  RESULT: any;
  stringArray: any;
  thisIndent: any;
  thisLanguage: any;
  thisSelectedText: any;
  thisSelection: any;
  thisTabsize: any;
  window: any;
  workspacePath: any;
  workspaceUri: any;


  insertKennings (args: any, context:vscode.ExtensionContext): void {

    this.myArgs = args;
    this.myContext = context;

    this.extensionPath = context.asAbsolutePath("");

    this.window = vscode.window;

    this.editor = this.window.activeTextEditor;
    this.thisTabsize = this.editor.options.tabSize;
    this.thisSelection = this.editor?.selection;

    this.document = this.editor.document;
    this.activeFilename = this.document.fileName;
    this.thisLanguage = this.document.languageId;
    this.thisSelectedText = this.document.getText(this.thisSelection);

    this.activeFilepath = path.dirname(this.activeFilename);
    this.thisIndent = this.thisSelection.active.character / this.thisTabsize;

    this.workspaceUri = vscode.workspace.textDocuments[0].uri;
    this.workspacePath = vscode.workspace.getWorkspaceFolder(this.workspaceUri)?.uri.fsPath;

    this.makeList([
        "*",
        this.thisLanguage
    ]);
    const items = this.makeItems(this.mySTDOUT);
    console.log(`items ${items}`);
    this.getInput(items);
  }


  makeList(languages: Array<string>): any {
    console.log(`Making list for languages ${languages.toString()}`);
    let data = FS.readFileSync(`${this.extensionPath}/.vscode/kennings.cson`);
    const TDictToRtn = JSON.parse('' + data);
    try {
      data = FS.readFileSync(`${this.workspacePath}/.vscode/kennings.cson`);
      TDictToRtn.update(JSON.parse('' + data));
    }
    catch (e) {
      console.log(`INFO: No project ".vscode/kennings.cson" file.`);
    }
    try {
      data = FS.readFileSync(`${this.activeFilepath}/kennings.cson`);
      TDictToRtn.update(JSON.parse('' + data));
    }
    catch (e) {
      console.log(`INFO: No file "kennings.cson" file.`);
    }
    try {
      doKennings.dictToUse = TDictToRtn["*"];
    }
    catch (e) {
      console.log(`No entries found for "*".`);
    }
    languages.forEach(function (thisLanguage) {
      try {
        doKennings.dictToUse.update(TDictToRtn[thisLanguage]);
      }
      catch (e) {
        console.log(`No entries found for language "${thisLanguage}".`);
      }
    });
  }


/*
  makeList(languages: Array<string>): any {
    try {
      const execCommand = `${this.extensionPath}/src/utils/makeList.py "${this.extensionPath}"`;
      CP.exec(
          execCommand,
          (error, stdout, stderr) => {
              this.myERR = error;
              console.log(`error ${error}`);
              this.mySTDERR = stderr;
              console.log(`stderr ${stderr}`);
              this.mySTDOUT = stdout;
              console.log(`stdout ${stdout}`);
          });
    }
    catch (e) {
      console.error(`Something went wrong.`);
      console.error(e);
      return;
    }
    this.stringArray = this.mySTDOUT.split("|");
    console.log(`stringArray`);
    console.log(this.stringArray);
  }
*/


  getInput(items: any): any {
    console.log(`Getting input for items ${items.toString()}`);
    const myQuickPick = vscode.window.createQuickPick();
    myQuickPick.title = "Pick a kenning";
    myQuickPick.canSelectMany = false;
    myQuickPick.matchOnDescription = true;
    //myQuickPick.matchOnDetail = true;
    myQuickPick.placeholder = "Pick a kenning";
    myQuickPick.items = items;
    //myQuickPick.buttons = [new RefreshButton()];
    myQuickPick.onDidAccept(() => {
        console.log(`Accepted ${myQuickPick.selectedItems.toString()}`);
        this.RESULT = myQuickPick.selectedItems[0];
      });
    myQuickPick.onDidHide(() => {
      myQuickPick.dispose();
    });
    myQuickPick.show();
    console.log(`RESULT ${this.RESULT.toString()}`);
    console.log(`Got input`);
  }

  makeItems(stringToSplit): any {
    const itemsToRtn: any = [];
    const splitStr = stringToSplit.split("|");
    for (const thisItem in splitStr) {
      const thisSplitItem = splitStr[thisItem].split("°");
      const tempDict = {
        label: thisSplitItem[1],
        description: thisSplitItem[2]
      };
      itemsToRtn.push(tempDict);
    }
    return itemsToRtn;
  }
}

