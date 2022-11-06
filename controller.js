// Add all your JS code here
$().ready(function(){
    $("#username").keyup(function(){
        var username = $(this).val();
        if (username.length == 0 || (username.length > 5 && username.match(/^[a-zA-z0-9_]+$/))){
            document.getElementById("username_notification").innerHTML = " ";
            $(this).css("background-color", "white");
        }else{
            document.getElementById("username_notification").innerHTML = "Username is invalid";
            $(this).css("background-color", "red");
        }
    });

    $("#password1").keyup(function(){
        var password = $(this).val();
        if (password.length == 0 || (password.length > 7 && password.match(/^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/))){
            document.getElementById("password1_notification").innerHTML = " ";
            $(this).css("background-color", "white");
        } else{
            document.getElementById("password1_notification").innerHTML = "Password is invalid";
            $(this).css("background-color", "red");
        }
    });

    $("#password2").keyup(function(){
        var repeat_password = $(this).val();
        var password = $("#password1").val();
        if (repeat_password.length == 0 || (password.length != 0 && repeat_password == password)){
            document.getElementById("password2_notification").innerHTML = " ";
            $(this).css("background-color", "white");
        } else {
            document.getElementById("password2_notification").innerHTML = "Passwords don't match";
            $(this).css("background-color", "red");
        }
    });

    $("#email").keyup(function(){
        var email = $(this).val();
        if (email.length == 0 || email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            document.getElementById("email_notification").innerHTML = " ";
            $(this).css("background-color", "white");
        } else {
            document.getElementById("email_notification").innerHTML = "Email is invalid"
            $(this).css("background-color", "red");
        }
    });

    $("#phone").keyup(function(){
        var phone = $(this).val();
        if (phone.length == 0 || phone.match(/^\d{3}-\d{3}-\d{4}$/)){
            document.getElementById("phone_notification").innerHTML = " ";
            $(this).css("background-color", "white");
        } else {
            document.getElementById("phone_notification").innerHTML = "Phone is invalid";
            $(this).css("background-color", "red");
        }
    });

    $("#register").click(function(){
        var username = $("#username").val();
        if (username.length > 5 && username.match(/^[a-zA-z0-9_]+$/)){
            document.getElementById("username_notification").innerHTML = " ";
            $("#username").css("background-color", "white");
        }else{
            document.getElementById("username_notification").innerHTML = "Username is invalid";
            $("#username").css("background-color", "red");
        }
        var password = $("#password1").val();
        if (password.length > 7 && password.match(/^(?=.*[\d])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)){
            document.getElementById("password1_notification").innerHTML = " ";
            $("#password1").css("background-color", "white");
        } else{
            document.getElementById("password1_notification").innerHTML = "Password is invalid";
            $("#password1").css("background-color", "red");
        }
        var repeat_password = $("#password2").val();
        if (repeat_password == password){
            document.getElementById("password2_notification").innerHTML = " ";
            $("#password2").css("background-color", "white");
        } else {
            document.getElementById("password2_notification").innerHTML = "Passwords don't match";
            $("#password2").css("background-color", "red");
        }
        var email = $("#email").val();
        if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            document.getElementById("email_notification").innerHTML = " ";
            $("#email").css("background-color", "white");
        } else {
            document.getElementById("email_notification").innerHTML = "Email is invalid"
            $("#email").css("background-color", "red");
        }
        var phone = $("#phone").val();
        if (phone.match(/^\d{3}-\d{3}-\d{4}$/)){
            document.getElementById("phone_notification").innerHTML = " ";
            $("#phone").css("background-color", "white");
        } else {
            document.getElementById("phone_notification").innerHTML = "Phone is invalid";
            $("#phone").css("background-color", "red");
        }

        if (document.getElementById("username_notification").innerHTML == " " && 
            document.getElementById("password1_notification").innerHTML == " " &&
            document.getElementById("password2_notification").innerHTML == " " &&
            document.getElementById("email_notification").innerHTML == " " && 
            document.getElementById("phone_notification").innerHTML == " "){
                $("#notification").html(" ");
                $.ajax({
                    url: "http://www.hanxianxuhuang.ca/a2/register",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        username: $("#username").val(),
                        password1: $("#password1").val(),
                        password2: $("#password2").val(),
                        email: $("#email").val(),
                        phone: $("#phone").val()
                    }),
                    statusCode: {
                        404: function(){
                            $("#notification").html("Unknown error occurred");
                        },
                        409: function(){
                            $("#notification").html("Username has already been taken");
                        },
                        200: function(){
                            $("#notification").html("User added");
                        }
                    }
                });
            } else {
                $("#notification").html("At least one field is invalid. Please correct it before proceeding");
            }
    });

    $("#add_update_item").click(function(){
        var name = $("#name").val();
        var price = $("#price").val();
        var quantity = $("#quantity").val();
        var table = document.getElementById("cart-items");
        let item = new Item(name, price, quantity);
        
        function check_exist(item){
            for (i = 1; i < $("#cart-items tr").length; i++){
                if (table.rows[i].cells[0].innerHTML == item.name){
                    table.rows[i].cells[1].innerHTML = item.price;
                    table.rows[i].cells[2].innerHTML = item.quantity;
                    table.rows[i].cells[3].innerHTML = item.total.toFixed(2);
                    return true;
                }
            }
            return false;
        }
        if (check_exist(item) == false && (name != "" && price != "" && quantity != "")){
            var changed_name = name.replace(/ /g,"_");
            $('#cart-items').append('<tr id="' + changed_name + '"><td>' + item.name + '</td><td>' + item.price + '</td><td>' + item.quantity + '</td><td>' + item.total.toFixed(2) + '</td>' + 
            '<td> <button class="decrease"> - </button> </td>' + '<td> <button class="increase"> + </button> </td>' + '<td> <button class="delete"> delete </button> </td>' + 
            '</tr>')
        }
        
        $("#subtotal").html(function(){
            var acc = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                acc += Number(table.rows[i].cells[3].innerHTML);
            }
            return acc.toFixed(2);
        });

        $("#taxes").html(function(){
            var taxes = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                taxes += Number(table.rows[i].cells[3].innerHTML) * 0.13;
            }
            return taxes.toFixed(2);
        });

        $("#grand_total").html(function(){
            var grand_total = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                grand_total += Number(table.rows[i].cells[3].innerHTML) * 1.13;
            }
            return grand_total.toFixed(2);
        });

    });

    $("#cart-items").on("click", ".delete", function(){
        $(this).parent().parent().remove();
        var table = document.getElementById("cart-items");
        $("#subtotal").html(function(){
            var acc = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                acc += Number(table.rows[i].cells[3].innerHTML);
            }
            return acc.toFixed(2);
        });

        $("#taxes").html(function(){
            var taxes = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                taxes += Number(table.rows[i].cells[3].innerHTML) * 0.13;
            }
            return taxes.toFixed(2);
        });

        $("#grand_total").html(function(){
            var grand_total = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                grand_total += Number(table.rows[i].cells[3].innerHTML) * 1.13;
            }
            return grand_total.toFixed(2);
        });
    });

    $("#cart-items").on("click", ".decrease", function(){
        var id = $(this).closest('tr').attr('id');
        var row = document.getElementById(id);
        var quantity = Number(row.cells[2].innerHTML);
        if (quantity != 0){
            var neq = quantity - 1;
            row.cells[2].innerHTML = neq;
            var ntotal = Number(row.cells[1].innerHTML) * Number(row.cells[2].innerHTML)
            row.cells[3].innerHTML = ntotal.toFixed(2);
        }
        var table = document.getElementById("cart-items");
        $("#subtotal").html(function(){
            var acc = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                acc += Number(table.rows[i].cells[3].innerHTML);
            }
            return acc.toFixed(2);
        });

        $("#taxes").html(function(){
            var taxes = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                taxes += Number(table.rows[i].cells[3].innerHTML) * 0.13;
            }
            return taxes.toFixed(2);
        });

        $("#grand_total").html(function(){
            var grand_total = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                grand_total += Number(table.rows[i].cells[3].innerHTML) * 1.13;
            }
            return grand_total.toFixed(2);
        });
    });

    $("#cart-items").on("click", ".increase", function(){
        var id = $(this).closest('tr').attr('id');
        var row = document.getElementById(id);
        var quantity = Number(row.cells[2].innerHTML);
        var neq = quantity + 1;
        row.cells[2].innerHTML = neq;
        var ntotal = Number(row.cells[1].innerHTML) * Number(row.cells[2].innerHTML);
        row.cells[3].innerHTML = ntotal.toFixed(2);
        var table = document.getElementById("cart-items");
        $("#subtotal").html(function(){
            var acc = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                acc += Number(table.rows[i].cells[3].innerHTML);
            }
            return acc.toFixed(2);
        });

        $("#taxes").html(function(){
            var taxes = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                taxes += Number(table.rows[i].cells[3].innerHTML) * 0.13;
            }
            return taxes.toFixed(2);
        });

        $("#grand_total").html(function(){
            var grand_total = 0;
            for (i = 1; i < $("#cart-items tr").length; i++){
                grand_total += Number(table.rows[i].cells[3].innerHTML) * 1.13;
            }
            return grand_total.toFixed(2);
        });
    });

    var number = 1;
    function fetch(){
        let URL = "http://www.hanxianxuhuang.ca/a2/text/data?paragraph=<number>";
        let new_URL = URL.replace("<number>", number);
        if ($(window).scrollTop() >= $(document).height() - $(window).height()){
            number += 5;
            $.ajax({
                url: new_URL,
                dataType: "json",
                method: "GET"
            }).then(function(respond){
                for (i = 0; i < respond.data.length; i++){
                    $("#data").append('<div id="paragraph_' + respond.data[i].paragraph + '"><p>' + 
                    respond.data[i].content + '<b>(Paragraph: ' + respond.data[i].paragraph + ')</b></p>' + 
                    '<button class="like">Likes: ' + respond.data[i].likes + '</button></div>');
                    if (i == respond.data.length - 1 && respond.next == false){
                        $("#data").append('<p id="end_sign"><b>You have reached the end</b></p>');
                    }
                }
            });
        }
    };

    $("#data").on('click', '.like', function(){
        var integer = Number($(this).text().slice(7));
        let new_int = integer + 1;
        $(this).html("Likes: " + new_int);

        $.ajax({
            url: "http://www.hanxianxuhuang.ca/a2/text/likes",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                paragraph: Number($(this).parent().attr('id').slice(10))
            })
        });
    });
    fetch();
    window.onscroll = fetch;
});

