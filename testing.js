// -------------------------------- declarations --------------------------------
const webdriver = require('selenium-webdriver')
const sleep = require('sleep')
const By = webdriver.By
const until = webdriver.until;
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// ---------------------------- random username ----------------------------
// generate random username for registration
function randomUser() {
    var length           = 10;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const randomUsername = randomUser()

// ---------------------------- failed function ----------------------------
// exit test function
async function stopTest(testName,error){

        // message header
        var endMsg = '!! FAILED: ' + testName + ' !!'

        // print header
        console.log(getAustrics(endMsg))
        console.log(endMsg)
        console.log(getAustrics(endMsg))

        // print error
        console.log(error.message)
        console.log()

        // end testing
        // print header
        console.log(getAustrics('test end: ERROR'))
        console.log('test end: ERROR')
        console.log(getAustrics('test end: ERROR'))
        // await driver.quit()
        process.exit()    
}

// manual stop text without error
async function manualStopTest(testName,error){

    // message header
    var endMsg = '!! FAILED: ' + testName + ' !!'

    // print header
    console.log(getAustrics(endMsg))
    console.log(endMsg)
    console.log(getAustrics(endMsg))

    // print error
    console.log(error)
    console.log()

    // end testing
    // print header
    console.log(getAustrics('test end: ERROR'))
    console.log('test end: ERROR')
    console.log(getAustrics('test end: ERROR'))
    // await driver.quit()
    process.exit()    
}

// return austrics as message length
function getAustrics(msg){

    var starLine = ''

    // create austriks to fit the text
    for( i=0; i<msg.length; i++){
        starLine += '*'
    }

    return starLine
}

// ---------------------------- print header function ----------------------------
function printHeader(index, header){
    console.log('(' + index+ ') ' + header)
}

// ---------------------------- print details function ----------------------------
function printDetail(msg){
    console.log('    > ' + msg)
}

// ---------------------------- wait after test ----------------------------
function waitAfterTest(){
    sleep.sleep(2)
}

// ---------------------------- tests functions ----------------------------
var curTest =''

// open homepage by url
async function testLoadHome(){
    try{
        // open site
        var url='https://intense-castle-88427.herokuapp.com'
        await driver.get(url);

        sleep.sleep(2)

        console.log()
        console.log('****** starting tests ******')

        curTest = 'test hompage opening'
        printHeader(1, curTest)
        printDetail('trying to load: ' + url)
    
        // check site is loaded
        await driver.wait(until.elementLocated(By.id('random-movie-a')), 5000)
        printDetail('url loaded succesfully')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// click random movie
async function testRandomMovie(){
    try{
        curTest = 'test random movie page'
        printHeader(2, curTest)

        // click random movie page
        driver.findElement(By.id('random-movie-a')).click()
            .catch((e) => {
                stopTest('curTest', e)
            })
        printDetail('click random movie')
    
        // check random page loaded
        await driver.wait(until.elementLocated(By.id('all-details')), 10000)
        printDetail('random page loaded')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// click sign out
async function testSignout(){
    try {
        
        curTest = 'test sign out if there'
        printHeader(3, curTest)

        // try to click sign out
        printDetail('trying to find signout button')
        printDetail('trying to click signout button')
        ;(await driver.findElement(By.id('signout-btn'))).click()
            // .catch((e) => {
            //     printDetail('no signout button')
            // })
        
        // check signed up loaded
        await driver.wait(until.elementLocated(By.id('back-to-home')), 5000)
        printDetail('sign out page loaded succesfully')

        // click back to home page
        printDetail('trying to click back to home button')
        ;(await driver.findElement(By.id('back-to-home'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })

        await waitAfterTest()

    } catch (e) {
        if( e.message.includes('id="signout-btn')) printDetail('no signout button')
        else stopTest(curTest, e)
    }
}

// test back to home after sign out
async function testSignoutBackHome(){
    try{

        curTest = 'test sign out back to home'
        printHeader(4, curTest)
           
        // check site is loaded
        await driver.wait(until.elementLocated(By.id('random-movie-a')), 5000)
        printDetail('hompage loaded succesfully')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test click and load login page
async function openLoginPage(){
    try {
        
        curTest = 'test login page'
        printHeader(5, curTest)

        // open login page
        printDetail('trying to click login button')
        ;(await driver.findElement(By.id('login-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })     

        // check login loaded
        await driver.wait(until.elementLocated(By.id('signup-btn')), 5000)
        printDetail('login page loaded succesfully')

        // reset password field
        printDetail('reset password field')
        var passwodInput = await driver.findElement(By.name('password'))
        passwodInput.clear()

        // reset username field
        printDetail('reset username field')
        var usernameInput = await driver.findElement(By.name('username'))
        usernameInput.clear()

        await waitAfterTest()
    } catch (e) {
        stopTest(curTest, e)
    }
}

// test open signup page
async function openSignupPage(){
    try {

        curTest = 'test open signup page'
        printHeader(6, curTest)

        // click signup button
        printDetail('trying to click signup button')
        ;(await driver.findElement(By.id('signup-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })

        
        // check signup loaded
        await driver.wait(until.elementLocated(By.id('login-reg-btn')), 5000)
        printDetail('signup page loaded succesfully')

        await waitAfterTest()
    } catch (e) {
        stopTest(curTest, e)
    }
}

// test signup new user - legal input
async function testRegisterLegalUser(){
    try {
        
        curTest = 'test signup new user'
        printHeader(7, curTest)

        // reset password field
        printDetail('reset password field')
        var passwodInput = await driver.findElement(By.name('password'))
        passwodInput.clear()

        // reset username field
        printDetail('reset username field')
        var usernameInput = await driver.findElement(By.name('username'))
        usernameInput.clear()

        // enter fields
        printDetail('entering input')
        await driver.findElement(By.name('firstName')).sendKeys('Avital')
        await driver.findElement(By.name('lastName')).sendKeys('testttta')
        await driver.findElement(By.name('username')).sendKeys(randomUsername)
        await driver.findElement(By.name('password')).sendKeys('123456')

        // click submit button
        printDetail('trying to click submit button')
        ;(await driver.findElement(By.className('blue-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })
            
        // check homepage with new username loaded
        await driver.wait(until.elementLocated(By.id('username-text')), 5000)
        printDetail('user registered succesfully')
        
        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test add one favorite
async function testAddOneFavorite(){
    try {
        
        curTest = 'test add to favorite'
        printHeader(8, curTest)

        // click add to favorite button
        printDetail('try click favorite icon of first movie')
        ;(await driver.findElement(By.className('favorite-icon'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })
        

        // check favorite marked exists
        await driver.wait(until.elementLocated(By.className('isFavorite')), 5000)
        printDetail('favorite added succesfully')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test open favorites page
async function openFavoritesPage(){
    try {
        curTest = 'test open favorite page'
        printHeader(9, curTest)

        // click favorite pages
        printDetail('try click favorite page button')
        ;(await driver.findElement(By.id('favorites'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })

        // check my favorites open
        await driver.wait(until.elementLocated(By.className('favorite-div')), 5000)
        printDetail('favorite page loaded')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test remove movie from favorites
async function testRemoveFavorite(){
    try {
        
        curTest = 'test remove favorite'
        printHeader(10, curTest)

        // click remove favorite icon
        printDetail('try click remove favorite')
        ;(await driver.findElement(By.className('favorite-icon'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })

        // check no movies in favorites
        await driver.wait(until.elementLocated(By.id('no-movies')), 5000)
        printDetail('movie removed from favorites')

        await waitAfterTest()
    } catch (e) {
        stopTest(curTest, e)
    }
}

// test back to homepage from favorites
async function testHomeFromFavorites(){
    try {
        
        curTest = 'test back to home from favorites'
        printHeader(11, curTest)

        // click home button
        printDetail('try click home button')
        ;(await driver.findElement(By.id('home'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })

        // check homepage loaded
        await driver.wait(until.elementLocated(By.id('all-movies')), 5000)
        printDetail('back to homepage successfully')

        await waitAfterTest()
    } catch (e) {
        stopTest(curTest, e)
    }
}

// test login user
async function testLoginUser(){
    try {
            
        curTest = 'test login form'
        printHeader(15, curTest)

        // enter fields
        printDetail('entering input')
        await driver.findElement(By.name('username')).sendKeys(randomUsername)
        await driver.findElement(By.name('password')).sendKeys('123456')

        // click login button
        printDetail('trying to click login button')
        ;(await driver.findElement(By.className('blue-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })
            
        // check homepage with new username loaded
        await driver.wait(until.elementLocated(By.id('username-text')), 5000)
        printDetail('user logged back in succesfully')
        
        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test registration validations - username empty
async function testSignupUsername(){
    try {
            
        curTest = 'test registration validations - username empty'
        printHeader(16, curTest)

        // click signup button
        printDetail('trying to click signup button')
        ;(await driver.findElement(By.className('blue-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })
            
        // check if error loaded
        var errorMsg = await driver.findElements(By.id('usernameErr'))
        if( errorMsg.length != 0) printDetail('got username error - success')
        else if( errorMsg.length == 1 ) manualStopTest('no username error - fail')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test registration validations - username valid
async function testSignupUsernameValid(){
    try {
            
        curTest = 'test registration validations - username valid'
        printHeader(17, curTest)

        // reset password field
        printDetail('reset password field')
        var passwodInput = await driver.findElement(By.name('password'))
        passwodInput.clear()

        // reset username field
        printDetail('reset username field')
        var usernameInput = await driver.findElement(By.name('username'))
        usernameInput.clear()
        
        // enter username
        var randomUser1 = await randomUser()
        printDetail('entering username: ' + randomUser1)
        await usernameInput.sendKeys(randomUser1)
        sleep.sleep(1)

        // click signup button
        printDetail('trying to click signup button')
        ;(await driver.findElement(By.className('blue-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })
        sleep.sleep(2)
        
        // check username error missing
        var errorMsg = await driver.findElements(By.id('usernameErr'))
        if( errorMsg.length == 0 ) printDetail('no username error - success')
        else if( errorMsg.length == 1 ) manualStopTest(curTest, 'got username error - fail')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// test registration validations - passowrd invalid
async function testSignupPasswordInvalid(){
    try {
            
        curTest = 'test registration validations - passowrd invalid'
        printHeader(18, curTest)

        // reset password field
        printDetail('reset password field')
        var passwodInput = await driver.findElement(By.name('password'))
        passwodInput.clear()

        // enter password
        printDetail('entering password: 123456 ')
        var passwodInput = await driver.findElement(By.name('password'))
        await passwodInput.sendKeys('123456789')
        sleep.sleep(1)

        // click signup button
        printDetail('trying to click signup button')
        ;(await driver.findElement(By.className('blue-btn'))).click()
            .catch((e) => {
                stopTest(curTest, e)
            })
        sleep.sleep(1)
        
        // check username error missing
        var errorMsg = await driver.findElements(By.id('passwordErr'))
        if( errorMsg.length != 0) printDetail('got password error - success')
        else if( errorMsg.length == 1 ) manualStopTest('no password error - fail')

        await waitAfterTest()

    } catch (e) {
        stopTest(curTest, e)
    }
}

// ---------------------------- run functions ----------------------------
async function startTesting(){

    await driver.manage().window().maximize() 

    // ----------------- 1 - test hompage opening -----------------
    await testLoadHome()

    // ----------------- 2 - test random movie page -----------------
    await testRandomMovie()

    // ----------------- 3 - test sign out if there -----------------
    await testSignout()

    // ----------------- 4 - test sign out back to home -----------------
    await testSignoutBackHome()
    
    // ----------------- 5 - test login page -----------------
    await openLoginPage()

    // ----------------- 6 - test open signup page -----------------
    await openSignupPage()

    // ----------------- 7 - test signup new user -----------------
    await testRegisterLegalUser()

    // ----------------- 8 - test add to favorite -----------------
    await testAddOneFavorite()

    // ----------------- 9 - test open favorite page -----------------
    await openFavoritesPage()

    // ----------------- 10 - test remove favorite -----------------
    await testRemoveFavorite()

    // ----------------- 11 - test back to home from favorites -----------------
    await testHomeFromFavorites()

    // ----------------- 12 - test sign out -----------------
    await testSignout()

    // ----------------- 13 - test sign out back to home -----------------
    await testSignoutBackHome()

    // ----------------- 14 - test login page -----------------
    await openLoginPage()

    // ----------------- 15 - test login form -----------------
    try {
        await testLoginUser()
    } catch(e){
        if(e.message.includes('TypeError: testLoginUser(...) is not a function')){}
    }

    // ----------------- 16 - 18 - test registration validations  -----------------
    await testSignout()
    await testSignoutBackHome()
    await openLoginPage()
    await openSignupPage()
    try {

        await testSignupUsername()
        await testSignupUsernameValid()
        await testSignupPasswordInvalid()

    } catch(e){
        if(e.message.includes('TypeError: testSignupUsername(...) is not')){}
        else {
            stopTest(curTest, e)
        }
    }

    try {
        console.log()
        console.log('****** test end ******')
        (await driver).quit()
    } catch(e){
        if(e.message.includes('TypeError: console.log(...)')){}
    }
    
}


startTesting()
