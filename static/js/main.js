{
    history.pushState(null, null, location.href);
    window.addEventListener('popstate', (e) => {
    history.go(1);
    });
    $( function() {
        function add_cart( element ) {
            let eng_name = element.children( ".eng_name" ).text();  
            let name = element.children( ".name" ).text();
            let amount = element.children( ".amount" ).text();
            let point = element.children( ".point" ).text()
            let amount_now = element.children( ".amount-menu" ).children( ".current-amount" ).val();
            // カートに既に存在するかどうか
            if ( check_cart( name ) ) {
                $( ".aggregate" ).before( '<div class="items"><img src="static/image/' + eng_name + '.webp"><div class="item-name" name="item-name">' + name + '</div><input type="text" name="' + eng_name + '" class="none" value=' + name + '><div class="item-amount" name="item-amount">' + amount.replace( "x", "" ) +  '</div><input type="text" name="' + eng_name + '_amount' + '" class="input-item-amount none" value=' + amount.replace( "x", "" ) + '><div class="item-point" name="item-point">' + point.replace( "p", "" ) + '</div></div>' )
            } else {
                $( ".items" ).each( function() {
                    if ( $( this ).children( ".item-name" ).text() == name ) {
                        let current_amount = $( this ).children( ".item-amount" ).text();
                        let current_point = $( this ).children( ".item-point" ).text();
                    
                        $( this ).children( ".item-amount" ).text( parseInt( current_amount ) + parseInt( amount.replace( 'x', '' ) ) );
                        $( this ).children( ".item-point" ).text( parseInt( current_point ) + parseInt( point ) );

                        $( this ).children( ".input-item-name" ).val( name );
                        $( this ).children( ".input-item-amount" ).val( parseInt( current_amount ) + parseInt( amount.replace( 'x', '' ) ) );
                    }
                } );
            } 
            aggregate();
        }

        function remove_cart( element ) {
            let eng_name = element.children( ".eng_name" ).text();  
            let name = element.children( ".name" ).text();
            let amount = element.children( ".amount" ).text();
            let point = element.children( ".point" ).text()
            // カートに既に存在するかどうか
            if ( !check_cart( name ) ) {
                $( ".items" ).each( function() {
                    if ( $( this ).children( ".item-name" ).text() == name ) {
                        let current_amount = $( this ).children( ".item-amount" ).text();
                        let current_point = $( this ).children( ".item-point" ).text();
                        $( this ).children( ".item-amount" ).text( parseInt( current_amount ) - parseInt( amount.replace( "x", "" ) ) );
                        $( this ).children( ".item-point" ).text( parseInt( current_point ) - parseInt( point ) );

                        $( this ).children( ".input-item-name" ).val( name );
                        $( this ).children( ".input-item-amount" ).val( parseInt( current_amount ) - parseInt( amount.replace( 'x', '' ) ) );

                        if ( element.children( ".amount-menu" ).children( ".current-amount" ).val() == 0 ) {
                            console.log( element.children( ".amount-menu" ).children( ".current-amount" ).val() );
                            $( this ).remove();
                        }
                    }
                } );
            }
            aggregate();
        }
        // 既に商品がカートに追加されているか調べる
        function check_cart( item_name ) {
            let ret = true;
            $( ".items" ).each( function() {
                if ( $( this ).children( ".item-name" ).html() == item_name ) {
                    ret = false;
                }
            } );
            return ret;
        }

        function aggregate() {
            let total_point = 0;
            $( ".items" ).each( function() {
                total_point += parseInt( $( this ).children( ".item-point" ).text() );
            } );
            $( ".aggregate" ).children( ".item-point-top" ).text( total_point );
            $( ".aggre" ).val( total_point );
        }

        $( ".head-nav > li" ).on( "mouseover", function() {
            $( this ).stop( true ).animate( {
                "opacity" : 0.8,
            }
            ,250 );
            $( this ).stop( true ).animate( {
                "font-size" : "36px"
            },250 );
        } );

        $( ".head-nav > li" ).on( "mouseout", function() {
            $( this ).stop( true ).animate( {
                "opacity" : 1,
            }
            ,250 );
            $( this ).stop( true ).animate( {
                "font-size" : "28px"
            },250 );
        } );
        // *************************
        // ********** TAB **********
        // *************************
        $( ".buy-tab" ).on( "click", function() {
            $( ".buy-menu" ).css( {
                "visibility" : "visible"
            });
            $( ".sell-menu" ).css( {
                "visibility" : "hidden"
            });
            $( ".trade-menu" ).css( {
                "visibility" : "hidden"
            });
        } );

        $( ".sell-tab" ).on( "click", function() {
            $( ".buy-menu" ).css( {
                "visibility" : "hidden"
            } );
            $( ".sell-menu" ).css( {
                "visibility" : "visible"
            } );
            $( ".trade-menu" ).css( {
                "visibility" : "hidden"
            } )
        } )

        $( ".trade-tab" ).on( "click", function() {
            $( ".buy-menu" ).css( {
                "visibility" : "hidden"
            } );
            $( ".sell-menu" ).css( {
                "visibility" : "hidden"
            } );
            $( ".trade-menu" ).css( {
                "visibility" : "visible"
            } );
        } );

        $( ".content" ).on( "mouseover", function() {
            console.log( "over" );
            $( this ).stop( true ).animate( {
                "background-size" : "160px",
            }, 150 );
        } );

        $( ".content" ).on( "mouseout", function() {
            $( this ).stop( true ).animate( {
                "background-size" : "120px",  
            }, 150 );
        } );

        // amount plus and minus function
        $( ".minus" ).on( "click", function() {
            let current_amount = $( this ).parent().children( "input" ).val();
            if ( current_amount - 1 >= 0 ) {
                $( this ).parent().children( "input" ).val( current_amount - 1 );
                remove_cart( $( this ).parent().parent() );
            }
        } );

        $( ".plus" ).on( "click", function() {
            let current_amount = $( this ).parent().children( "input" ).val();
            let stock = $( this ).parent().parent().children( ".stock" ).text().replace( "在庫 : ", "" );
            let amount = $( this ).parent().parent().children( ".amount" ).text().replace( "x", "" )
            console.log( amount )
            if ( parseInt( current_amount ) + 1 <= parseInt( stock ) / parseInt( amount ) ) {
                $( this ).parent().children( "input" ).val( parseInt( current_amount ) + 1 );
                add_cart( $( this ).parent().parent() )
            }   
        } );

        $( ".submit" ).on( "mouseover", function() {
            $( this ).stop( true ).animate( {
                "color" : "green",
            }, 250 );
        } );

        $( ".submit" ).on( "mouseout", function() {
            $( this ).stop( true ).animate( {
                "color" : "rgb(135, 206, 235)",
            }, 250 );
        } );

        $( ".submit" ).on( "click", function() {
            $( ".items-top" ).animate( {
                "background-color" : "skyblue"
            }, 100,
            "swing",
            function() {
                $( ".items-top" ).animate( {
                    "background-color" : "rgb(19, 228, 120)"
                }, 100 );
            } );
        } );
        
        $( ".resource" ).on( "click", function() {
            $( ".content" ).each( function() {
                if ( $( this ).attr( "id" ) == "food" || $( this ).attr( "id" ) == "tool" || $( this ).attr( "id" ) == "equip" ){
                    $( this ).addClass( "none" );
                } else {
                    $( this ).removeClass( "none" );
                }
            } );
        } );

        $( ".food" ).on( "click", function() {
            $( ".content" ).each( function() {
                if ( $( this ).attr( "id" ) == "resource" || $( this ).attr( "id" ) == "tool" || $( this ).attr( "id" ) == "equip" ){
                    $( this ).addClass( "none" );
                } else {
                    $( this ).removeClass( "none" );
                }
            } );
        } );

        $( ".equip" ).on( "click", function() {
            $( ".content" ).each( function() {
                if ( $( this ).attr( "id" ) == "resource" || $( this ).attr( "id" ) == "tool" || $( this ).attr( "id" ) == "food" ){
                    $( this ).addClass( "none" );
                } else {
                    $( this ).removeClass( "none" );
                }
            } );
        } );

        $( ".tool" ).on( "click", function() {
            $( ".content" ).each( function() {
                if ( $( this ).attr( "id" ) == "resource" || $( this ).attr( "id" ) == "equip" || $( this ).attr( "id" ) == "food" ){
                    $( this ).addClass( "none" );
                } else {
                    $( this ).removeClass( "none" );
                }
            } );
        } );
    } );
}