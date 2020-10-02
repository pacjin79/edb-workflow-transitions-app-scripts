import { payload as releaseFormData } from './mocks/mockReleaseFormPayload';
describe('Test', function () {
  it('should parse', function () {
    console.log('payload = ', releaseFormData);
    releaseFormData.forEach(rf => {
      const { 
        Timestamp,
      } = rf;
      const downloadLink = rf["Link to release distribution 1"];
      const documentLink = rf["Link to release distribution 2"];
      const relaseLink = rf['Link to release distribution 3'];
      rf["Please enter release version"];
      rf["Provide technical update for this release"]
      rf.Timestamp
    })
  });
});
