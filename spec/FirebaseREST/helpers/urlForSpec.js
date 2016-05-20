const urlFor = require('../../../dist/FirebaseREST/helpers/urlFor').default;

const firebaseURL = 'https://app.firebaseio.com';
const firebaseURLSlashed = 'https://app.firebaseio.com/';

// While only interally privately used, this function is slippery enough to
// warrant testing
describe('#urlFor', () => {
  it('joins paths to the base URL with only one /', () => {
    expect(urlFor(firebaseURL, 'path')).toEqual('https://app.firebaseio.com/path.json');
    expect(urlFor(firebaseURL, '/path')).toEqual('https://app.firebaseio.com/path.json');

    expect(urlFor(firebaseURLSlashed, 'path')).toEqual('https://app.firebaseio.com/path.json');
    expect(urlFor(firebaseURLSlashed, '/path')).toEqual('https://app.firebaseio.com/path.json');
  });

  it('properly adds a single param', () => {
    const params = { auth: 'secret' };
    const finalURL = urlFor(firebaseURL, 'path', params);
    expect(finalURL).toEqual('https://app.firebaseio.com/path.json?auth=secret');
  });

  it('properly adds multiple params', () => {
    const params = { auth: 'secret', shallow: true };
    const finalURL = urlFor(firebaseURL, 'path', params);
    expect(finalURL).toEqual('https://app.firebaseio.com/path.json?auth=secret&shallow=true');
  });

  it('properly JSON encodes parameters', () => {
    const params = {
      auth: 'secret',
      orderBy: '$value', startAt: 'ca$h', endAt: 'm0n3`/', equalTo: '////',
      limitToFirst: 1, limitToLast: '10',
    };
    const finalURL = urlFor(firebaseURL, 'path', params);
    expect(finalURL).toEqual(
      'https://app.firebaseio.com/path.json?auth=secret' +
        '&orderBy="$value"&startAt="ca$h"&endAt="m0n3`/"&equalTo="////"' +
        '&limitToFirst=1&limitToLast=10'
    );
  });
});
