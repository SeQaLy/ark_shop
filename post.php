<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SeQaLy's Shop</title>
    <link rel="stylesheet" href="static/css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js" integrity="sha256-0YPKAwZP7Mp3ALMRVB2i8GXeEndvCq3eSl/WsAl1Ryk=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script type="text/javascript" src="https://www.jeasyui.com/easyui/jquery.easyui.min.js"></script>
    <style>
        #cart-menu {
            width : 300px;
            height : 350px;
            max-width : 600px;
            max-height : 700px;
            min-width : 300px;
            min-height : 350px;
            z-index : 10;
            position : absolute;
            top : 400px;
            left : 200px;
            background : rgba(97, 97, 93, 0.883);
        }
        #title {
            width : 100%;
            height : 50px;
            line-height : 50px;
            background : black;
            color : white;
            font-size : 25px;
            font-weight : bold;
            text-align : center;
        }
    </style>
    </head>
<body>
    <div class="header">
        <p>SeQaLy's ARK Shop</p>
    </div>
    <!-- cart -->
    <form action="/post" method="post">
        <div id="cart-menu" class="easyui-draggable easyui-resizable" data-options="handle:'#title'" >
            <div id="title">
                カート
                <input type="submit" value="購入" class="submit">
            </div>
            <div class="text">
                <div class="items-top">
                    <div class="item-name-top">名前</div>
                    <div class="item-amount-top">数量</div>
                    <div class="item-point-top">ポイント</div>
                </div>
                <div class="aggregate items-top">
                    <div class="item-point-top aggre" ></div>
                    <input type="text" name="total-point" class="none aggre">
                </div>
            </div>
        </div>
    </form>
    <!-- cart end -->
    <div class="head-nav">
        <li class="buy-tab">Buy</li>
        <li class="sell-tab">Sell</li>
        <li class="trade-tab">Trade</li>
    </div>
    <!-- ### menu ### -->
    <div class="menus">
        <div class="buy-menu menu">
            <div class="buy-title">
                ***Buy***
            </div>
            <div class="main-container">
                {% for data_key in shop_data.keys() %}
                <div class="content" 
                    style="background : url('static/image/{{data_key}}.webp');
                        background-size : 120px;
                        background-repeat : no-repeat;
                        background-position : center;
                        background-color : rgb(170, 170, 170);
                        margin : 41px;">
                    <div class="eng_name" style="display : none;">{{ data_key }}</div>
                    <div class="name">{{ shop_data[data_key]["name"] }}</div>
                    <div class="amount">x{{ shop_data[data_key]["amount"] }}</div>
                    <div class="point">{{ shop_data[data_key]["point"] }}p</div>
                    <div class="amount-menu">
                        <div class="minus">-</div>
                        <div class="plus">+</div>
                        <input type="number" class="current-amount" value="0">
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
    
        <div class="sell-menu menu">
            <div class="main-container">
                <!-- sell -->
            </div>
        </div>
    
        <div class="trade-menu menu">
            <div class="main-container">
                <!-- trade -->
            </div>
        </div>
    </div>

    
    <script src="static/js/main.js"></script>
</body>
</html>