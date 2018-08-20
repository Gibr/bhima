const xlsx = require('../../server/lib/renderers/xlsx');

const { expect } = require('chai');
const _ = require('lodash');

describe('util.js', () => {

  it('Should return a xlsx buffer', (done) => {
    const data = {
      rows : [{ Firstname : 'Alice', Lastname : 'Bob' }],
    };
    xlsx.render(data)
      .then(reportStream => {
        expect(_.isBuffer(reportStream)).to.be.equal(true);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should work for an empty object', (done) => {
    const data = {};
    xlsx.render(data)
      .then(reportStream => {
        expect(_.isBuffer(reportStream)).to.be.equal(true);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Should check the number of rows to write in the xlsx file', () => {
    const data = {
      rows : [{ Firstname : 'Alice', Lastname : 'Bob' }],
    };
    const result = xlsx.find(data);
    expect(result.length).to.be.equal(1);
  });

  it('Should check the number of rows to write in the xlsx file by specifying a key', () => {
    const data = {
      students : [
        { name : 'Alice' },
        { name : 'Bob' }],
    };
    // rowsDataKey is the specific key where the renderer will get data to write in the expected file
    // it is used when the provided array doesn't have this key "rows"
    const options = { rowsDataKey : 'students' };
    const result = xlsx.find(data, options);
    expect(result.length).to.be.equal(2);
    expect(data.students).to.deep.equal(result);
  });

});
