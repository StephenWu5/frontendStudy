```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>css grid</title>
    <style>
        .container{
            /* 网格布局  */
            display: grid;

            /* 网格布局指定列的宽度  */
            grid-template-columns: 100px 100px auto minmax(40px, 50px) 100px;
            /*也可以使用单位 fr fr用于平分常用*/
            /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr; */
            grid-template-columns: repeat(auto-fill, 100px);
            /* 网格布局指定行的宽度  */
            /*grid-template-rows: repeat(5, 100px);*/
            grid-template-rows: repeat(auto-fill, 100px);
            /*grid-template-rows: repeat(5, 1fr);  */

            /* 表格的间距 */
            grid-gap: 20px 20px;
            /* 指定区域 */
            grid-template-areas: 'a b c'
                   'd e f'
                   'g h i';
            /*指定行列的顺序*/
            /*grid-auto-flow: row dense;*/
            grid-auto-flow: row;

            justify-content: end; 
            align-content: start;

            /*align-items : stretch;
            justify-items: stretch; */
            /*place-items属性是align-items属性和justify-items属性的合并简写形式。
            place-items: start end; */
        }
        
        .container .item{
            /* 指定这个区域在这个网格的开始结束位置哈 */
            grid-row-start: 1;
            grid-row-end: 2;
            grid-column-start: 1;
            /*grid-column-start: header-start;
            grid-column-start: span 2;*/
            grid-column-end: 2;
            /*grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。*/
            /*指定是哪个区域*/ 
            /* grid-area: e */

            /*justify-self 属性，
            align-self 属性，
            place-self 属性
            justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
            align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。*/
        }

        .container span{
            border: 1px solid #ccc;
            background-color: #ccc;

            /* 让内容垂直居中方法1   */
            display: grid;
            align-content: center;
            justify-content: center; 


            /* 让内容垂直居中方法2   */
            display: flex;
           justify-content:center;
           align-items:center; 
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="item">1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span> 
    </div>
</body>
</html>

```
