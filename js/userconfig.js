var _0x5725=['src','traceMode','setNaver','1381640xVgOGl','잘못된\x20배율값입니다.\x20지속된다면\x20새로고침을\x20해주세요','100%','resultTag','좌표값을\x20설정해주세요','maps','progressBar','완료되었습니다.\x20아래에\x20생성된\x20링크를\x20확인하세요','href','toBlob','1661VsOzaW','setKakao','onload','390396KbbxQj','set','canvas','&center=','getNaver','checked','width','setMap','293ZsuTjj','21257AfLpJb','style','resultStatus','revokeObjectURL','lng','2Hwlbvd','340356KZNtVy','SKYVIEW','21UuCcxs','resultImage','satellite','get','height','사진\x20수집중입니다.\x20완료\x20문구를\x20기다려\x20주세요.','MapTypeId','Rectangle','lat','getElementById','basic','getBounds','value','210527TezMDr','&maptype=','getKakao','innerHTML','ROADMAP','https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?','3IAHKAd','299003Tbsjhz','toFixed','mapshot_result.jpg','innerText','createObjectURL'];var _0x4c6d=function(_0x531900,_0x5589c4){_0x531900=_0x531900-0xdd;var _0x572530=_0x5725[_0x531900];return _0x572530;};(function(_0x539b9f,_0x538237){var _0x4e6216=_0x4c6d;while(!![]){try{var _0x13b61f=-parseInt(_0x4e6216(0xe2))+-parseInt(_0x4e6216(0x10a))*parseInt(_0x4e6216(0x115))+-parseInt(_0x4e6216(0xf7))*parseInt(_0x4e6216(0xf8))+-parseInt(_0x4e6216(0xe1))*-parseInt(_0x4e6216(0xf1))+parseInt(_0x4e6216(0x10d))+parseInt(_0x4e6216(0x100))+parseInt(_0x4e6216(0xe4))*parseInt(_0x4e6216(0x116));if(_0x13b61f===_0x538237)break;else _0x539b9f['push'](_0x539b9f['shift']());}catch(_0x1a1bbc){_0x539b9f['push'](_0x539b9f['shift']());}}}(_0x5725,0xdf7f9));const zoomLevel=new ZoomController(),mapController=new MapTypeController();function MapTypeController(){var _0x598251=_0x4c6d,_0x129a8a=kakao[_0x598251(0x105)][_0x598251(0xea)][_0x598251(0xf5)],_0x2223a2;this[_0x598251(0x10b)]=function(_0x11ac89){var _0x4c3c0f=_0x598251;if(_0x11ac89==0x1)_0x129a8a=kakao[_0x4c3c0f(0x105)]['MapTypeId'][_0x4c3c0f(0xf5)];else{if(_0x11ac89==0x2)_0x129a8a=kakao[_0x4c3c0f(0x105)][_0x4c3c0f(0xea)][_0x4c3c0f(0xe3)];else{if(_0x11ac89==0x3)_0x129a8a=kakao[_0x4c3c0f(0x105)]['MapTypeId']['HYBRID'];else return;}}},this[_0x598251(0xf3)]=function(){return _0x129a8a;},this['setNaver']=function(_0x38a5a4){var _0x421703=_0x598251;if(_0x38a5a4==0x1)_0x2223a2=_0x421703(0xee);else{if(_0x38a5a4==0x2)_0x2223a2='satellite_base';else{if(_0x38a5a4==0x3)_0x2223a2=_0x421703(0xe6);else return;}}},this[_0x598251(0x111)]=function(){return _0x2223a2;};}function ZoomController(){var _0x19dcae=_0x4c6d,_0x5eb1c3;this[_0x19dcae(0x10e)]=function(_0x124cc6){(_0x124cc6==0x5||_0x124cc6==0x8)&&(_0x5eb1c3=_0x124cc6);},this[_0x19dcae(0xe7)]=function(){return _0x5eb1c3;};}function setZoomLevel(_0x2abe0e){zoomLevel['set'](_0x2abe0e);}function setBaseMap(_0x5f56b9){var _0x7baf55=_0x4c6d;mapController[_0x7baf55(0x10b)](_0x5f56b9),mapController[_0x7baf55(0xff)](_0x5f56b9);}function checkValue(){var _0x9f8fa2=_0x4c6d;if(!(zoomLevel[_0x9f8fa2(0xe7)]()==0x5||zoomLevel[_0x9f8fa2(0xe7)]()==0x8))return alert(_0x9f8fa2(0x101)),![];var _0x4b3b11=document['getElementById'](_0x9f8fa2(0xec))[_0x9f8fa2(0xf0)],_0x33dcf2=document[_0x9f8fa2(0xed)](_0x9f8fa2(0xe0))['value'];if(_0x4b3b11==''||_0x33dcf2=='')return alert(_0x9f8fa2(0x104)),![];return!![];}var url;function startCapture(){var _0x39b710=_0x4c6d;if(checkValue()){if(document[_0x39b710(0xed)](_0x39b710(0xfe))[_0x39b710(0x112)]){var _0x369d3c=new kakao[(_0x39b710(0x105))][(_0x39b710(0xeb))]({'bounds':rectangle[_0x39b710(0xef)](),'strokeWeight':0x4,'strokeColor':'#000000','strokeOpacity':0x1,'strokeStyle':'shortdot','fillColor':'#ecf4f3','fillOpacity':0.8});_0x369d3c[_0x39b710(0x114)](map);}var _0x10437d=0x0,_0x236ad7=0x0,_0x500078=document[_0x39b710(0xed)](_0x39b710(0xec))['value'],_0xe7d3a=document['getElementById']('lng')[_0x39b710(0xf0)],_0x49dc19=zoomLevel[_0x39b710(0xe7)]()*0x2+0x1,_0x43ef73=_0x49dc19*_0x49dc19,_0x1ab602=document['getElementById'](_0x39b710(0x10f));_0x1ab602['width']=Number(_0x49dc19)*0x1f4,_0x1ab602[_0x39b710(0xe8)]=Number(_0x49dc19)*0x1f4;var _0x29cbbb=_0x1ab602['getContext']('2d'),_0x2d0e5d=37.5668,_0x236dce=0.00002833,_0xf77793=(_0x2d0e5d-_0x500078)*_0x236dce,_0x75512f=0.00268,_0x481fff=0.002125+_0xf77793,_0x1861a7=Number(_0x500078)+Number(_0x481fff)*Number(zoomLevel['get']()),_0x10b3ac=Number(_0xe7d3a)-Number(_0x75512f)*Number(zoomLevel[_0x39b710(0xe7)]()),_0xd384ec=0x0,_0x21eb9e=0x0,_0x413733=0x64/_0x43ef73,_0x10baab=0x0,_0x567f02=document[_0x39b710(0xed)](_0x39b710(0x106));_0x567f02[_0x39b710(0xdd)]['width']=_0x10baab+'%',document[_0x39b710(0xed)]('resultStatus')['innerText']=_0x39b710(0xe9);url!=''&&URL[_0x39b710(0xdf)](url);for(var _0x27b41f=0x0;_0x27b41f<_0x49dc19;_0x27b41f++){for(var _0x24448e=0x0;_0x24448e<_0x49dc19;_0x24448e++){var _0x5a95e0=_0x39b710(0xf6)+'w=1000&h=1000'+_0x39b710(0x110)+_0x10b3ac+','+_0x1861a7+'&level=18'+'&X-NCP-APIGW-API-KEY-ID=ny5d4sdo0e'+_0x39b710(0xf2)+mapController[_0x39b710(0x111)](),_0x1dba80=new Image();_0x1dba80['crossOrigin']='*',_0x1dba80[_0x39b710(0xfd)]=_0x5a95e0,function(_0xe47720){var _0x390b6c=_0x39b710,_0x31a5b9=_0xe47720;_0x1dba80[_0x390b6c(0x10c)]=function(){var _0x16dfae=_0x390b6c;_0x10437d=_0x31a5b9%_0x49dc19*0x1f4,_0x236ad7=parseInt(_0x31a5b9/_0x49dc19)*0x1f4,_0x29cbbb['drawImage'](this,0x0,0x0,this[_0x16dfae(0x113)],this[_0x16dfae(0xe8)],_0x10437d,_0x236ad7,0x1f4,0x1f4),_0x10baab+=_0x413733,_0x567f02[_0x16dfae(0xdd)][_0x16dfae(0x113)]=parseFloat(_0x10baab)[_0x16dfae(0xf9)](0x2)+'%',_0x567f02['innerText']=parseFloat(_0x10baab)[_0x16dfae(0xf9)](0x2)+'%',_0x21eb9e++;};}(_0xd384ec),_0xd384ec++,_0x10b3ac+=Number(_0x75512f);}_0x10b3ac=Number(_0xe7d3a)-Number(_0x75512f)*Number(zoomLevel[_0x39b710(0xe7)]()),_0x1861a7-=_0x481fff;}var _0x5c94dd=setInterval(function(){var _0xec20e1=_0x39b710;_0x21eb9e==_0x43ef73&&(_0x1ab602[_0xec20e1(0x109)](function(_0x2b7475){var _0x520075=_0xec20e1,_0x3556bc=document[_0x520075(0xed)](_0x520075(0xe5));url=URL[_0x520075(0xfc)](_0x2b7475),_0x3556bc[_0x520075(0x10c)]=function(){var _0x3bdf83=_0x520075,_0x4783d7=document[_0x3bdf83(0xed)](_0x3bdf83(0xde));_0x4783d7[_0x3bdf83(0xfb)]=_0x3bdf83(0x107);var _0x1f5ca5=document[_0x3bdf83(0xed)](_0x3bdf83(0x103));_0x1f5ca5[_0x3bdf83(0x108)]=url,_0x1f5ca5[_0x3bdf83(0xf4)]=_0x3bdf83(0xfa),_0x29cbbb['clearRect'](0x0,0x0,_0x1ab602[_0x3bdf83(0x113)],_0x1ab602[_0x3bdf83(0xe8)]),_0x1ab602[_0x3bdf83(0x113)]=0x0,_0x1ab602[_0x3bdf83(0xe8)]=0x0,_0x567f02[_0x3bdf83(0xdd)][_0x3bdf83(0x113)]='100%',_0x567f02[_0x3bdf83(0xfb)]=_0x3bdf83(0x102);},_0x3556bc['src']=url;},'image/jpeg'),clearInterval(_0x5c94dd));},0x3e8);}}