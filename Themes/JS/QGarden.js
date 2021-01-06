function GetURLParameter(Param)
{
    let PageURL = window.location.search.substring(1);
    let URLVariables = PageURL.split('&');

    for (let Loop = 0; Loop < URLVariables.length; Loop++)
    {
        let ParameterName = URLVariables[Loop].split('=');

        if (ParameterName[0] === Param)
        {
            return ParameterName[1];
        } else return null;
    }
}

function ScrollTo(ID)
{
    ID = ID.replace("link", "");
    // Scroll
    $('html,body').animate
    (
        {
            scrollTop: $("#" + ID).offset().top - 80
        }, 'slow');
}

function CheckStrength(Password)
{
    let Error = "";
    let Strength = 0;

    if (Password.length < 8)
    {
        return "Mật khẩu phải có ít nhất 8 kí tự. Bao gồm chữ HOA, thường, số và ký tự đặt biệt.";
    }

    if (Password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) Strength += 1;
    if (Password.match(/([a-zA-Z])/) && Password.match(/([0-9])/)) Strength += 1;
    if (Password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) Strength += 1;
    if (Password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) Strength += 1;

    if (Strength < 2)
    {
        return "Mật khẩu phải có ít nhất 8 kí tự. Bao chữ HOA, thường, số và ký tự đặt biệt.";
    }
    else if (Strength === 2)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}

