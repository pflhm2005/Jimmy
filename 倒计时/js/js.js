//<div id="countdown">
//    <span>01</span>∑÷÷”<span>40</span>√Î
//<input type="button" value="" />
//</div>
window.onload = function ()
{
    var oCountDown = document.getElementById("countdown");
    var aInput = oCountDown.getElementsByTagName("input")[0];
    var timer = null;

    aInput.onclick = function ()
    {
        this.className == "" ? (timer = setInterval(updateTime, 1000), updateTime()) : (clearInterval(timer));
        this.className = this.className == '' ? "cancel" : '';
    };

    function format(a)
    {
        return a.toString().replace(/^(\d)$/,'0$1')
    }

    function updateTime ()
    {
        var aSpan = oCountDown.getElementsByTagName("span");
        var oRemain = aSpan[0].innerHTML.replace(/^0/,'') * 60 + parseInt(aSpan[1].innerHTML.replace(/^0/,''));
        if(oRemain <= 0)
        {
            clearInterval(timer);
            return
        }
        oRemain--;
        aSpan[0].innerHTML = format(parseInt(oRemain / 60));
        oRemain %= 60;
        aSpan[1].innerHTML = format(parseInt(oRemain));
    }
}