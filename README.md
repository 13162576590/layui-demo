# layui-demo
layui demo

基于layui上传二次封装,修改layui源码实现放弃上传,确保上传接口能通，否则图片不会反显

layui_demo文件上传/layui-demo/examples/upload.html

demo效果图

![image](https://github.com/13162576590/layui-demo/blob/master/demo.png?raw=true)

一、	文件上传组件

setter.testApi = “http://localhost:8080”

1.引入css文件

```
<link rel="stylesheet" href="../src/css/layui.css">

<link rel="stylesheet" href="../src/css/upload.css">

<link rel="stylesheet" href="../src/css/font-awesome.min.css">
```

2.引入js

  layui.extend({fileUpload: '../lib/extend/fileUpload'})

3.定义组件容器

  <div class="layui-col-md12" id="file-view">
  </div>

4.初始化组件

```
	fileUpload.init({
		view: '#file-view', //容器id
		items: imgConfig, //配置json
		url: setter.testApi + '/upload/', //上传url
		imgUrl: setter.testApi + '/image/100/200/', //缩略图
		originalUrl: setter.testApi + '/image/0/0/', //原图
		value: items //返显初始参数
	});
```

(1)配置信息imgConfig格式

```
    //json格式
    [
      {
        "code": "Business_license",
        "size": 20480,
        "isNeed": "0",
        "name": "营业执照",
        "format": "jpg,png,txt,doc,pdf",
        "disabled": false
      }
   ]
```


(2)返显初始参数items格式
```
	//json格式 
	[
		{
			"code": "Business_license",
			"key": "b4141e9e-f8a4-482c-92ea-3b4b063e4c56,
			"type": "image/*",
			"fileName": "营业执照"
		}
	] 
```

5.API方法

(1) getKeys
    获取上传文件提交参数，得到一个List,返回格式如下:
```
	[{
		"imgCode": "Business_license",
		"imgKey": "b4141e9e-f8a4-482c-92ea-3b4b063e4c56"
		},{
		"imgCode": "Business_license",
		"imgKey": "9c327e7d-0c6b-4367-bbdb-0785cf046c4f"
		},{
		"imgCode": "sf_agreement",
		"imgKey": "82de629a-0d58-4bd2-996c-e56f1d2b9104"
	}]
```

(2) getMapKeys
    获取上传文件提交参数，得到一个Map,返回格式如下:
```
	{
	  "Business_license": [
	         "b4141e9e-f8a4-482c-92ea-3b4b063e4c56",
	         "9c327e7d-0c6b-4367-bbdb-0785cf046c4f"
	  ],
	  "sf_agreement": [
	         "82de629a-0d58-4bd2-996c-e56f1d2b9104"
	  ]
	}
```

(3) getFiles
    获取上传文件提交参数，得到一个List,返回格式如下:

```
	[
	  {
	         "type": "image",
	         "imgKey": "b4141e9e-f8a4-482c-92ea-3b4b063e4c56",
	         "fileName": "Ci5Kg1o8q6eATvmPAAB4Gu0YeL4846.jpg",
	         "imgCode": "Business_license"
	  },{
	         "type": "word",
	         "imgKey": "9c327e7d-0c6b-4367-bbdb-0785cf046c4f",
	         "fileName": "Ci5Kg1o8q6eATvmPAAB4Gu0YeL4846.jpg",
	         "imgCode": "Business_license"
	  },{
	         "type": "html",
	         "imgKey": "82de629a-0d58-4bd2-996c-e56f1d2b9104",
	         "fileName": "Ci5Kg1o8q6eATvmPAAB4Gu0YeL4846.jpg",
	         "imgCode": "sf_agreement"
	  }
	]
```

(4) getMapFiles
    获取上传文件提交参数，得到一个Map,返回格式如下:
```
	{
		"Business_license": [{
			"type": "image",
			"imgKey": "b4141e9e-f8a4-482c-92ea-3b4b063e4c56",
			"fileName": "Ci5Kg1o8q6eATvmPAAB4Gu0YeL4846.jpg",
			"imgCode": "Business_license"
		},{
			"type": "word",
			"imgKey": "9c327e7d-0c6b-4367-bbdb-0785cf046c4f",
			"fileName": "Ci5Kg1o8q6eATvmPAAB4Gu0YeL4846.jpg",
			"imgCode": "Business_license"
		}],
		"sf_agreement": [{
			"type": "html",
			"imgKey": "82de629a-0d58-4bd2-996c-e56f1d2b9104",
			"fileName": "Ci5Kg1o8q6eATvmPAAB4Gu0YeL4846.jpg",
			"imgCode": "sf_agreement"
		}]
	}
```

详细API接口使用,见"文件上传文档"




