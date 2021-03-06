//Go!
window.onload=(function (){
    //简化数学方法与选择器
    function getRandom(num){
        return parseInt(Math.random()*num)+1;
    }
    function getTag(tagName){
        return document.getElementsByTagName(tagName);
    }
    function pow(num){
        return Math.pow(num,2);
    }
    //初始化画布并添加样式
    function canvasInit(Config){
        var config=Config||{};
        var body=getTag("body")[0],
            canvasObj=document.createElement("canvas");
        var canvas={
            element:canvasObj,
            points:[],
            config:{
                vx:config.vx||4,
                vy:config.vy||4,
                height:config.height||2,
                width:config.width||2,
                dist:config.dist||6000,
                e_dist:config.e_dist||20000,
                count:config.count||150,
                max_line:config.max_conn||10,
                color:config.color||"aqua",
                stroke:config.stroke||"lightgreen"
            }
        };
        body.style="margin:0;padding:0;";
        canvas.element.style="position:absolute;top:0;left:0;z-index:-1;";
        body.appendChild(canvas.element);
        canvas.context=canvas.element.getContext("2d");
        //窗口大小变化时重新绘制画布
        convasResize(canvas);
        window.onresize=(function () {
            convasResize(canvas);
        });
        //获取鼠标事件坐标
        body.onmousemove=function (e){
            var event=e||window.event;
            canvas.mouse={
                x:event.pageX,
                y:event.pageY
            };
        };
        document.onmouseleave=function (){
            canvas.mouse=undefined;
        };
        //定时调用初始化方法
        (function autoFlush(){
            drawPoint(canvas);
            setTimeout(function (){
                autoFlush();
            },40);
        })();
    }
    function convasResize(canvas){
        canvas.element.width=document.documentElement.clientWidth;
        canvas.element.height=document.documentElement.clientHeight;
    }
    //画点
    function drawPoint(canvas){
        var context=canvas.context,point;
        context.beginPath();
        context.clearRect(0,0,canvas.element.width,canvas.element.height);
        context.fillStyle=canvas.config.color;
        for(var i= 0,len=canvas.config.count;i<len;i++){
            if(canvas.points.length!=canvas.config.count){
                point={
                    x:getRandom(canvas.element.width)-1,
                    y:getRandom(canvas.element.height)-1,
                    vx:canvas.config.vx/2-getRandom(canvas.config.vx),
                    vy:canvas.config.vy/2-getRandom(canvas.config.vx)
                }
            }
            else{
                point=borderPoint(canvas.points[i],canvas);
            }
            context.fillRect(point.x,point.y,canvas.config.width,canvas.config.height);
            canvas.points[i]=point;
        }
        drawLine(canvas.context,canvas,canvas.mouse);
        context.closePath();
    }
    //边界与速度问题
    function borderPoint(point,canvas){
        var p=point;
        if(p.x<0 || p.x>canvas.element.width){
            p.vx= -p.vx;
            p.x+= p.vx;
        }
        else if(p.y<0 || p.y>canvas.element.height){
            p.vy= -p.vy;
            p.y+= p.vy;
        }
        else{
            p={
                x: p.x+ p.vx,
                y: p.y+ p.vy,
                vx: p.vx,
                vy: p.vy
            };
        }
        return p;
    }
    //画线
    function drawLine(context,canvas,mouse){
        context=context||canvas.context;
        for(var i= 0,len=canvas.config.count;i<len;i++){
            canvas.points[i].max_line=0;
            for(var j=0;j<len;j++){
                if(i!=j){
                    var dist=pow(canvas.points[i].x-canvas.points[j].x,2)+pow(canvas.points[i].y-canvas.points[j].y,2);
                    if(dist<=canvas.config.dist){
                        if(canvas.points[i].max_line<=canvas.config.max_line){
                            canvas.points[i].max_line++;
                            context.beginPath();
                            context.lineWidth=0.5-(dist/canvas.config.dist)/2;
                            context.strokeStyle="rgb("+canvas.config.stroke+")";
                            context.moveTo(canvas.points[i].x,canvas.points[i].y);
                            context.lineTo(canvas.points[j].x,canvas.points[j].y);
                            context.stroke();
                        }
                    }
                }
            }
            //鼠标进入事件
            if(mouse){
                dist=pow(canvas.points[i].x-mouse.x,2)+pow(canvas.points[i].y-mouse.y,2);
                if(dist>canvas.config.dist&&dist<canvas.config.e_dist){
                    canvas.points[i].x=canvas.points[i].x+(mouse.x - canvas.points[i].x) / 20;
                    canvas.points[i].y=canvas.points[i].y+(mouse.y - canvas.points[i].y) / 20;
                }
                if(dist<canvas.config.dist){
                    context.beginPath();
                    context.lineWidth=1;
                    context.strokeStyle="rgb("+canvas.config.stroke+")";
                    context.moveTo(canvas.points[i].x,canvas.points[i].y);
                    context.lineTo(mouse.x,mouse.y);
                    context.stroke();
                }
            }
        }
    }
    return canvasInit;
})();