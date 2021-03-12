# 皮肤文档

* 每种皮肤写在一个单独的文件夹中，名称和@jd/react-grace中的相应组件相同，文件名命名为index.scss

* 每个页面顶端要有一个自己的id，每个批复文件最顶层要引用这个id，id一般就是皮肤的主题，例如数坊主题的皮肤id是shu-fang则html写法为：
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>模板</title>
    </head>

    <body id='shu-fang'>
        <div id="main"> </div>
    </body>

    </html>
    ```
    皮肤.scss文件写法为：
    ```scss
    #shu-fang{
        // 在这里覆盖组件原始样式
    }
    ```
