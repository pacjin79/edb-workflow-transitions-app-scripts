import { gatherTemplateVars, getSheetKeyFromTemplateVar, replaceTemplateVar } from './utils';

const onOpen = () => {
  const sheet = SpreadsheetApp.getActive();
  const menuItem = [
    {
      name: 'Generate release artifacts',
      functionName: 'generateReleaseArtifacts',
    },
  ];
  sheet.addMenu('EDB Integrations', menuItem);
};

const importToJira = () => {
  const ui = SpreadsheetApp.getUi();
  const button_clicked = ui.alert('hello, just a test');
  // Logger.log('here we are and respnose = ', button_clicked);
  if (button_clicked === ui.Button.YES) {
    Logger.log('user confirmed, we do the actual export here');
  }
  // const response = ui.prompt('Import the roadmap into JIRA?', ui.ButtonSet.YES_NO);
  // if (response.getSelectedButton() == ui.Button.YES) {
  //   Logger.log('The user\'s name is %s.', response.getResponseText());
  // } else if (response.getSelectedButton() == ui.Button.NO) {
  //   Logger.log('The user didn\'t want to provide a name.');
  // } else {
  //   Logger.log('The user clicked the close button in the dialog\'s title bar.');
  // }
};

const extractDataPoints = () => {
  const workbook = SpreadsheetApp.getActiveSpreadsheet();
  const templateId = '1IoC07mpmROPoSUazuZpeaibSZFpu9B3zD8vAwuyipYs';
  const sheet = workbook.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const header = data[0];
  const content = data.splice(1);
  const transformedData = content.map((row) => {
    return row.reduce((aggr, value, index) => {
      const key = header[index];
      aggr[key] = value;
      return aggr;
    }, {});
  });
  // Logger.log('transforemd data = ', JSON.stringify(transformedData, null, 2));

  const template = DriveApp.getFileById(templateId);
  const newDocFile = template.makeCopy();
  const format = Utilities.formatDate;
  const newDoc = DocumentApp.openById(newDocFile.getId());
  newDoc.setName('EDBAS release notes - ' + format(new Date(), 'America/New_York', 'MM-dd-yyyy'));
  const newDocbody = newDoc.getBody();
  // get the variables
  const templateVarsMap = gatherTemplateVars(newDocbody);
  // get values from sheet for each variable

  Logger.log('template vars = ', templateVarsMap);

  Object.keys(templateVarsMap).forEach((key) => {
    const sheetKey = getSheetKeyFromTemplateVar(key);
    const sheetValue = transformedData[0][sheetKey];
    // Logger.log('key = ', key);
    // Logger.log('sheet Value = ', sheetValue);
    // Logger.log('sheet key = ', sheetKey);
    // Logger.log('transofrmed data = ', transformedData);
    if (sheetValue) {
      if (sheetKey.toLowerCase().indexOf('link') === -1) {
        replaceTemplateVar(newDocbody, key, sheetValue);
      } else {
        replaceTemplateVar(newDocbody, key, sheetValue, { isUrl: true });
      }
    }
  });

  newDoc.saveAndClose();

  // doc.getBody().setText('Just a test');
  // doc.saveAndClose();
};

const generateReleaseArtifacts = () => {
  const ui = SpreadsheetApp.getUi();
  const button_clicked = ui.alert('Generate release artifacts?');
  if (button_clicked === ui.Button.YES) {
    extractDataPoints();
  }
};
