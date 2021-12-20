const puppeteer=require('puppeteer')
const loginLink='https://www.hackerrank.com/auth/login'
const email='cejifo4846@shirulo.com'
const password='123456'

let browerOpen=puppeteer.launch({
    // To see browser opening
    headless:false,
    // to opening in full mode
   args:["--start-maximized"],
   defaultViewport:null
})

let page
browerOpen.then(function(browerObj){
   //opening new page
    let browerOpenPromise=browerObj.newPage()
    return browerOpenPromise
}).then(function(newTab){
   page=newTab
   //opening hackerRank Login Page in new Tab
   let hackerRankOpenPromise=newTab.goto(loginLink)
   return hackerRankOpenPromise
}).then(function(){
    //Email-id
    let emailIsentered=page.type("input[id='input-1']",email)
    return emailIsentered
}).then(function(){
    //Password
    let PassIsentered=page.type("input[id='input-2']",password)
    return PassIsentered
}).then(function(){

    let loginButtonClicked=page.click('button[data-analytics="LoginPassword"]')
    return loginButtonClicked
}).then(function(){
    let clickAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickAlgoPromise
}).then(function(){
    let getToWarm=waitAndClick('input[value="warmup"]',page)
    return getToWarm
}).then(function(){
    // $$ is shortcut and used for document.query selector all functions
    let allChallengePromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled')
    return allChallengePromise
}).then(function(arr){
   console.log(arr.length);
let questionsWillbeSolved=questionsSolver(page,arr[0],'Helloooo');
return questionsWillbeSolved;
})
//ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled
//  
// .challenge-submit-btn
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        
        let waitForModelPromise=cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal=cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })

    })
}

function questionsSolver(page,question,answer){
  return new Promise(function(resolve,reject){
       let questionsWillbeClicked=question.click();
       questionsWillbeClicked.then(function(){
           let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page)
           return EditorInFocusPromise;
       }).then(function(){
           return waitAndClick('.checkbox-input',page)
       }).then(function(){
           return page.waitForSelector('textarea.custominput',page)
       }).then(function(){
        return page.type('textarea.custominput',answer)
    }).then(function(){
        let ctrlPressed=page.keyboard.down('Control')
        return ctrlPressed
    }).then(function(){
        let A=page.keyboard.press('A')
        return A
    }).then(function(){
        let X=page.keyboard.press('X')
        return X
    }).then(function(){
        let ctrlUNPressed=page.keyboard.up('Control')
        return ctrlUNPressed
    }).then(function(){
        let mainEditorFocus=waitAndClick('.monaco-editor.no-user-select.vs',page)
        return mainEditorFocus
    }).then(function(){
        let ctrlPressed=page.keyboard.down('Control')
        return ctrlPressed
    }).then(function(){
        let A=page.keyboard.press('A')
        return A
    }).then(function(){
        let V=page.keyboard.press('V')
        return V
    }).then(function(){
        let ctrlUNPressed=page.keyboard.up('Control')
        return ctrlUNPressed
    }).then(function(){
        
        return page.click('.hr-monaco-submit')
    }).then(function(){
        resolve()
    }).catch(function(err){
        reject()
    })
})

}