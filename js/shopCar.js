var storage = localStorage;

function doFirst() {
    //從localStorage拿出資料
    //getAllImg>>>>有多少數值
    let getAllImg = JSON.parse(storage.getItem("addItemImg"));
    //getAllImg>>>>有多少項目
    let getAllItem = JSON.parse(storage.getItem('addItemList'));
    // let items = itemString.substr(0, itemString.length - 2).split(', ');
    //計算總金額------------------------------------------------------------------------------------
    total = 0;
    for (let key in getAllImg) {
        // let itemInfo = JSON.parse(storage.getItem(itemString[key]));
        //                  itemId, itemValue
        createCarList(getAllItem[key], getAllImg[key]);
        // let itemPrice = parseInt(getAllImg[key].split("|")[2]);
        // total += itemPrice;
    }

    // 組裝動態新增-----------------------------------------------------------------------------------
    // let newMoonTotal = document.createElement('div');
    // newMoonTotal.className = "moontotal";

    function createCarList(getItemList, itemValue) {
        // console.log(itemValue, 'itemValue');
        let itemTitle = itemValue.split('|')[0];
        let itemImage = itemValue.split('|')[1];
        // console.log(itemValue, '123');
        let itemPrice = parseInt(itemValue.split('|')[2]);
        //get animals imgs
        let itemPicture = "";
        if (itemValue.split('|').length > 3) {
            itemPicture = itemValue.split('|')[3];
        }

        //要先選到最外圍綁定起來
        let newMoonTotal = document.querySelector('.moontotal');
        let newMcontent = document.createElement('div');
        newMcontent.className = "mcontent";
        newMoonTotal.appendChild(newMcontent);
        for (let index = 0; index < document.querySelectorAll('.mcontent').length; index++) {
            newMoonTotal.insertBefore(document.querySelectorAll('.mcontent')[index], newMoonTotal.children[1])
        }
        let newPimage = document.createElement('div');
        newPimage.className = "pImage";
        let newpwords = document.createElement('div');
        newpwords.className = "pwords";
        let newpwords2 = document.createElement('div');
        newpwords2.className = "pwords2";
        newMcontent.appendChild(newPimage);
        newMcontent.appendChild(newpwords);
        newMcontent.appendChild(newpwords2);
        // 建立每個div------------------
        // 商品圖片把商品放在外層div

        let itemimg = document.createElement('img');
        let itemppicture = document.createElement('div');
        //放動物動態綁定---------------------------------------
        let itemAnimals = document.createElement('img');
        let animalsDiv = document.createElement('div');
        animalsDiv.className = 'eCard';
        itemAnimals.className = 'acceptPic';
        itemppicture.className = "ppicture";
        itemppicture.appendChild(itemimg);
        newPimage.appendChild(itemppicture);
        animalsDiv.appendChild(itemAnimals);
        itemppicture.appendChild(animalsDiv);
        itemimg.setAttribute('src', `./images/moonShop/${itemImage}`);
        itemAnimals.setAttribute('src', `./images/moonShop/${itemPicture}`);
        console.log(itemAnimals, "0234");




        // console.log(itemppicture);
        //商品名稱和價格,把悠遊卡和單價放在外層
        let itempwords_inner = document.createElement('div');
        itempwords_inner.className = 'pwords_inner';

        let item_pwordsEasyCard = document.createElement('div');
        item_pwordsEasyCard.className = 'pwords_easyCard';
        item_pwordsEasyCard.textContent = itemTitle;
        let item_pwordsPrice = document.createElement('div');
        item_pwordsPrice.className = 'pwds_price';
        item_pwordsPrice.textContent = itemPrice;
        itempwords_inner.appendChild(item_pwordsEasyCard);
        itempwords_inner.appendChild(item_pwordsPrice);
        newpwords.appendChild(itempwords_inner);

        //數量加減
        let itempwords2_inner = document.createElement('div');
        itempwords2_inner.className = 'pwords2_inner';
        let itemproAmount = document.createElement('div');
        itemproAmount.className = 'proAmount';
        let itemForm = document.createElement('span');
        itemForm.className = 'proForm';
        let itemMinus = document.createElement('i');
        itemMinus.classList.add("fas", "fa-minus-square", "qty_minus");
        let itemQuant = document.createElement('input');
        itemQuant.className = 'qty';
        itemQuant.value = 1;
        let itemQuantValue = document.querySelector('.qty');
        let itemPlus = document.createElement('i');
        itemPlus.classList.add("fas", "fa-plus-square", "qty_plus");
        //數量加減組裝--------------------------------------------------------------
        itemForm.appendChild(itemMinus);
        itemForm.appendChild(itemQuant);
        itemForm.appendChild(itemPlus);
        itemproAmount.appendChild(itemForm);
        itempwords2_inner.appendChild(itemproAmount);
        newMcontent.appendChild(itempwords2_inner);


        // 小計價格--------------------------------------------------

        let itemTotalprice = document.createElement('div');
        itemTotalprice.className = 'proTotalprice';
        itempwords2_inner.appendChild(itemTotalprice);
        newpwords2.appendChild(itempwords2_inner);
        newMcontent.appendChild(newpwords2);


        //刪除按鈕------------------------------------------------

        let delitems = document.createElement("div");
        delitems.className = "m_del";
        delitems.setAttribute('dataimg', itemValue);
        delitems.setAttribute('datalist', getItemList);

        let delword = document.createElement('p');
        delword.textContent = '刪除';

        delitems.appendChild(delword);
        newMcontent.appendChild(delitems);
        // delButton.addEventListener('click', deleteItem);

        //RWD刪除按鈕

        let rwdDelitems = document.createElement('i');
        rwdDelitems.classList.add('fas', 'fa-trash-alt', 'fa-2x', 'garbageCan');
        newMcontent.appendChild(rwdDelitems);

        // function deleteItem() {

        // }

    }


    // 物件依序放進去購物車-----------------------


    // function createCarList(itemId, itemValue) {
    //     let itemTitle = itemValue.split('')[0];
    //     let itemImage = 
    // }

    numberCount();

}

