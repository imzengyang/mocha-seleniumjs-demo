
require('chromedriver');
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var driver = new webdriver.Builder().forBrowser('chrome').build();
var arr = ["hello world","hello john","good morning","good class"];

describe('hooks', function() {
    
    
  before(function() {
      console.log('before...........')
    driver.get('https://autowebtest.github.io/add-remove/');
  });

  after(function(done) {
      console.log("after..........");
     driver.quit().then(function(){
        return new Promise((resovle,reject)=>{
            resovle();
            
        }).then(done);
    })
  });

  beforeEach(function() {
      console.log('beforeEach........')
    // runs before each test in this block
  });

  afterEach(function(done) {
      console.log("afterEach........")
    driver.takeScreenshot().then((imagedata)=>{
        var date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let filename = year+"_"+month+"_"+day+"_"+hour+"_"+min+"_"+sec+".png"
        require('fs').writeFileSync(filename,imagedata,'base64');
        return new Promise((resovle,reject)=>{
            resovle();
            
        }).then(done);
    })
  });

  describe('#elemenet control', function() {
    this.timeout(30*1000)
    it('add 4 element 长度应该为4', function(done) { 
        arr.forEach((item)=>{
            driver.findElement(By.id('text')).sendKeys(item);
            driver.findElement(By.id('text')).submit(); 
            
        })
        driver.executeScript('document.querySelector(".clear-all").scrollIntoView()');
        driver.findElements(By.className('new-item')).then(eles=>{
            return new Promise(function(resovle,reject){
                assert(4,eles.length);
                resovle();
            }).then(done);
        });
    });

describe('#elemenet control', function() {
    it('shanchu', function(done) { 
        driver.findElement(By.css('.clear-all')).click();
        driver.switchTo().alert().accept().then(()=>{
            return new Promise(function(resovle,reject){
                resovle();
            }).then(done);
        });
    });
  });
  });

});