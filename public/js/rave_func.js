$(function () {
    $('.raveBtn').on('click', function (e) {
        e.preventDefault();
        var btn = $(this);
        btn.attr('disabled', 'disabled');
        var realAmt = parseFloat($('.amount').val());
        if (isFinite(realAmt) && realAmt > 0) {
            //var amt = realAmt + (realAmt * (1.6 / 100));
            
            var email = $('.email').val();
            var phone = $('.phone').val();
            var pk = $('.publicKey').val();

                var PBFKey = pk;
                var rString = 'EP' + randomString(14, allString);

                getpaidSetup({
                    PBFPubKey: PBFKey,
                    customer_email: email,
                    customer_firstname: "",
                    customer_lastname: "",
                    custom_description: "Fund Wallet",
                    custom_logo: "https://app.epump.com.ng/Content_v3/Images/e-pump%20logo2.png",
                    custom_title: "EPump",
                    amount: realAmt,
                    customer_phone: phone,
                    country: "NG",
                    currency: "NGN",
                    payment_method: "both",
                    txref: rString,
                    //integrity_hash: "<ADD YOUR INTEGRITY HASH HERE>",
                    callback: function (response) {
                        var flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a 					server page to complete status check.
                        if (
                            response.tx.chargeResponseCode == "00" ||
                            response.tx.chargeResponseCode == "0"
                        ) {
                            $('.trxRef').val(response.tx.txRef);
                            $('.flwRef').val(flw_ref);
                            $('.onlinePay').submit();
                            // redirect to a success page
                        } else {
                            // redirect to a failure page.
                        }
                    },
                    onclose: function () {
                        btn.removeAttr('disabled');
                    }
                });
        }     
        else {
            btn.removeAttr('disabled');
        }
    })

    var allString = '0123456789';
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }    
});