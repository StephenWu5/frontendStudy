// ==UserScript==
// @name 知乎批量删除回答
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @include https://www.zhihu.com/*
// @icon https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant none
// @require https://code.jquery.com/jquery-2.2.4.js
// ==/UserScript==

(function () {
    // Your code here…
    'use strict';
    function deleteFn() {
        const targetUrl = 'https://www.zhihu.com/people/StephenWu5/answers?page=9';
        if (window.location.href !== targetUrl) {
            window.location.href = targetUrl;
            return;
        }
        setTimeout(() => {
            let deleteItem = $('.ContentItem-actions').first().children('div:last-child').children('button')
            if (deleteItem.length === 0) {
                window.location.reload();
            }
            deleteItem.click();
            setTimeout(() => {
                $('.Popover-content').find('button.Menu-item:last-child').click();
                setTimeout(() => {
                    $('.Modal-wrapper .Button--primary').click();
                    setTimeout(() => {
                        deleteFn();
                    }, 500)
                }, 700)
            }, 700)
        }, 1500)
    }
    deleteFn();
})();


/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let newNums = [];
    for(i = 0;i < nums.length; i++){
        if(!newNums.includes(nums[i])){
            newNums.push(nums[i])
        }
    }
    return newNums;
};

console.log(removeDuplicates([1,1,2]));
