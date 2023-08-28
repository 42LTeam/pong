var assert = require('assert');
var src = require(__dirname + '/../index');
var cache = src({expiry:2});
describe('Simple Redis Cache', function(){
  it('should connect to a redis instance', function(done){
    //Give redis some time to init
    setTimeout(function(){
      assert.equal('localhost', cache.client.host);
      done();
    }, 100);
  });
  it('should set a key with a value', function(done){
    cache.set('test', 'this is a string', done);
  });
  it('should retrieve the value', function(done){
    cache.get('test', function(err, value){
      assert.equal('this is a string', value);
      done();
    });
  });
  it('the key should be valid still', function(done){
    setTimeout(function(){
      cache.get('test', function(err, value){
        assert.notEqual(null, value);
        done();
      })}, 1000);
  });
  it('the key should be invalid now', function(done){
    setTimeout(function(){
      cache.get('test', function(err, value){
        assert.equal(null, value);
        done();
      })}, 3000);
  });
  it('should be able to delete a key', function(done){
    cache.set('test2', 'whatever', function(err){
      cache.del('test2', function(){
        cache.get('test2', function(err, value){
          assert.equal(value, null);
          done()
        });
      });
    });
  });
});
