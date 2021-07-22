from flask import Flask, render_template, url_for, request, redirect, session
import json, notify

def test_method():
    print( "hello" ) 

shop_data = {}

with open( "shop_data.json", mode="r", encoding="utf-8" ) as f:
    shop_data = json.load( f )

app = Flask( __name__ )

def check_buy_content():
    item_list = []
    total_point = request.form["total-point"]
    for data_key in shop_data.keys():
        try:
            if not request.form[data_key] == None:
                item_list.append([request.form[data_key], request.form["{}_amount".format( data_key )]] )
                print( request.form[data_key] + ":" +  request.form["{}_amount".format( data_key )] )
            else:
                print( "next" )
        except:
            print( "{} is passed".format( data_key ) )
    notify.send_line_notify( format_text( item_list, total_point ) )


def format_text( item_list, total_point ):
    formatted_text = "*** 内容 ***"
    for data in item_list:
        formatted_text += "\n{} : {}".format( data[0], data[1] )
    formatted_text += "\n\n{}pt".format( total_point )
    return formatted_text
## ## ## ## #### ## ## ## ##
## ## ## ## Main ## ## ## ##
## ## ## ## #### ## ## ## ##

@app.route( "/", methods=["POST", "GET"] )
def index():
    if request.method == "POST":
        check_buy_content()
    return render_template( "index.html", shop_data=shop_data )

if __name__ == "__main__":
    app.run( debug=True )