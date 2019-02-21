const Browser = require('zombie');
const assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', ()=>{
    setup(()=>{
        browser = new Browser();
    });
    test(`requesting a group rate quote from the hood river tour page should populated the referrer field`, 
      done =>{
      let referrer = 'http://localhost:3000/tours/hood-river';
      browser.visit(referrer, ()=>{
          browser.clickLink('.requestGroupRate', ()=>{
              assert(browser.field('referrer').value === referrer); // bool
              done();
          });
        });
      });
     
      test(`requesting a group rate quote from the hood river tour page should populated the referrer field`, 
      done =>{
      let referrer = 'http://localhost:3000/tours/oregon-coast';
      browser.visit(referrer, ()=>{
          browser.clickLink('.requestGroupRate', ()=>{
              assert(browser.field('referrer').value === referrer); // bool
              done();
          });
        });
      });
      
     test(`visiting the "request group rate" page directly should result an empty referrer field`,
       done=>{
        browser.visit('http://localhost:3000/tours/request/request-group-rate',()=>{
            assert(browser.field('referrer').value === "");
            done();
        })
     }) 
})