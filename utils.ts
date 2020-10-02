interface ITemplateOptions {
  isUrl?: boolean;
}

type DocBody = GoogleAppsScript.Document.Body;

/**
 * Accepts document body and return a list of
 * template vars.
 *
 * @param docBody
 */
const gatherTemplateVars = (docBody: DocBody) => {
  const tx = docBody.getText();
  const regex = /{{.*?}}/gm;
  let m: RegExpExecArray;
  const templateVars = {};
  while ((m = regex.exec(tx)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match) => {
      templateVars[match] = null;
    });
  }
  return templateVars;
};

const getSheetKeyFromTemplateVar = (key: string, strategy = 'releaseDoc'): string => {
  const registry = {
    releaseDoc: {
      '{{edbas-pg-link}}': 'Link to release distribution 1',
      '{{edbas-version}}': 'Please enter release version',
      '{{edbas-techupdate}}': 'Provide technical update for this release',
    }, // TODO: Mapp the rest after talking with Pinaz
  };
  return registry[strategy][key];
};

const replaceTemplateVar = (docBody: DocBody, templateVarName: string, value: any, opts?: ITemplateOptions) => {
  let elementOfInterest = docBody.findText(templateVarName);
  while (elementOfInterest) {
    // if found a match
    const start = elementOfInterest.getStartOffset();
    const text = elementOfInterest.getElement().asText();
    const lead = text.getText().indexOf(value);

    // replace holder with value
    text.replaceText(templateVarName, value);
    // handle urls differently
    if (opts && opts.isUrl) {
      text.setLinkUrl(start, start + value.length - 1, value);
    }
    elementOfInterest = docBody.findText(templateVarName, elementOfInterest);
  }
};

export { ITemplateOptions, gatherTemplateVars, replaceTemplateVar, getSheetKeyFromTemplateVar };