window.onload = function ()
{
    let PhoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let MailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //Pre CSS
    $('.menu-has-submenu > ul').css('line-height', 'normal');
    $('.menu-has-submenu > ul > li').css('line-height', 'normal');
    //Set Active
    let CurrentLocation = GetURLParameter('QGPage');
    if (CurrentLocation != null) $("#QG" + CurrentLocation).addClass('active'); else $("#QGHome").addClass('active');

    //Set Current Year
    $("#Year").text((new Date).getFullYear());

    //Run Banner Slider
    $('.slider').slider({transition: 800, height: 570, interval: 3000});

    //Product container image hover change
    $('.product-img').not('.no-hover').hover
    (
        function ()
        {
            $('> #img2', this).fadeOut(500);
        },
        function ()
        {
            $('> #img2', this).fadeIn(500);
        }
    );
    //Go product info
    {
        $('.product-container').not('section.QGCategory > .product-container').on('click', function ()
        {
            if (NotAdmin === true)
            {
                window.location.href = ('?QGPage=Product&Product=' + $(this).attr('qgid'));
            } else window.location.href = "?Admin=Product&Product=" + $(this).attr('qgid');
        });

        $('section.QGCategory > .product-container').on('click', function ()
        {
            window.location.href = ('?QGPage=Products&Category=' + $(this).attr('qgid'));
        });
    }

    //Product Image Slider
    $(".img-list-box img").click(function(Event)
    {
        Event.preventDefault();

        $("img#active").removeAttr("id");

        $(this).attr("id", "active");

        let Source = $(this).attr("src");

        $("#bigimg")
            .fadeOut(400, function()
            {
                $("#bigimg").attr('src', Source);
            })
            .fadeIn(400);
    });

    $('#qty-value').keypress(function ()
    {
        return false;
    });

    //Add QTY Click
    $("#qty-inc").click(function (Event)
    {
        Event.preventDefault();

        const TopNoti = Swal.mixin
        ({
            toast: true,
            timer: 2500,
            position: 'top-end',
            showConfirmButton: false,
            onOpen: (toast) =>
            {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        let CurrentQTY = parseInt($("#qty-value").val());

        if (CurrentQTY < 10)
        {
            $("#qty-value").val(CurrentQTY + 1);
        }
        else
        {
            TopNoti.fire
            ({
                type: 'error',
                title: 'Số lượng tối đa trên mỗi sản phẩm là 10 đơn vị.'
            });
        }
    });

    //Remove QTY Click
    $("#qty-dec").click(function (Event)
    {
        Event.preventDefault();

        const TopNoti = Swal.mixin
        ({
            toast: true,
            timer: 2500,
            position: 'top-end',
            timerProgressBar: true,
            showConfirmButton: false,
            onOpen: (toast) =>
            {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        let CurrentQTY = parseInt($("#qty-value").val());

        if (CurrentQTY > 0 && CurrentQTY === 1)
        {
            TopNoti.fire
            ({
                type: 'error',
                title: 'Số lượng tối thiểu trên mỗi sản phẩm là 1 đơn vị.'
            });
        }
        else
        {
            $("#qty-value").val(CurrentQTY - 1);
        }
    });

    //Change between description tab and review tab
    $('#description-tab').click(function (Event)
    {

        Event.preventDefault();

        //Change tab only if THIS CLICK not active
        if(!($(this).hasClass('active-tab')))
        {
            $('#review-tab').removeClass('active-tab');

            $(this).addClass('active-tab');

            $('#review-content').fadeOut(400, function ()
            {
                $('#decs-content').removeClass('deactivate').fadeIn(400);
            });
        }
    });

    $('#review-tab').click(function (Event)
    {
        Event.preventDefault();

        //Change tab only if THIS CLICK not active
        if(!($(this).hasClass('active-tab')))
        {
            $('#description-tab').removeClass('active-tab');

            $(this).addClass('active-tab');

            $('#decs-content').fadeOut(400, function ()
            {
                $('#review-content').removeClass('deactivate').fadeIn(400);
            });
        }
    });

    $('#star-hover-one').hover
    (
        function ()
        {
            $(this).addClass('fill');
        },
        function ()
        {
            $(this).removeClass('fill')
        }
    );

    $('#star-hover-two').hover
    (
        function (Event)
        {
            $('#star-hover-one').addClass('fill');
            $(this).addClass('fill');
        },
        function (Event)
        {
            $('#star-hover-one').removeClass('fill');
            $(this).removeClass('fill');
        }
    );

    $('#star-hover-two').hover
    (
        function (Event)
        {
            $('#star-hover-one').addClass('fill');
            $(this).addClass('fill');
            $(this).on('click', function ()
            {
                let IsRemoveHover = false;
            })
        },
        function (Event)
        {
            $('#star-hover-one').removeClass('fill');
            $(this).removeClass('fill');
        }
    );

    $('#star-hover-thr').hover
    (
        function (Event)
        {
            $('#star-hover-one').addClass('fill');
            $('#star-hover-two').addClass('fill');
            $(this).addClass('fill');
        },
        function (Event)
        {
            $('#star-hover-one').removeClass('fill');
            $('#star-hover-two').removeClass('fill');
            $(this).removeClass('fill');
        }
    );

    $('#star-hover-fou').hover
    (
        function (Event)
        {
            $('#star-hover-one').addClass('fill');
            $('#star-hover-two').addClass('fill');
            $('#star-hover-thr').addClass('fill');
            $(this).addClass('fill');
        },
        function (Event)
        {
            $('#star-hover-one').removeClass('fill');
            $('#star-hover-two').removeClass('fill');
            $('#star-hover-thr').removeClass('fill');
            $(this).removeClass('fill');
        }
    );

    $('#star-hover-fiv').hover
    (
        function (Event)
        {
            $('#star-hover-one').addClass('fill');
            $('#star-hover-two').addClass('fill');
            $('#star-hover-thr').addClass('fill');
            $('#star-hover-fou').addClass('fill');
            $(this).addClass('fill');
        },
        function (Event)
        {
            $('#star-hover-one').removeClass('fill');
            $('#star-hover-two').removeClass('fill');
            $('#star-hover-thr').removeClass('fill');
            $('#star-hover-fou').removeClass('fill');
            $(this).removeClass('fill');
        }
    );

    function RemoveFill ()
    {
        $('#star-hover-one').removeClass('fill-click');
        $('#star-hover-two').removeClass('fill-click');
        $('#star-hover-thr').removeClass('fill-click');
        $('#star-hover-fou').removeClass('fill-click');
        $('#star-hover-fiv').removeClass('fill-click');
    }

    $('#star-hover-one').click
    (
        function (Event)
        {
            Event.preventDefault();
            RemoveFill ();

            $(this).addClass('no-hover');
            $(this).addClass('fill-click');

            $('#star').val(1);
        }
    );

    $('#star-hover-two').click
    (
        function (Event)
        {
            Event.preventDefault();
            RemoveFill ();

            $(this).addClass('no-hover');
            $('#star-hover-one').addClass('fill-click');
            $(this).addClass('fill-click');

            $('#star').val(2);
        }
    );

    $('#star-hover-thr').click
    (
        function (Event)
        {
            Event.preventDefault();
            RemoveFill ();

            $(this).addClass('no-hover');
            $('#star-hover-one').addClass('fill-click');
            $('#star-hover-two').addClass('fill-click');
            $(this).addClass('fill-click');

            $('#star').val(3);
        }
    );

    $('#star-hover-fou').click
    (
        function (Event)
        {
            Event.preventDefault();
            RemoveFill ();

            $(this).addClass('no-hover');
            $('#star-hover-one').addClass('fill-click');
            $('#star-hover-two').addClass('fill-click');
            $('#star-hover-thr').addClass('fill-click');
            $(this).addClass('fill-click');

            $('#star').val(4);
        }
    );

    $('#star-hover-fiv').click
    (
        function (Event)
        {
            Event.preventDefault();
            RemoveFill ();

            $(this).addClass('no-hover');
            $(this).addClass('fill-click');
            $('#star-hover-one').addClass('fill-click');
            $('#star-hover-two').addClass('fill-click');
            $('#star-hover-thr').addClass('fill-click');
            $('#star-hover-fou').addClass('fill-click');

            $('#star').val(5);
        }
    );

    $('#LabelIsCreateAccount').click(function ()
    {
        if ($('input[name="IsCreateAccount"]:checked').length > 0)
        {
            $('#IsCreateAccount').attr('checked', false);

            $("#LabelIsCreateAccount:after").fadeOut();
        }

        if ($('input[name="IsCreateAccount"]:checked').length === 0)
        {
            $('#IsCreateAccount').attr('checked', true);

            $("#LabelIsCreateAccount:after").fadeIn();
        }
    });

    jQuery('.pro-qty').each(function ()
    {
        const Toast = Swal.mixin(
            {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) =>
            {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        let Spinner = jQuery(this),
            Up = Spinner.find('#cart-qty-inc'),
            Down = Spinner.find('#cart-qty-dec'),
            ProductID = Spinner.find('#ProductID').val(),
            CurrentQTY = parseInt(Spinner.find("#cart-qty-value").val()),
            Remove = Spinner.parent().parent().find('#RemoveFromCart');

        console.log(Remove);

        Up.click(async function ()
        {
            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang kiểm tra',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Themes/Images/Default/Loading.gif',
                }
            );

            if (CurrentQTY < 10)
            {
                Spinner.find("#cart-qty-value").val(++CurrentQTY);
                Spinner.find("#cart-qty-value").trigger("change");

                let CartData = new FormData();

                CartData.append('ProductID', ProductID);
                CartData.append('Action', 'AddToCart');
                CartData.append('ProductUnit', CurrentQTY.toString());

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Cart.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CartData,
                        success:
                            function (Respond)
                            {
                                Loading.close();
                                if (Respond.StatusCode === 1)
                                {
                                    Toast.fire
                                    (
                                        {
                                            type: 'success',
                                            title: 'Sửa thành công.'
                                        }
                                    ); location.reload();
                                }
                                else
                                {
                                    Swal.fire
                                    (
                                        {
                                            type: 'error',
                                            title: 'Oops.',
                                            text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                            showConfirmButton: true,
                                            showCancelButton: false,
                                        }
                                    );
                                }
                            },
                        error:
                            function ()
                            {
                                Loading.close();
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else
            {
                Loading.close();
                Toast.fire
                ({
                    type: 'error',
                    title: 'Số lượng tối đa trên mỗi sản phẩm là 10 đơn vị.'
                })
            }
        });

        Down.click(async function ()
        {
            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang kiểm tra',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Themes/Images/Default/Loading.gif',
                }
            );

            if (CurrentQTY >= 1)
            {
                Spinner.find("#cart-qty-value").val(--CurrentQTY);
                Spinner.find("#cart-qty-value").trigger("change");

                let CartData = new FormData();

                CartData.append('ProductID', ProductID);
                CartData.append('Action', 'AddToCart');
                CartData.append('ProductUnit', CurrentQTY.toString());

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Cart.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CartData,
                        success:
                            function (Respond)
                            {
                                Loading.close();
                                if (Respond.StatusCode === 1)
                                {
                                    Toast.fire
                                    (
                                        {
                                            type: 'success',
                                            title: 'Sửa thành công.'
                                        }
                                    ); location.reload();
                                }
                                else
                                {
                                    Swal.fire
                                    (
                                        {
                                            type: 'error',
                                            title: 'Oops.',
                                            text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                            showConfirmButton: true,
                                            showCancelButton: false,
                                        }
                                    );
                                }
                            },
                        error:
                            function ()
                            {
                                Loading.close();
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else
            {
                Toast.fire
                ({
                    type: 'error',
                    title: 'Số lượng tối thiểu trên mỗi sản phẩm là 1 đơn vị.'
                })
            }
        });

        Remove.click(async function ()
        {
            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang kiểm tra',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Themes/Images/Default/Loading.gif',
                }
            );

            let CartData = new FormData();

            CartData.append('Action', 'RemoveFromCart');
            CartData.append('ProductID', $(this).attr('value'));

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX/Cart.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: CartData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.StatusCode === 1)
                            {
                                Toast.fire
                                (
                                    {
                                        type: 'success',
                                        title: 'Xóa thành công.'
                                    }
                                ); location.reload();
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        })
    });

    $('#IsSale').change(function ()
    {
        $('#IsNotSale').prop( "checked", false);
    });

    $('#IsNotSale').change(function ()
    {
        $('#IsSale').prop( "checked", false);
    });

    $('#AccountNav').on('click', 'a', function (Event)
    {
        let ClickedID = $(this).attr('id');
        let CurrentTab = $('#AccountNav > a.active').attr('id');


        $('#AccountNav > a.active').removeClass('active');

        $(this).addClass('active');

        $('#AccountTab > #' + CurrentTab).fadeOut(300, function ()
        {
            $(this).removeClass('active');

            $('#AccountTab > #' + ClickedID).fadeIn(300, function ()
            {
                $('#AccountTab > #' + ClickedID).removeClass('fade');
                $('#AccountTab > #' + ClickedID).addClass('active');
            });
        });

        $('#btn-avatar').on('click', function (Event)
        {
            Event.preventDefault();

            $('#input-avatar').trigger('click');
        })
    });

    $('#UserInfoChange').click(async function (Event)
    {
        Event.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        let LoginName = $('#LoginName').val(),
            UserName = $('#UserName').val(),
            UserAddress = $('#Address').val(),
            UserPhone = $('#Phone').val(),
            UserMail = $('#Email').val(),
            UserBirthday = $('#Birthday').val(),
            UserCurrentPass = $('#CurrentPassword').val(),
            UserNewPass = $('#NewPassword').val(),
            UserConfirmNewPass = $('#ConfirmNewPassword').val();

        let ErrorMessage = "";

        if (LoginName === "" && UserName === "" && UserAddress === "" && UserPhone === "" && UserBirthday === "" && UserMail === "" && UserCurrentPass === "")
        {
            ErrorMessage += "Bạn phải nhập ít nhất một thông tin mới để lưu thay đổi. <br>";
        }

        if (ErrorMessage !== "")
        {
            $('#ErrorBox').empty().append(ErrorMessage);

            ScrollTo('ToScroll');
        }

        if (UserCurrentPass !== "" && LoginName === "" && UserName === "" && UserAddress === "" && UserPhone === "" && UserMail === "" && UserBirthday === "")
        {

            if (UserNewPass === "")
            {
                ErrorMessage += "Vui lòng nhập mật khẩu mới. <br>";
            }

            if (UserConfirmNewPass === "")
            {
                ErrorMessage += "Vui lòng nhập lại mật khẩu mới. <br>";
            }

            if (UserNewPass === UserConfirmNewPass)
            {
                if (CheckStrength(UserNewPass) !== 0 || CheckStrength(UserNewPass) !== 1) ErrorMessage += CheckStrength(UserNewPass);

                let Data = new FormData();

                Data.append('Action', 'CheckCurrentPass');
                Data.append('CurrentPass', UserCurrentPass);

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: Data,
                        success:
                            async function (Respond)
                            {
                                if (Respond.StatusCode !== 1)
                                {
                                    ErrorMessage += "Mật khẩu cũ không chính xác. Vui lòng kiểm tra lại.";
                                    $('#CurrentPassword').val('');

                                    if (ErrorMessage !== "")
                                    {
                                        $('#ErrorBox').empty().append(ErrorMessage);

                                        ScrollTo('ToScroll');
                                    }
                                }
                                else
                                {
                                    let UpdatePass = new FormData();

                                    UpdatePass.append('Action', 'ChangePassword');
                                    UpdatePass.append('NewPassword', UserNewPass);

                                    await $.ajax
                                    (
                                        {
                                            type: 'POST',
                                            url: 'Model/AJAX/Login.php',
                                            dataType: 'JSON',
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            data: UpdatePass,
                                            success:
                                            function (Respond)
                                            {
                                                if (Respond.StatusCode !== 1)
                                                {
                                                    Swal.fire
                                                    (
                                                        {
                                                            timer: 3000,
                                                            type: 'error',
                                                            title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                                            showConfirmButton: false,
                                                            showCancelButton: false,
                                                        }
                                                    );
                                                }
                                                else if (Respond.StatusCode === 1)
                                                {
                                                    Swal.fire
                                                    (
                                                        {
                                                            timer: 2000,
                                                            type: 'success',
                                                            title: 'Thay đổi mật khẩu thành công.',
                                                            showConfirmButton: false,
                                                            showCancelButton: false,
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                    )
                                }
                            },
                        error:
                            function ()
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else
            {
                ErrorMessage += "Mật khẩu vừa nhập không khớp. <br>";
            }
        }
        else
        {

            let NewInfo = new FormData();

            if (LoginName !== "")
            {
                let CheckExist = new FormData();
                CheckExist.append('Action', 'CheckExist');
                CheckExist.append('Login', LoginName);

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckExist,
                        success:
                        function (Respond)
                        {
                            if (Respond.StatusCode !== 1)
                            {
                                ErrorMessage += "Tên Đăng nhập đã tồn tại. <br>";
                                $('#LoginName').val('');
                            } else NewInfo.append('UserLogin', LoginName);
                        }
                    }
                )
            }

            if (UserPhone !== "")
            {
                if (PhoneRegex.test(UserPhone) === false)
                {
                    ErrorMessage += "Số điện thoại không hợp lệ.";
                }

                let CheckExist = new FormData();

                CheckExist.append('Action', 'CheckPhoneExist');
                CheckExist.append('Phone', UserPhone);

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckExist,
                        success:
                            function (Respond)
                            {
                                if (Respond.StatusCode !== 1)
                                {
                                    ErrorMessage += "Số điện thoại đã được đăng ký. <br>";
                                    $('#Phone').val('');
                                } else NewInfo.append('UserPhone', UserPhone);
                            }
                    }
                )
            }

            if (UserMail !== "")
            {
                if (MailRegex.test(UserMail) === false) ErrorMessage += "Địa hỉ mail không hợp lệ.";

                let CheckExist = new FormData();
                CheckExist.append('Action', 'CheckExist');
                CheckExist.append('Login', UserMail);

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckExist,
                        success:
                            function (Respond)
                            {
                                if (Respond.StatusCode !== 1)
                                {
                                    ErrorMessage += "Email đã tồn tại. <br>";
                                    $('#Email').val('');
                                } else NewInfo.append('UserMail', UserMail)
                            }
                    }
                )
            }

            if (UserCurrentPass !== "")
            {
                let CheckMatch = new FormData();

                CheckMatch.append('Action', 'CheckCurrentPass');
                CheckMatch.append('CurrentPass', UserCurrentPass);

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckMatch,
                        success:
                            function (Respond)
                            {
                                if (Respond.StatusCode !== 1)
                                {
                                    ErrorMessage += "Mật khẩu cũ không chính xác. Vui lòng kiểm tra lại. <br>";
                                    $('#CurrentPassword').val('');
                                }
                            },
                        error:
                            function ()
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );

                if (UserNewPass === "")
                {
                    ErrorMessage += "Vui lòng nhập mật khẩu mới. <br>";
                }

                if (UserConfirmNewPass === "")
                {
                    ErrorMessage += "Vui lòng nhập lại mật khẩu mới. <br>";
                }

                if (UserNewPass === UserConfirmNewPass)
                {
                    if ((CheckStrength(UserNewPass) !== 0) && (CheckStrength(UserNewPass) !== 1)) ErrorMessage += CheckStrength(UserNewPass);
                    NewInfo.append('NewPassword', UserNewPass);
                }
                else
                {
                    ErrorMessage += "Mật khẩu vừa nhập không khớp. <br>";
                    $('#ConfirmNewPassword').val('');
                    $('#NewPassword').val('');
                }
            }

            if (ErrorMessage !== "")
            {
                Loading.close();
                $('#ErrorBox').empty().append(ErrorMessage);

                ScrollTo('ToScroll');
            }
            else
            {
                NewInfo.append('Action', 'ChangeInfo');

                if (UserName !== "") NewInfo.append('UserName', UserName);
                if (UserAddress !== "") NewInfo.append('UserAddress', UserAddress);
                if (UserBirthday !== "") NewInfo.append('UserBirthday', UserBirthday);
                if ($('#input-avatar')['0'].files.length > 0) NewInfo.append("UserAvatar", $('input[type="file"]')[0].files['0']);

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: NewInfo,
                        success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.StatusCode === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 1500,
                                        type: 'success',
                                        title: 'Thay đổi thông tin tài khoản thành công.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );

                                $('#ErrorBox').empty();
                                ScrollTo('ToScroll');
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 1500,
                                        type: 'error',
                                        title: 'Có lỗi trong quá trình xử lý. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );

                                $('#ErrorBox').empty();
                                ScrollTo('ToScroll');
                            }
                        }
                    }
                );
            }
        }
    });

    $('#DoLogin').click(async function (Event)
    {
        Event.preventDefault();

        let UserLogin = $('#EmailOrLogin').val(),
            UserPass = $('#LoginPass').val(),
            SavePortal = $('#Remember').val();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        if (UserLogin !== "" && UserPass !== "")
        {
            let CheckUserIsExist = new FormData();

            CheckUserIsExist.append('Login', UserLogin);
            CheckUserIsExist.append('Action', 'CheckExist');

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX/Login.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: CheckUserIsExist,
                    success:
                        async function (Respond)
                        {
                            if (Respond.StatusCode === 1)
                            {
                                Loading.close();

                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Lỗi.',
                                        text: 'Tài khoản không tồn tại trên hệ thống.',
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                            else if (Respond.StatusCode === 0)
                            {
                                let LoginData = new FormData();

                                LoginData.append('Login', UserLogin);
                                LoginData.append('Password', UserPass);
                                LoginData.append('Action', 'Login');
                                LoginData.append('SavePortal', SavePortal);

                                await $.ajax
                                (
                                    {
                                        type: 'POST',
                                        url: 'Model/AJAX/Login.php',
                                        dataType: 'JSON',
                                        cache: false,
                                        contentType: false,
                                        processData: false,
                                        data: LoginData,
                                        success: function (Respond)
                                        {
                                            Loading.close();

                                            if (Respond.StatusCode === 1)
                                            {
                                                Swal.fire
                                                (
                                                    {
                                                        timer: 3000,
                                                        type: 'success',
                                                        title: 'Thành công',
                                                        text: 'Đăng nhập hoàn tất. Đang chuyển hướng về trang chủ.',
                                                        showConfirmButton: false,
                                                        showCancelButton: false,
                                                    }
                                                );

                                                window.location.href = ('?QGPage=Home');
                                            }
                                            else if (Respond.StatusCode === 0)
                                            {
                                                Swal.fire
                                                (
                                                    {
                                                        type: 'error',
                                                        title: 'Lỗi.',
                                                        text: 'Mật khẩu không chính xác hoặc tài khoản chưa được kích hoạt.',
                                                        showConfirmButton: true,
                                                        showCancelButton: false,
                                                    }
                                                );
                                            }

                                        }
                                    }
                                )
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        }
        else
        {
            if (UserLogin === "" && UserPass === "")
            {
                Loading.close();
                Swal.fire
                (
                    {
                        type: 'error',
                        title: 'Lỗi.',
                        text: 'Vui lòng nhập đầy đủ thông tin đăng nhập.',
                        showConfirmButton: true,
                        showCancelButton: false,
                    }
                );

                return;
            }

            if (UserPass === "")
            {
                Loading.close();
                Swal.fire
                (
                    {
                        type: 'error',
                        title: 'Lỗi.',
                        text: 'Vui lòng nhập mật khẩu.',
                        showConfirmButton: true,
                        showCancelButton: false,
                    }
                );

                return;
            }

            if (UserLogin === "")
            {
                Loading.close();
                Swal.fire
                (
                    {
                        type: 'error',
                        title: 'Lỗi.',
                        text: 'Vui lòng nhập email hoặc tên đăng nhập.',
                        showConfirmButton: true,
                        showCancelButton: false,
                    }
                );
            }
        }
    });

    $('#DoRegister').click(async function (Event)
    {
        Event.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        let UserLogin = $('#Login').val(),
            UserMail = $('#Mail').val(),
            UserName = $('#FullName').val(),
            UserPhone = $('#Phone').val(),
            UserAddress = $('#Address').val(),
            UserPassword = $('#Pass').val(),
            UserConfirmPassword = $('#RePass').val();

        let ErrorMessage = "";

        if (UserLogin === "" && UserMail === "" && UserName === "" && UserPhone === "" && UserPassword === "" && UserConfirmPassword === "")
        {
            ErrorMessage = "Vui lòng nhập đầy đủ thông tin. <br>";

            Loading.close();

            $('#ErrorBox').empty().append(ErrorMessage);

            ScrollTo('ToScroll');
        }
        else
        {
            let Register = new FormData();

            if (UserLogin !== "")
            {
                let CheckUserIsExist = new FormData();

                CheckUserIsExist.append('Login', UserLogin);
                CheckUserIsExist.append('Action', 'CheckExist');

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckUserIsExist,
                        success:
                            function (Respond)
                            {
                                if (Respond.StatusCode === 0)
                                {
                                    Loading.close();

                                    ErrorMessage += 'Tên đăng nhập đã tồn tại trên hệ thống. <br>';
                                } else Register.append('UserLogin', UserLogin);
                            },
                        error:
                            function ()
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else ErrorMessage += "Vui lòng nhập tên đăng nhập. <br>";

            if (UserMail !== "")
            {
                if (MailRegex.test(UserMail) === false) ErrorMessage += "Địa chỉ mail không hợp lệ.";

                let CheckMailIsExist = new FormData();

                CheckMailIsExist.append('Login', UserMail);
                CheckMailIsExist.append('Action', 'CheckExist');

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckMailIsExist,
                        success:
                            function (Respond)
                            {
                                if (Respond.StatusCode === 0)
                                {
                                    Loading.close();

                                    ErrorMessage += 'Địa chỉ mail đã có người đăng ký. <br>';
                                } else Register.append('UserMail', UserMail);
                            },
                        error:
                            function ()
                            {
                                Loading.close();
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else ErrorMessage += "Vui lòng nhập địa chỉ thư điện tử. <br>";

            if (UserPhone !== "")
            {
                if (PhoneRegex.test(UserPhone) === false)
                {
                    ErrorMessage += "Số điện thoại không hợp lệ. <br>";
                }

                let CheckPhoneIsExist = new FormData();

                CheckPhoneIsExist.append('Phone', UserPhone);
                CheckPhoneIsExist.append('Action', 'CheckPhoneExist');

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: CheckPhoneIsExist,
                        success:
                            function (Respond)
                            {
                                if (parseInt(Respond.StatusCode) === 0)
                                {
                                    Loading.close();

                                    ErrorMessage += "Số điện thoại đã được sử dụng. <br>";
                                } else Register.append('UserPhone', UserPhone);
                            },
                        error:
                            function ()
                            {
                                Loading.close();
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else ErrorMessage += "Vui lòng nhập số điện thoại. <br>";

            if (UserPassword !== "")
            {
                if (UserConfirmPassword === "") ErrorMessage += "Vui lòng xác nhận lại mật khẩu vừa nhập. <br>";

                if (UserPassword === UserConfirmPassword && UserConfirmPassword !== "")
                {
                    let PasswordStrength = CheckStrength(UserPassword);

                    if (typeof PasswordStrength === 'string') ErrorMessage += PasswordStrength + "<br>";
                } else ErrorMessage += "Mật khẩu vừa nhập không khớp. <br>";

                Register.append('UserPassword', UserPassword);
            }
            else ErrorMessage += "Vui lòng nhập mật khẩu. <br>";

            if (UserName !== "") Register.append('UserName', UserName); else ErrorMessage += "Vui lòng nhập họ và tên.";

            if (UserAddress !== "") Register.append('UserAddress' ,UserAddress);

            if (ErrorMessage === "")
            {
                Register.append('Action', 'Register');

                await $.ajax
                (
                    {
                        type: 'POST',
                        url: 'Model/AJAX/Login.php',
                        dataType: 'JSON',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: Register,
                        success:
                            function (Respond)
                            {
                                if (Respond.StatusCode === 1)
                                {
                                    Loading.close();

                                    Swal.fire
                                    (
                                        {
                                            type: 'success',
                                            title: 'Đăng ký thành công.',
                                            text: 'Chúng tôi đã gửi thư kích hoạt tới địa chỉ ' + UserMail + '. Vui lòng kích hoạt tài khoản.',
                                            showConfirmButton: true,
                                            showCancelButton: false,
                                        }.then(function ()
                                        {
                                            window.location.href = "?QGPage=Home";
                                        })
                                    );
                                }
                            },
                        error:
                            function ()
                            {
                                Loading.close();
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'error',
                                        title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                    }
                                );
                            }
                    }
                );
            }
            else
            {
                Loading.close();

                $('#ErrorBox').empty().append(ErrorMessage);

                ScrollTo('ToScroll');
            }
        }

    });

    $('#DoComment').click(async  function (Event)
    {
        Event.preventDefault();

        let UserRatedStar = parseInt($('input#star').val()),
            UserCommentContent = $('textarea#your-review').val();

        let ErrorMessage = "";

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        if (UserRatedStar === 0)
        {
            ErrorMessage += "Vui lòng chọn mức độ hài lòng dựa trên sao vàng. <br>";
        }

        if (UserCommentContent === "")
        {
            ErrorMessage += "Vui lòng nhập nội dung bình luận.";
        }

        if (ErrorMessage !== "")
        {
            Loading.close();

            Swal.fire
            (
                {

                    type: 'error',
                    title: 'Lỗi.',
                    html: ErrorMessage,
                    showConfirmButton: true,
                    showCancelButton: false,
                }
            );

            return;
        }

        let CommentData = new FormData();

        CommentData.append('Action', 'Product');
        CommentData.append('SubjectID', $('#ProID').val());
        CommentData.append('Star', UserRatedStar.toString());
        CommentData.append('CommentContent', UserCommentContent);

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX/Comment.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: CommentData,
                success:
                    function (Respond)
                    {
                        if (Respond.StatusCode === 1)
                        {
                            Loading.close();

                            $(Respond.Message).insertBefore($('#EndOfComment'));

                            $('#CommentForm')['0'].reset();
                            $('#DoNewsComment').val('');
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('#AddToCart').click(async function (Event)
    {
        Event.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        const Toast = Swal.mixin(
            {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) =>
                {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

        let UnitQTY = $('input#qty-value').val(),
            ProductID = $('input#ProductID').val();

        let CartData = new FormData();

        CartData.append('ProductID', ProductID);
        CartData.append('ProductUnit', UnitQTY);
        CartData.append('Action', 'AddToCart');

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX/Cart.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: CartData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.StatusCode === 1)
                        {
                            Toast.fire
                            (
                                {
                                    type: 'success',
                                    title: 'Thêm vào giỏ thành công.'
                                }
                            );

                            $('#CartHeaderQTY')['0'].innerText = Respond.CartQTY;
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('#DoNewsComment').click(async  function (Event)
    {
        Event.preventDefault();

        let UserCommentContent = $('textarea#your-review').val();

        let ErrorMessage = "";

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        if (UserCommentContent === "")
        {
            ErrorMessage += "Vui lòng nhập nội dung bình luận.";
        }

        if (ErrorMessage !== "")
        {
            Loading.close();

            Swal.fire
            (
                {

                    type: 'error',
                    title: 'Lỗi.',
                    html: ErrorMessage,
                    showConfirmButton: true,
                    showCancelButton: false,
                }
            );

            return;
        }

        let CommentData = new FormData();

        CommentData.append('Action', 'News');
        CommentData.append('SubjectID', $('#NewsID').val());
        CommentData.append('CommentContent', UserCommentContent);

        if ($('#ReplyOnID').val() !== "")
        {
            CommentData.append('Action', 'Reply');
            CommentData.append('SubjectID', $('#ReplyOnID').val());
        }

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX/Comment.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: CommentData,
                success:
                    function (Respond)
                    {
                        if (Respond.StatusCode === 1)
                        {
                            Loading.close();

                            if ($('#ReplyOnID').val() !== "")
                            {
                                $(Respond.Message).insertBefore($('#EndOfR' + $('#ReplyOnID').val()));
                            } else $(Respond.Message).insertBefore($('#EndOfComment'));

                            $('#CommentForm')['0'].reset();
                            $('#DoNewsComment').val('');
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('span.reply-btn').click(function ()
    {
        $('#ReplyOnID').val($(this).attr('value'));
    });

    $('#CheckOut').click(async function (Event)
    {
        Event.preventDefault();

        let UserMail = $('#cart-user-mail').val(),
            UserPhone = $('#cart-user-phone').val(),
            UserAddress = $('#cart-user-address').val();

        let ErrorMessage = "";

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        if (PhoneRegex.test(UserPhone) === true)
        {
            ErrorMessage = "Số điện thoại không hợp lệ.";
        }

        if (ErrorMessage !== "")
        {
            Loading.close();

            Swal.fire
            (
                {

                    type: 'error',
                    title: 'Lỗi.',
                    html: ErrorMessage,
                    showConfirmButton: true,
                    showCancelButton: false,
                }
            );

            return;
        }

        let CheckoutData = new FormData();

        CheckoutData.append('UserMail', UserMail);
        CheckoutData.append('UserPhone', UserPhone);
        CheckoutData.append('UserAddress', UserAddress);
        CheckoutData.append('Action', 'Checkout');

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX/Cart.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: CheckoutData,
                success:
                    function (Respond)
                    {
                        if (Respond.StatusCode === 1)
                        {
                            Loading.close();

                            Swal.fire({
                                type: 'success',
                                title: 'Thành công.',
                                text: 'Đã đặt hàng thành công.',
                                showConfirmButton: true,
                                confirmButtonText: 'Quay về trang chủ',
                                showCancelButton: false,
                            })
                                .then((result) =>
                            {
                                window.location.href = "?QGPage=Home";
                            });
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('#AddCoupon').click(async function (Event)
    {
        Event.preventDefault();

        let UserMail = $('#cart-user-mail').val(),
            UserPhone = $('#cart-user-phone').val(),
            UserAddress = $('#cart-user-address').val();

        let ErrorMessage = "";

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        let CheckoutData = new FormData();

        CheckoutData.append('Action', 'AddCoupon');
        CheckoutData.append('CouponCode', $('#CouponCode').val());

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX/Cart.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: CheckoutData,
                success:
                    function (Respond)
                    {
                        if (Respond.StatusCode === 1)
                        {
                            Loading.close();

                            Swal.fire({
                                timer: 1500,
                                type: 'success',
                                title: 'Thành công.',
                                text: 'Thêm mã giảm giá thành công.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            })
                                .then((result) =>
                                {
                                    location.reload();
                                });
                        }
                        else
                        {
                            let SwalText = "";
                            if (Respond.ErrorMessage)
                            {
                                SwalText = Respond.ErrorMessage;
                            } else SwalText = 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.';

                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: SwalText,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('#GoCheckout').click(function ()
    {
        window.location.href = "?QGPage=Checkout";
    });

    $('#ContactSubmit').click(async function ()
    {
        let UserName = $('#customername').val(),
            UserMail = $('#customerEmail').val(),
            ContactSubject = $('#contactSubject').val(),
            ContactMessage = $('#contactMessage').val();

        let ErrorMessage = "";

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Themes/Images/Default/Loading.gif',
            }
        );

        if (UserName === "") ErrorMessage += "Vui lòng nhập tên của bạn.<br>";
        if (UserMail === "") ErrorMessage += "Vui lòng nhập địa chỉ mail.<br>";
        else if (MailRegex.test(UserMail) === false) ErrorMessage += "Địa chỉ mail không hợp lệ.<br>";
        if (ContactMessage === "") ErrorMessage += "Vui lòng nhập nội dung tin nhắn.<br>";
        if (ContactSubject === "") ErrorMessage += "Vui lòng nhập tiêu đề tin nhắn.<br>";

        if (ErrorMessage !== "")
        {
            Loading.close();

            Swal.fire
            (
                {
                    type: 'error',
                    title: 'Oops',
                    html: ErrorMessage,
                    showConfirmButton: true,
                    showCancelButton: false
                }
            );

            $('#contact-form')['0'].reset();
        }
        else
        {
            let Contact = new FormData();

            Contact.append('Action', 'AddContact');
            Contact.append('UserName', UserName);
            Contact.append('UserMail', UserMail);
            Contact.append('ContactSubject', ContactSubject);
            Contact.append('ContactMessage', ContactMessage);

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX/Contact.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: Contact,
                    success:
                        function (Respond)
                        {
                            if (Respond.StatusCode === 1)
                            {
                                Loading.close();

                                Swal.fire({
                                    type: 'success',
                                    title: 'Thành công.',
                                    text: 'Gửi thành công. Chúng tôi sẽ phản hồi lại bạn sau vài giờ làm việc.',
                                    showConfirmButton: true,
                                    confirmButtonText: 'Quay về trang chủ',
                                    showCancelButton: false,
                                })
                                    .then((result) =>
                                    {
                                        window.location.href = "?QGPage=Home";
                                    });
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        text: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );

            $('#contact-form')['0'].reset();
        }

    });
};