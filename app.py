import sqlite3
from flask import Flask, render_template, url_for, request, redirect, session
import json, notify, os
## my library
import stock


shop_data = {}

app = Flask( __name__ )

# stock_data = stock.convert_dict( stock.get_stock_data() )

############
def hello():
    print( "hello" )
app.jinja_env.globals["hello"] = hello
############

def check_buy_content():
    with open( "shop_data.json", mode="r", encoding="utf-8" ) as f:
            shop_data = json.load( f )
    item_list = []
    
    for data_key in shop_data.keys():
        try:
            if not request.form[data_key] == None:
                item_list.append([request.form[data_key], request.form["{}_amount".format( data_key )]] )
            else:
                print( "next" )
        except:
            print( "{} is passed".format( data_key ) )
    print( item_list )

    return item_list
    


def format_text( item_list, total_point, buyer_name ):
    formatted_text = "*** 内容 ***"
    formatted_text += "\n ##### {} #####".format( buyer_name )
    for data in item_list:
        formatted_text += "\n{} : {}".format( data[0], data[1] )
    formatted_text += "\n\n{}pt".format( total_point )
    return formatted_text
## ## ## ## #### ## ## ## ##
## ## ## ## Main ## ## ## ##
## ## ## ## #### ## ## ## ##

@app.route( "/", methods=["POST", "GET"] )
def index():
    stock_data = {}
    shop_data = {}
    stock.item_list_update()
    with open( "shop_data.json", mode="r", encoding="utf-8" ) as f:
            shop_data = json.load( f )
    stock_data = stock.convert_dict( stock.get_stock_data() )
    if request.method == "POST":
        with open( "shop_data.json", mode="r", encoding="utf-8" ) as f:
            shop_data = json.load( f )
        buy_items = check_buy_content()
        for buy_item in buy_items:
            stock_data = stock.convert_dict( stock.get_stock_data() )
            for buy_item_name in stock_data.keys():
                if stock_data[buy_item_name]["name"] == buy_item[0]:
                    if stock_data[buy_item_name]["stock"] - int( buy_item[1] ) >= 0:
                        stock.update_stock( buy_item[0], int( buy_item[1] ), "minus" )
                        total_point = request.form["total-point"]
                        buyer_name = request.form["buyer-name"]
                        notify.send_line_notify( format_text( buy_items, total_point, buyer_name ) )
                    else:
                        return render_template( "cantbuy.html" )
                        
            stock_data = stock.convert_dict( stock.get_stock_data() )
    return render_template( "index.html", shop_data=shop_data, stock_data=stock_data )

if __name__ == "__main__":
    app.run( host="127.0.0.1", port=int( os.environ.get( "PORT", 5000 ) ) ) 