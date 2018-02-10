var templateService = (function() {


    var emptyResult = function() {
        return `<i id="emptyResult" class="fab fa-searchengin fa-9x"></i>`;
    }

    var productList = function() {
        return `
            <li id="l%ListId%">
                <div class="searchResult">
                    <div class="avatar">
                        <img src="https://picsum.photos/g/100/?random" alt="">
                    </div>
                    <div class="info">
                        <span class="product-title">%ProductName%</span>
                        <div class="product-detail"> %Description% </div>
                        <div class="product-price"><span>Fiyatı: %ProductPrice%</span>
                        </div>
                        <div class="add-product" >
                        <input min="0" id="q%InputId%" class="quantity" value="%Value%" placeholder="0"  type="number"  />    <button id="%ButtonId%" class="add_to_basket button">%ButonText%</button></div>
                    </div>
                </div>
            </li>`;



    }
    var productList2 = function() {
        return `
            <li id="bl%ListId%">
                <div class="searchResult">
                    <div class="avatar">
                        <img src="https://picsum.photos/g/100/?random" alt="">
                    </div>
                    <div class="info">
                        <span class="product-title">%ProductName%</span>
                        <div class="product-detail"> %Description% </div>
                        <div class="product-price"><span>Fiyatı: %ProductPrice%</span>
                        </div>
                        <div class="add-product" >
                        <input min="0" id="inp%InputId%" class="quantity" value="%Value%" placeholder="0"  type="number"  />    <button id="b%ButtonId%" class="add_to_basket button">%ButonText%</button><i id="del%DeleteId%" class="far fa-trash-alt delete_basket_item"></i></div>
                    </div>
                </div>
            </li>`;



    }

    var searchResultText = function() {
        return `<h2> <span>%SearchResultText% </span>araması ile ilgil <span style="color:#AEBD38">%ResultCount%</span> sonuç bulundu</h2>`;
    }


    return {
        productList: productList,
        productList2: productList2,
        searchResultText: searchResultText,
        emptyResult: emptyResult

    }



})()