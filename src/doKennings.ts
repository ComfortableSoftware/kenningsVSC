

import * as vscode from "vscode";
import * as path from "path";
import * as FS from "fs";
import * as CP from "child_process";
import { PassThrough } from "stream";

// editor.edit((edit: string) => edit.replace(thisSelection, thisSelectedUpcaseText));
// editor.selections = vscode.editor.selections.map( sel => new vscode.Selection(sel.start.translate(0,1), sel.end.translate(0,1)));


export class doKennings {
/*
  constructor(context: vscode.ExtensionContext) {
    doKennings.activeFilename = "";
    doKennings.activeFilepath = "";
    doKennings.dictToUse = {};
    doKennings.document = "";
    doKennings.editor = "";
    doKennings.extensionPath = "";
    doKennings.myArgs = "";
    doKennings.myContext = "";
    doKennings.myERR = "";
    doKennings.mySTDERR = "";
    doKennings.mySTDOUT = "";
    doKennings.RESULT = "";
    doKennings.stringArray = [];
    doKennings.thisIndent = "";
    doKennings.thisLanguage = "";
    doKennings.thisSelectedText = "";
    doKennings.thisSelection = "";
    doKennings.thisTabsize = "";
    doKennings.window = "";
    doKennings.workspacePath = "";
    doKennings.workspaceUri = "";
  }
*/

  static activeFilename: any;
  static activeFilepath: any;
  static dictToUse: any;
  static document: any;
  static editor: any;
  static extensionPath: any;
  static myArgs: any;
  static myContext: any;
  static myERR: any;
  static mySTDERR: any;
  static mySTDOUT: any;
  static RESULT: any;
  static stringArray: any;
  static thisIndent: any;
  static thisLanguage: any;
  static thisSelectedText: any;
  static thisSelection: any;
  static thisTabsize: any;
  static window: any;
  static workspacePath: any;
  static workspaceUri: any;


  async insertKennings (args: any, context:vscode.ExtensionContext): Promise<void> {

    doKennings.myArgs = args;
    doKennings.myContext = context;

    doKennings.extensionPath = context.asAbsolutePath("");

    doKennings.window = vscode.window;

    doKennings.editor = doKennings.window.activeTextEditor;
    doKennings.thisTabsize = doKennings.editor.options.tabSize;
    doKennings.thisSelection = doKennings.editor?.selection;

    doKennings.document = doKennings.editor.document;
    doKennings.activeFilename = doKennings.document.fileName;
    doKennings.thisLanguage = doKennings.document.languageId;
    doKennings.thisSelectedText = doKennings.document.getText(doKennings.thisSelection);

    doKennings.activeFilepath = path.dirname(doKennings.activeFilename);
    doKennings.thisIndent = doKennings.thisSelection.active.character / doKennings.thisTabsize;

    doKennings.workspaceUri = vscode.workspace.textDocuments[0].uri;
    doKennings.workspacePath = vscode.workspace.getWorkspaceFolder(doKennings.workspaceUri)?.uri.fsPath;

    const allDone = await this.buildAndGetInput();
    //doKennings.makeList([
    //    "*",
    //    doKennings.thisLanguage
    //]);
    //const items = doKennings.makeItems(doKennings.mySTDOUT);
    //console.log(`items ${items}`);
    //doKennings.getInput(items);
  }

  async buildAndGetInput(): Promise<boolean> {
    await this.doTheThings();
    console.log(`mySTDOUT to parse ${doKennings.mySTDOUT}`);
    doKennings.dictToUse = JSON.parse(doKennings.mySTDOUT);
    console.log(`dictToUse before getInput ${doKennings.dictToUse.toString()}`);
    const gotInput = await this.getInput(doKennings.dictToUse);
    return true;
  }

  async doTheThings(): Promise<boolean> {
    try {
      const commandStr = `${doKennings.extensionPath}/utils/makeList.py ` +
          `"${doKennings.extensionPath}/.vscode/kennings.json" ` +
          `"${doKennings.workspacePath}/.vscode/kennings.json" ` +
          `"${doKennings.activeFilepath}/kennings.json" ` +
          `"${doKennings.thisLanguage}"`;
      console.log(`commandStr ${commandStr}`);
      await CP.exec(
          commandStr,
          (error, stdout, stderr) => {
              doKennings.myERR = error;
              console.log(`error ${error}`);
              doKennings.mySTDERR = stderr;
              console.log(`stderr ${stderr}`);
              doKennings.mySTDOUT = stdout;
              console.log(`stdout ${stdout}`);
              console.log(`mySTDOUT ${doKennings.mySTDOUT}`);
          });
    }
    catch (e) {
      console.error(`Something went wrong.`);
      console.error(e);
      return false;
    }
    return true;
  }


  makeList(languages: Array<string>): any {
    console.log(`Making list for languages [${languages.toString()}]`);
    let data = FS.readFileSync(`${doKennings.extensionPath}/.vscode/kennings.json`);
    console.log(`data ${data.toString()}`);
    const TDictToRtn = JSON.parse('' + data);
    console.log(`TDictToRtn 1 ${TDictToRtn.toString()}`);
    try {
      data = FS.readFileSync(`${doKennings.workspacePath}/.vscode/kennings.json`);
      console.log(`data ${data.toString()}`);
      TDictToRtn.update(JSON.parse('' + data));
      console.log(`TDictToRtn 2 ${TDictToRtn.toString()}`);
    }
    catch (e) {
      console.log(`INFO: No project ".vscode/kennings.json" file.`);
      console.log(e);
    }
    try {
      data = FS.readFileSync(`${doKennings.activeFilepath}/kennings.json`);
      console.log(`data ${data.toString()}`);
      TDictToRtn.update(JSON.parse('' + data));
      console.log(`TDictToRtn 3 ${TDictToRtn.toString()}`);
  }
    catch (e) {
      console.log(`INFO: No file "kennings.json" file.`);
      console.log(e);
    }
    try {
      console.log(`TDictToRtn[*] 4`);
      console.log(TDictToRtn["*"]);
      doKennings.dictToUse = TDictToRtn["*"];
    }
    catch (e) {
      console.log(`No entries found for "*".`);
      console.log(e);
  }
    languages.forEach(function (thisLanguage) {
      try {
        doKennings.dictToUse.update(TDictToRtn[thisLanguage]);
      }
      catch (e) {
        console.log(`No entries found for language "${thisLanguage}".`);
        console.log(e);
      }
    });
  }


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
        doKennings.RESULT = myQuickPick.selectedItems[0];
      });
    myQuickPick.onDidHide(() => {
      myQuickPick.dispose();
    });
    myQuickPick.show();
    console.log(`RESULT ${doKennings.RESULT.toString()}`);
    console.log(`Got input`);
  }


  makeItems(stringToSplit): any {
    const itemsToRtn: any = [];
    const splitStr = stringToSplit.split("|");
    for (const thisItem in splitStr) {
      console.log(`thisItem ${thisItem.toString()}`);
      const TStr = splitStr[thisItem].toString();
      const thisSplitItem = TStr.split("°");
      const tempDict = {
        label: thisSplitItem[1],
        description: thisSplitItem[2]
      };
      itemsToRtn.push(tempDict);
    }
    return itemsToRtn;
  }
}

