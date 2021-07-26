import sqlite3
import json

# stock_type 
# new -- delete old stock
# add -- to add to current stock 
# minu -- minus from current stock
def update_stock( name, stock, stock_type ):
    current_stock = 0
    if stock_type == "add":
        for datas in get_stock_data():
            # find true value
            if datas[2] == name:
                print( datas )
                current_stock = datas[3]
        new_stock = current_stock + stock
        print( current_stock )
        sql = "update item_stock set stock = ? where name = ?"
        cur.execute( sql, ( new_stock, name ) )
        conn.commit()
    elif stock_type == "new":
        try:
            sql = "update item_stock set stock = ? where name = ?"
            cur.execute( sql, ( stock, name ) )
            conn.commit()
        except:
            pass
    elif stock_type == "minus":
        current_stock = 0
        for datas in get_stock_data():
            # find true value
            if datas[2] == name:
                print( datas, end="::::" )
                current_stock = datas[3]
        print( "current : {} , stock : {}".format( current_stock, stock ) )
        if current_stock - stock >= 0:
            new_stock = current_stock - stock
        else:
            new_stock = current_stock
            print( "invalid value after minus ::: smaller than 0 or type is not integer" )
        print( current_stock )
        sql = "update item_stock set stock = ? where name = ?"
        cur.execute( sql, ( new_stock, name ) )
        conn.commit()
    else:
        print( "invalid param please check param! valid param is 'add','minus','new'" )
        
        

def drop_table():
    sql = "delete from item_stock"
    cur.execute( sql )
    conn.commit()
    conn.close

def get_stock_data():
    data_list = []
    sql = "select * from item_stock"
    cur.execute( sql )
    for data in cur.fetchall():
        data_list.append( data )
    return data_list

def convert_dict( stock_datas ):
    stock_dict = {}
    for stock_data in stock_datas:
        stock_dict[stock_data[1]] = {
            "name" : stock_data[2],
            "stock" : stock_data[3]
        }
    return stock_dict

# 新規アイテムが追加された際に実行
def item_list_update():
    index = 0
    old = get_stock_data()
    drop_table()
    print( old, end="<- drop table\n" )

    with open( "shop_data.json", mode="r", encoding="utf-8" ) as f:
        shop_data = json.load( f )
    for key in shop_data.keys():
        try :
            sql = "insert into item_stock( eng_name, name, stock ) values( ?, ?, ? )"
            cur.execute( sql, ( key, shop_data[key]["name"], old[index][3] ) )
            conn.commit()
            index += 1
        except:
            print( "except detect {}".format( key ) )
            sql = "insert into item_stock( eng_name, name, stock ) values( ?, ?, 0 )"
            cur.execute( sql, ( key, shop_data[key]["name"]  ) )
            conn.commit()
            index += 1

dbname = "stock.db"
conn = sqlite3.connect( dbname, check_same_thread=False )
cur = conn.cursor()
# update
# cur.execute( "create table item_stock( id integer primary key autoincrement, eng_name string unique, name string unique, stock integer )" )
# cur.execute( "update item_stock set stock = 10 where eng_name = 'Stone'" )
# conn.commit()

# update_stock( "キチン", 1550, "new" )