function numberCount() {
    let mcontentAll = document.querySelectorAll('.mcontent');
    let numberPlus = document.querySelectorAll('.qty_plus');
    let numberInput = document.querySelectorAll('.qty');
    let numberMinus = document.querySelectorAll('.qty_minus');
    let itemPrice = document.querySelectorAll('.pwds_price');
    let itemTotal = document.querySelectorAll('.proTotalprice');
    let delitems = document.querySelectorAll('.m_del');
    let getAllImg = JSON.parse(storage.getItem("addItemImg"));
    let getAllItem = JSON.parse(storage.getItem('addItemList'));

    // 小計金額計算--------------------------------------------------------------
    // for (let i = 0; i < mcontentAll.length; i++) {
    //     itemTotal[i].textContent = parseInt(numberInput[i].value) * parseInt(itemPrice[i].textContent);
    //     numberPlus[i].addEventListener('click', function (e) {

    //         numberInput[i].value++;
    //         itemTotal[i].textContent = parseInt(numberInput[i].value) * parseInt(itemPrice[i].textContent);
    //     })
    //     numberMinus[i].addEventListener('click', function (e) {

    //         if (numberInput[i].value > 1) {
    //             numberInput[i].value--;
    //         }
    //         itemTotal[i].textContent = parseInt(numberInput[i].value) * parseInt(itemPrice[i].textContent);
    //     })
    // }



    mcontentAll.forEach((element, i, array) => element.addEventListener('click', function (e) {
        // e.stopPropagation();
        total = 0;
        // console.log(e.target.className, numberPlus[i].className, '0500');
        let arrayFromList = Array.from(e.target.classList);
        console.log(arrayFromList);
        //加號連擊
        if (arrayFromList.includes('fa-plus-square')) {
            numberInput[i].value++;
        }
        //減號連擊
        if (arrayFromList.includes('fa-minus-square') && numberInput[i].value > 1) {
            numberInput[i].value--;
        }
        itemTotal[i].textContent = parseInt(numberInput[i].value) * parseInt(itemPrice[i].textContent);
        //刪除商品
        if (arrayFromList.includes('m_del')) {
            console.log(i, 'index');
            getAllImg.splice(i, 1);
            getAllItem.splice(i, 1);

            // console.log(getAllImg, "123");
            // console.log(getAllItem, "123");

            // let newDataimg = getAllImg.filter(item => item !== e.target.attributes.dataimg.value);
            // let newDataList = getAllItem.filter(item => item !== e.target.attributes.datalist.value);
            localStorage.setItem('addItemImg', JSON.stringify(getAllImg));
            localStorage.setItem('addItemList', JSON.stringify(getAllItem));
            // }
            element.remove();
        }


        accountTotal();
    }
    )
    )



    // for (let i = 0; i < getAllItem.length; i++) {
    //     delitems[i].addEventListener('click', function (e) {
    //         e.preventDefault()
    //         let li = e.target.parentElement;
    //         console.log(li);
    //         let index = Array.prototype.indexOf.call(itemList.children, li);
    //         removeLocalStorage(index);
    //         itemList.removeChild(li);


    //         function removeLocalStorage(index) {
    //             let afterAllImg = getAllImg.splice(index, 1);
    //             let afterAllItem = getAllItem.splice(index, 1);

    //         }
    // console.log(i, 'asdsad');
    // console.log(getAllImg.length, 'num');
    // let afterAllImg = getAllImg.splice(i, 1);
    // console.log(afterAllImg.length);
    // let afterAllItem = getAllItem.splice(i, 1);
    // console.log(afterAllItem.length);
    // localStorage['addItemList'] = JSON.stringify(afterAllItem);
    // localStorage['addItemImg'] = JSON.stringify(afterAllImg);
    // location.reload();
    //     })
    // }
    // localStorage['addItemList'] = JSON.stringify(afterAllItem);
    // localStorage['addItemImg'] = JSON.stringify(afterAllImg);
    // location.reload();

}

function accountTotal() {
    let total = 0;
    let mcontentAll = document.querySelectorAll(".mcontent");
    let itemTotal = document.querySelectorAll(".proTotalprice");
    let numberInput = document.querySelectorAll('.qty');
    let itemPrice = document.querySelectorAll('.pwds_price');
    for (let j = 0; j < mcontentAll.length; j++) {
        //先將textcontent 設值
        itemTotal[j].textContent = parseInt(numberInput[j].value) * parseInt(itemPrice[j].textContent);
        // 再加總小計
        total = total + parseInt(itemTotal[j].textContent);
    }

    let totalPPrice = document.getElementById('payTotal');
    totalPPrice.textContent = total;
    // let currentDom = [...e.target.classList];
    // console.log(e.target.classList, '5858585');
    // if (currentDom.some(items => items === "m_del")) {
    //     localStorage.removeItem()
    // }
}
window.addEventListener('load', function () {
    doFirst()
    accountTotal();
});