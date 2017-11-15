(function( w ) {

    // 把角度转换为弧度
    function angleToRadian( angle ) {
        return Math.PI / 180 * angle;
    }

    // 混入式继承
    function extend( o1, o2 ) {
        for ( var key in o2 ) {
            // 只有o2自己的属性才会copy到o1身上
            if ( o2.hasOwnProperty( key ) ) {
                o1[ key ] = o2[ key ];
            }
        }
    }

    /*
     * constrcutor { Pipe } 饼图构造函数
     * param { x: number } 圆心x轴坐标
     * param { y: number } 圆心y轴坐标
     * param { r: number } 圆半径
     * param { data: Array } 绘制饼图所需的数据
     * */
    function Pipe( x, y, r, data ) {

        this.x = x;
        this.y = y;
        this.r = r;
        this.data = data;

        // 一组颜色
        this.colors = [ 'orange', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'peru', 'pink' ];
    }

    // 给原型扩充方法
    extend( Pipe.prototype, {

        // 绘制饼图
        draw: function() {

            // 在外面保存一下this
            var self = this;

            // 数据的总和
            var num = 0;
            this.data.forEach( function( obj ) {
                num += obj.val;
            });

            // 一个数据值所占用的角度
            var baseAngle = 360 / num;

            // 假设一开始就绘制了一个起始为0，结束为0的扇形
            var startAngle = 0,
                endAngle = 0,
                lineAngle = 0,
                lineX, lineY;

            // 画扇形
            this.data.forEach( function( obj, i ) {

                // 每次进来，计算当前扇形的起始角度和结束角度

                // 下一个扇形的起始角度，是当前扇形的结束角度
                startAngle = endAngle;
                // 这个结束角度 = 上一个扇形的结束角度 + 当前数值所对应的角度
                endAngle = endAngle + baseAngle * obj.val;

                // 求扇形中间线的角度
                lineAngle = startAngle + baseAngle * obj.val / 2;
                /*
                * 根据中间线的角度，求中间的线的x和y坐标：
                * x = 圆心x + r * Math.cos( angleToRadian( pointAngle ) )
                * y = 圆心y + r * Math.sin( angleToRadian( pointAngle ) )
                * */
                lineX = self.x + ( self.r + 20 ) * Math.cos( angleToRadian( lineAngle ) );
                lineY = self.y + ( self.r + 20 ) * Math.sin( angleToRadian( lineAngle ) );


                // 画每一个扇形
                ctx.beginPath();
                ctx.moveTo( self.x, self.y );
                ctx.arc( self.x, self.y, self.r, angleToRadian( startAngle ), angleToRadian( endAngle ) );
                ctx.closePath();
                ctx.fillStyle = self.colors[ i ];
                ctx.fill();

                // 画每一个扇形的平分线
                ctx.beginPath();
                ctx.moveTo( self.x, self.y );
                ctx.lineTo( lineX, lineY );
                ctx.strokeStyle = self.colors[ i ];
                ctx.stroke();

                // 绘制文字
                if ( lineAngle >= 90 && lineAngle <= 270 ) {
                    ctx.textAlign = 'right';
                }else {
                    ctx.textAlign = 'left';
                }
                ctx.fillText( obj.msg, lineX, lineY );
            });
        }
    } );

    // 把构造函数暴露到全局
    w.Pipe = Pipe;

}( window ));
