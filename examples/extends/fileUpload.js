/**
 * chenyouhong 2019.06.17
 */
layui.define(
    ['form', 'table', 'upload', 'admin'],
    function (exports) {
      "use strict";
      var $           = layui.jquery,
          form        = layui.form,
          upload = layui.upload;
      let minWidth = 70;
      
      
      function calculateHeight(code) {
        //计算高度
        let height = $('#file-body-' + code).height();
        let lableHeight = $('#file-lable-' + code).height();
        let top = (height - lableHeight - 20) / 2.0;
        $('#file-lable-' + code).css('top', top);
      }
      
      var api = {
        init: function (option) {
          if (option.items && option.items.length > 0) {
            var _imgUrl = option.imgUrl || "";
            var _originalUrl = option.originalUrl || "";
            var _max = 5;
            var $module = {};
            var $max = {};
            
            var deleteFile = [];
            
            var html = '';
            layui.each(option.items, function (index, item) {
              $max[item.code] = _max;
              var isNeed = '';
              if (item.isNeed == '1') {
                isNeed = '<span class="xingxing">*</span>';
              }
              var imgSize = '';
              var uploadSize = '';
              if (item.width && item.height) {
                imgSize += 'style="width:' + item.width + 'px; height:' + item.height + 'px; line-height:' + item.height + 'px;"';
                uploadSize += 'style="line-height:' + item.height + 'px;"';
              }
              html += '<div class=" layui-col-xs12 layui-col-md12">' +
                  '        <label class="layui-form-label" id="file-lable-' + item.code  + '">' + isNeed + item.name + '</label>' +
                  '        <div style="padding: 0;" class="layui-card-body layui-input-block" id="file-body-' + item.code  + '">' +
                  '          <div ' + imgSize + ' class="layui-upload-drag layui-upload-img file-upload-img file-upload-disabled-' + item.code + '"id="file-upload-' + item.code  + '">' +
                  '            <i ' + uploadSize + 'class="layui-icon file-upload-icon"></i>' +
                  '          </div>' +
                  '        </div>' +
                  '      </div>';
            });
            $(option.view).html(html);
            
            layui.each(option.value, function (index, item) {
              if ($module[item.code]) {
                $module[item.code][item.key] = item.key;
              } else {
                $module[item.code] = {};
                $module[item.code][item.key] = item.key;
              }
              
              var result;
              var fileNameTag = '';
              if (item.type == undefined || item.type == '') {
                item.type = 'image';
              }
              if (item.type.indexOf('image') == -1) {
                result = 'http://localhost:8080' + 'style/res/file-icon.png';
                fileNameTag = '<span class="file-name">' + item.fileName + '</span>';
              } else {
                result = _imgUrl + item.key;
              }
              
              var imgSize = '';
              var operation = '';
              layui.each(option.items, function (idx, ele) {
                if (ele.code == item.code && ele.width && ele.height) {
                  if (ele.width < minWidth) {
                    operation = 'layui-hide';
                  }
                  imgSize += 'style="width:' + ele.width + 'px; height:' + ele.height + 'px;"';
                  return false;
                }
              });
              
              $('#file-upload-' + item.code).before(['<div ' + imgSize + ' data-type=' + item.type + ' class="file-upload file-upload-' + item.code + '">',
                '<img class="layui-upload-img preview" ' + imgSize + ' layadmin-event="preview" data-type=' + item.type + ' data-original="' + _originalUrl + item.key + '" src=' + result + '>',
                '<input type="hidden" data-type="' + item.type + '" data-file-name="' + item.fileName + '" data-idx="' + item.key + '" name="' + item.code + '" value="' + item.key + '">',
                '<div class="file-delete" ><span class="delete-one"> ',
                '<i class="fa fa-undo ' + operation + '"></i>',
                '<i class="fa fa-repeat ' + operation + '"></i>',
                '<i class="fa fa-trash-o"></i></span></div>',
                fileNameTag + '</div>'].join(""));
            });
            
            //不可上传图片时删除上传button
            layui.each(option.items, function (index, item) {
              if (item.disabled) {
                let $upload = $('.file-upload-disabled-' + item.code);
                $upload.remove();
              }
              
              //初始剩余上传张数
              layui.each($module, function (idx, ele) {
                if (idx == item.code) {
                  $max[item.code] = $max[item.code] - Object.keys(ele).length;
                }
              });
            });
            
            //计算高度
            layui.each(option.items, function (index, item) {
              calculateHeight(item.code);
            });
            
            layui.each(option.items, function (index, item) {
              if (item.disabled) {
                let $files = $('.file-upload-' + item.code);
                layui.each($files, function (idx, file) {
                  let $file = $(file);
                  let type = $file.data('type');
                  if (type.indexOf('image') == -1 || item.width < minWidth) {
                    $file.find('.file-delete').remove();
                  } else {
                    $file.find('.fa-trash-o').remove();
                  }
                });
              } else {
                let max = item.max ? item.max : _max;
                let acceptMime = 'file';
                if (item.format != '') {
                  acceptMime = '.' + item.format;
                  acceptMime = acceptMime.replace(/,/g,",.");
                }
                upload.render({
                  elem: '#file-upload-' + item.code,
                  url: 'http://localhost:8080' + '/upload/**',
                  accept: 'file',
                  acceptMime: acceptMime,
                  multiple: item.multiple ? item.multiple : false,
                  // number: 1,
                  choose: function (obj) {
                    // let fileCount = Object.keys(obj.pushFile()).length;
                    // debugger
                    // console.log(obj.upload.length);
                    // console.log("======");
                    
                    //读取本地文件
                    // obj.preview(function (index, file, result) {
                    //   console.log("======");
                    // debugger
                    // $module[item.code] = $module[item.code] ? $module[item.code] + 1 : 1;
                    //
                    // var fileNameTag = '';
                    // if (file.type.indexOf('image') == -1) {
                    //   result = ""http://localhost:8080"" + 'style/res/file-icon.png';
                    //   fileNameTag = '<span class="file-name">' + file.name + '</span>';
                    // }
                    //
                    // $('#file-upload-' + item.code).before(['<div data-type=' + file.type + ' + id=' + index + ' class="file-upload layui-hide">',
                    // '<img class="layui-upload-img preview" layadmin-event="preview" data-type=' + file.type + ' + src=' + result + '>',
                    // '<input type="hidden" data-type="' + file.type + '" data-file-name="' + file.name + '" name="' + item.code + '">',
                    // '<div class="file-delete" ><span class="delete-one"> ',
                    // '<i class="fa fa-undo"></i>',
                    // '<i class="fa fa-repeat"></i>',
                    // '<i class="fa fa-trash-o"></i></span></div>',
                    // fileNameTag + '</div>'].join(""));
                    // });
                    
                  },
                  before: function (obj) {
                    var files = obj.pushFile();
                    
                    layui.each(deleteFile, function (idx, ele) {
                      delete files[ele];
                    });
                    
                    if (!$module[item.code]) {
                      $module[item.code] = {};
                    }
                    
                    let set = new Set();
                    layui.each(files, function (idx, ele) {
                      set.add(idx);
                    })
                    layui.each($module[item.code], function (idx, ele) {
                      set.add(idx);
                    })
                    
                    let temp = files;
                    // let fileCount = Object.keys($module[item.code]).length + Object.keys(temp).length ;
                    let fileCount = set.size;
                    
                    if (max < fileCount) {
                      layer.msg('最多上传' + max + '张!');
                      layui.each(temp, function (idx, ele) {
                        delete files[idx];
                      })
                      return false;
                    }
                    
                    layui.each(files, function (idx, ele) {
                      $module[item.code][idx] = ele;
                    })
                    
                    obj.preview(function (index, file, result) {
                      var fileNameTag = '';
                      if (file.type.indexOf('image') == -1) {
                        result = 'http://localhost:8080' + 'style/res/file-icon.png';
                        fileNameTag = '<span class="file-name">' + file.name + '</span>';
                      }
  
                      var imgSize = '';
                      var operation = '';
                      if (item.width && item.height) {
                        imgSize += 'style="width:' + item.width + 'px; height:' + item.height + 'px"';
                        if (item.width < minWidth) {
                          operation = 'layui-hide';
                        }
                      }
                      $('#file-upload-' + item.code).before(['<div ' + imgSize + ' data-type=' + file.type + ' + id=' + index + ' class="file-upload layui-hide">',
                        '<img class="layui-upload-img preview" ' + imgSize + ' layadmin-event="preview" data-type=' + file.type + ' + src=' + result + '>',
                        '<input type="hidden" data-type="' + file.type + '" data-file-name="' + file.name + '" data-idx="' + index + '" name="' + item.code + '">',
                        '<div class="file-delete" ><span class="delete-one"> ',
                        '<i class="fa fa-undo ' + operation + '"></i>',
                        '<i class="fa fa-repeat ' + operation + ' "></i>',
                        '<i class="fa fa-trash-o"></i></span></div>',
                        fileNameTag + '</div>'].join(""));
                    });
                    
                    // this.data = $.extend({'seqNo': layui.util.getUUID(32, 16)}, layui.setter.uploadImg);
                  },
                  // allDone: function(obj, oo, tt){ //当文件全部被提交后，才触发
                  //
                  //   console.log(obj.total); //得到总文件数
                  //   console.log(obj.successful); //请求成功的文件数
                  //   console.log(obj.aborted); //请求失败的文件数
                  // },
                  done: function(res, index) {
                    let $element = $('#' + index);
                    let fileType = $element.data('type');
                    $element.removeClass('layui-hide');
                    calculateHeight(item.code)
                    
                    $element.find('img').data('original', _originalUrl + res.data.key);
                    $element.find('input').val(res.data.key);
                    let $body = $('#file-body-' + item.code);
                    if (Object.keys($module[item.code]).length >= max) {
                      $body.find('.layui-upload-drag').hide();
                    }
                    
                    if (fileType.indexOf('image') != -1) {
                      $element.find('img').attr('src', _imgUrl + res.data.key);
                    } else {
                      $element.find('img').attr('src', 'http://localhost:8080' + 'style/res/file-icon.png');
                    }
                  }
                });
              }
            });
            
            //操作栏显示
            $(option.view).on("mouseover", ".file-upload", function () {
              let $this = $(this);
              let type = $this.data('type');
              if (type.indexOf('image') == -1) {
                $this.find(".fa-undo").hide();
                $this.find(".fa-repeat").hide();
              }
              $this.find(".file-delete").css("height", "30px");
            });
            
            $(option.view).on("mouseout", ".file-upload", function () {
              $(this).find(".file-delete").css("height", "0px");
            });
            
            //文件删除
            $(option.view).on("click", ".delete-one .fa-trash-o", function () {
              let $this = $(this);
              let $file = $this.parents('.file-upload');
              let id = $file.attr('id');
              $file.parent().find('.layui-upload-drag').show();
              let code = $file.find('input').attr('name');
              let idx = $file.find('input').data('idx');
              delete $module[code][idx];
              deleteFile.push(idx);
              // layui.each($file[code], function (index, value) {
              //   if (index == idx) {
              //     delete $file[code][idx];
              //   }
              // })
              $this.parents(".file-upload").remove();
              // let module = $module[code];
              // $module[code] = $module[code] - 1;
              calculateHeight(code);
            });
            
            //上传张数限制  暂时未用
            $(option.view).on("click", ".delete-list .fa-trash-o", function () {
              var id = $(this).parents(".layui-upload-list").attr('id');
              if (id) {
                id = id.substring(0, 32);
                $('#' + id).attr('disabled', false);
                $('#' + id).removeClass('layui-btn-disabled');
              }
              $(this).parents(".file-div").remove();
            });
            
            //左转
            $(option.view).on("click", ".fa-undo", function () {
              var currentRetate = $(this).parents(".file-upload").find("img").attr("currentRetate") || 0;
              currentRetate = currentRetate - 90;
              $(this).parents(".file-upload").find("img").css("transform", "rotate(" + currentRetate + "deg)")
                  .attr("currentRetate", currentRetate);
              
            });
            //右转
            $(option.view).on("click", ".fa-repeat", function () {
              var currentRetate = $(this).parents(".file-upload").find("img").attr("currentRetate") || 0;
              currentRetate = parseInt(currentRetate) + 90;
              $(this).parents(".file-upload").find("img").css("transform", "rotate(" + currentRetate + "deg)")
                  .attr("currentRetate", currentRetate);
            });
            
          }
        },
        getKeys: function() {
          let files = [];
          let $files = $('.file-upload');
          layui.each($files, function (index, item) {
            let $input = $(item).find('input');
            let ele = {};
            ele.imgCode = $input.attr('name');
            ele.imgKey = $input.val();
            files.push(ele);
          });
          
          return files;
        },
        getMapKeys: function() {
          let files = {};
          let $files = $('.file-upload');
          layui.each($files, function (index, item) {
            let $input = $(item).find('input');
            let code = $input.attr('name');
            if (files[code] == undefined) {
              let items = [];
              items.push($input.val());
              files[code] = items;
            } else {
              files[code].push($input.val());
            }
          });
          
          return files;
        },
        getMapFiles: function() {
          let files = {};
          let $files = $('.file-upload');
          layui.each($files, function (index, item) {
            let $input = $(item).find('input');
            let code = $input.attr('name');
            let ele = {};
            ele.type = $input.data('type');
            ele.imgKey = $input.val();
            ele.fileName = $input.data('file-name');
            ele.imgCode = code;
            
            if (files[code] == undefined) {
              var items = [];
              items.push(ele);
              files[code] = items;
            } else {
              files[code].push(ele);
            }
          });
          
          return files;
        },
        getFiles: function() {
          let files = [];
          let $files = $('.file-upload');
          layui.each($files, function (index, item) {
            let $input = $(item).find('input');
            let code = $input.attr('name');
            let ele = {};
            ele.type = $input.data('type');
            ele.imgKey = $input.val();
            ele.fileName = $input.data('file-name');
            ele.imgCode = code;
            files.push(ele);
          });
          
          return files;
        }
      }
      
      //查看图片
      // layui.admin.events.preview = function(othis){
      //   let type = othis.data('type');
      //   let thisOriginal = othis.data('original');
      //   if (type.indexOf('image') == -1) {
      //     window.open(thisOriginal);
      //   } else {
      //     var $preview = othis.parent().parent().find(".preview");
      //     var items = [];
          
      //     var previous = [];
      //     var rears = [];
          
      //     var idx = 0;
      //     layui.each($preview, function (index, item) {
      //       let fileType = $(item).data('type');
      //       if (fileType.indexOf('image') >= 0) {
      //         let original = $(item).data('original');
      //         if (original == thisOriginal) {
      //           idx = index;
      //           items.push({"src": original});
      //         }
      //       }
      //     });
          
      //     layui.each($preview, function (index, item) {
      //       let fileType = $(item).data('type');
      //       if (fileType.indexOf('image') >= 0) {
      //         let original = $(item).data('original');
      //         if (index > idx) {
      //           rears.push({"src": original});
      //         } else if (index < idx) {
      //           previous.push({"src": original});
      //         }
      //       }
      //     });
          
      //     items = items.concat(rears);
      //     items = items.concat(previous);
          
      //     layer.photos({
      //       photos: {
      //         "title": "查看图片" //查看图片
      //         , "data": items
      //       }
      //       , shade: 0.01
      //       , closeBtn: 1
      //       , anim: 5
      //     });
      //   }
      // };
      
      exports('fileUpload', api)
    }
);
