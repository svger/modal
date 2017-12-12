## Modal
|属性|说明|类型|默认值|
|---|---|:--:|:----:|
|prefixCls|样式前缀，如`cefc-modal`,可用于自定义样式|string|无|
|header|Modal的头部|string &#124; node|无|
|type|Modal的类别，有alert和confirm两个值|string|confirm|
|content|Modal的提示内容|string &#124; element|无|
|confirmText|确认按钮的文字|string &#124; element|无|
|cancelText|取消按钮的文字|string|无|
|closeIcon|是否显示右上角的关闭图标|bool|true|
|disableConfirm|是否禁用确定按钮|bool|false|
|onConfirm|点击确定按钮的回调函数|func|无|
|onCancle|点击取消按钮的回调函数|func|无|
|onHide|Modal关闭的回调函数|func|无|
|className|外部传入类|string|无|
|isOpen|是否显示Modal|bool|true|

###使用方式
```
<Modal type="confirm" header="我是标题" content="我是内容" />
<Modal type="alert" header="标题" content="内容"/>
```
