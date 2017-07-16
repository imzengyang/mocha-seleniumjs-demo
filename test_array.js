/**
 * mocha selenium-webdriver demo
 */
require('chromedriver');
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var driver = new webdriver.Builder().forBrowser('chrome').build();

var arr = ["hello world", "hello john", "good morning", "good class"];
// 声明 mocha
describe('hooks', function () {
    this.timeout(30 * 1000)   // 设置默认超时时间为30秒
    before(function () {     // 所有test case运行之前
        console.log('before ...........')
        driver.get('https://autowebtest.github.io/add-remove/');
    });

    after(function (done) {    // 所有test case运行之后
        console.log("after.........."); 
        driver.quit().then(function () {
            return new Promise((resovle, reject) => {
                resovle();
            }).then(done);
        })
    });

    beforeEach(function () {     //每一个test case 运行之前
        console.log('beforeEach........')
        // runs before each test in this block
    });

    afterEach(function (done) {   // 每一个test case 运行之后
        console.log("afterEach........")
        driver.takeScreenshot().then((imagedata) => {
            var date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            let filename = year + "_" + month + "_" + day + "_" + hour + "_" + min + "_" + sec + ".png"   //获取到当前时间，存储为文件名。
            require('fs').writeFileSync(filename, imagedata, 'base64');   //写入到截屏
            return new Promise((resovle, reject) => {
                resovle();

            }).then(done);
        })
    });

    describe('#elemenet control', function () {
        // https://autowebtest.github.io/add-remove/   增加4个item，应该看到有4个值
        it('添加4个元素, 长度应该为4', function (done) {
            arr.forEach((item) => {
                driver.findElement(By.id('text')).sendKeys(item);
                driver.findElement(By.id('text')).submit();
            })
            driver.executeScript('document.querySelector(".clear-all").scrollIntoView()');
            driver.findElements(By.className('new-item')).then(eles => {
                return new Promise(function (resovle, reject) {
                    assert(4, eles.length);
                    resovle();
                }).then(done);
            });
        });

        //删除所有元素
        it('删除元素', function (done) {
            driver.findElement(By.css('.clear-all')).click();
            driver.switchTo().alert().accept().then(() => {
                return new Promise(function (resovle, reject) {
                    resovle();
                }).then(done);
            });
        });
        
    });

});