var templateService = (function() {



    var basketMenu = function() {
        return `        
                <div id="basket" class="c-basket__container">
                    <div class="c-basket__container--close">
                        <i class="fas fa-times fa-2x"></i>
                    </div>
                    <ul id="basketItem"></ul>
                <div>`;
    }

    var productList = function() {
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
                    <div class="add-product">
                        <i class="fas  fa-minus"></i>
                        <div data-quantity="0"></div><i class="fas fa-plus"></i><button id="%ButtonId%" class="add_to_basket button">EKLE</button></div>
                </div>
            </div>
        </li>`;
    }

    var searchResultText = function() {
        return `<h2> <span>%SearchResultText% </span>Araması ile ilgil Sonuçlar</h2>`;
    }


    return {
        basketMenu: basketMenu,
        productList: productList,
        searchResultText: searchResultText

    }



})()