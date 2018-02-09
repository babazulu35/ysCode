var templateService = (function() {




    var productList = function(type) {
        return `
            <li>
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

    var searchResultText = function() {
        return `<h2> <span>%SearchResultText% </span>Araması ile ilgil Sonuçlar</h2>`;
    }


    return {
        productList: productList,
        searchResultText: searchResultText

    }



})()