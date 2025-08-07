//document.getElementById("gamename").innerHTML = gamename;
document.getElementById("gamelink").src = webServer+gameiframe;
var winWidth = 0;
var winHeight = 0;
var viewable_width = 0;
var viewable_height = 0;

function is_weixn(){  
	var ua = navigator.userAgent.toLowerCase();  
	if(ua.match(/MicroMessenger/i)=="micromessenger") {  
		return true;  
	}else {  
		return false;  
	}  
}

function check_mobile(){
	var ua = navigator.userAgent;ua = ua ? ua.toLowerCase().replace(/-/g, "") : "";
	if((/4399GameCenter/gi).test(ua)){return "guest4399";}
	if (ua.match(/(Android)/i)){return "android";}
	if (ua.match(/(iPhone|iPod)/i)){return "iphone";}
	if (ua.match(/(iPad)/i)){return "ipad";}
	//UC Browser
	if (ua.match(/(U;)/i)){if (ua.match(/(Adr)/i)){return "android";}}
	if (ua.match(/(U;)/i)){if (ua.match(/(iPh)/i)){return "iphone";}}
	if (ua.match(/(U;)/i)){if (ua.match(/(iPd)/i)){return "ipad";}}
}

function moregame(){
	if(check_mobile()=="android" || check_mobile()=="iphone" || check_mobile()=="ipad"){
		window.location.href = "http://h.4399.com/";
	}
}

function findDimensions(){
	//��ȡ���ڿ��
	if (window.innerWidth)
	winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
	winWidth = document.body.clientWidth;
	//��ȡ���ڸ߶�
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	//����ʾ����ߴ�
	viewable_width = parseInt(winWidth);
	viewable_height = parseInt(winHeight);
	if(viewable_width>0 && viewable_height>0){
		document.getElementById("gamelink").width = viewable_width+"px";
		document.getElementById("gamelink").height = viewable_height+"px";
		if(isblack==1 && isloading==0){
			//��λ����ͼƬ
			document.getElementById("loading").style.display = "block";
			var realh = viewable_width*296/548;
			if(realh>viewable_height){
				realh = viewable_height;
			}
			var imgtop = parseInt((viewable_height-realh-40)/2);
			document.getElementById("img").style.top = imgtop+"px";
		}
	}
	//��������Ӧ
	if(hashtml5FinishTrip){
		var pop = document.getElementById('pop');
		if(pop.style.display=="block"){
			var shadow = document.getElementById('shadow');
			pop.style.left = parseInt((viewable_width - 280)/2)+"px";
			pop.style.top = parseInt((viewable_height - 160)/2)+"px";
		}
	}
	if(is_weixn() || check_mobile()=="guest4399"){
		
	}else{
		checkorientation();
	}
}

//�жϷ���
function getorientation(){
	if(window.orientation==180||window.orientation==0){//���� 1
		return 2;
	}else if(window.orientation==90||window.orientation==-90){//���� 0
		return 1;
	}
}

function checkorientation(){
	if(html5orientation==1 && getorientation()==2){
		openWin2("show","�������ʼ��Ϸ<a href='http://v.4399pk.com/h5/h5howto.htm' style='text-decoration:underline;height:16px;line-height:16px;float:right;margin:15px 0;display:block;margin-right:20px;font-size:15px;color:#999;vertical-align:top;'><img src='/images/jt.gif' style='height:16px;position:relative;top:0px;right:2px;vertical-align:top;'>��ο�������?</a>");
	}else if(html5orientation==2 && getorientation()==1){
		openWin2("show","��������ʼ��Ϸ<a href='http://v.4399pk.com/h5/h5howto.htm' style='text-decoration:underline;height:16px;line-height:16px;float:right;margin:15px 0;display:block;margin-right:20px;font-size:15px;color:#999;vertical-align:top;'><img src='/images/jt.gif' style='height:16px;position:relative;top:0px;right:2px;vertical-align:top;'>��ο�������?</a>");
	}else{
		closetrip();
	}
}

//���ú�������ȡ��ֵ
var isloading = 0;
findDimensions();
//window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", findDimensions, false);
window.onorientationchange = findDimensions;
window.onresize = findDimensions;
if(isblack==1){setTimeout(function(){document.getElementById("loading").style.display="none";isloading=1;},5000);}

//΢�ŷ���
var title = document.title;
var loadScript = function(url, callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	if (script.readyState) {
		script.onreadystatechange = function() {
			if (script.readyState == "loaded" || script.readyState == "complete") { 
				script.onreadystatechange = null;
				callback(); 
			}
		};
	} else {
		script.onload = function() { callback(); }; 
	}
	document.body.appendChild(script);
};
function shareApiOld(title,desc,img,url){
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.on('menu:share:appmessage', function (argv) {
			WeixinJSBridge.invoke('sendAppMessage', {
				'img_url': img,
				'img_width': '640',
				'img_height': '640',
				'link': url,
				'desc': desc,
				'title': title
			}, function (res) {closeshare();});
		});
		WeixinJSBridge.on('menu:share:timeline', function (argv) {
			WeixinJSBridge.invoke('shareTimeline', {
				'img_url': img,
				'img_width': '640',
				'img_height': '640',
				'link': url,
				'desc': desc,
				'title': title
			}, function (res) {closeshare();});
		});
	}, false);
}
function jsApiShare(title,desc,img,url){
	loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js',function(){
		loadScript('http://huodong3.4399.com/weixin/jsapi/microMessagerShareH5.php?r='+Math.random(),function(){
			wxApiConfig.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
			wx.config(wxApiConfig);
			wx.ready(function(){
				var shareData = {
					title: title,
					desc: desc,
					link: url,
					imgUrl: img,
					success: function(){},
					cancel: function(){}
				}
				//alert(shareData.desc);
				wx.onMenuShareAppMessage(shareData);
				wx.onMenuShareTimeline(shareData);
			});
		});
	});
}

function WXshare(title,url,desc,img){
	var a = navigator.userAgent;
	if(a.indexOf('MicroMessenger')>-1){
		var _match = a.match(/MicroMessenger\/([0-9\.]+)/);
		var version = _match[1];
		if(version>'6'){
			jsApiShare(title,desc,img,url);			
		}
		else{
			shareApiOld(title,desc,img,url);
		}
	}
}
if(is_weixn() == true){WXshare(title,WXurl,WXmsg,WXimg);}

//��Ϸ�����ص�����
function __4399finishgame(note){
	if(is_weixn() == true){//������΢���в���Ч
		// ��Ϸ��ʹ��{name},����ʹ��{score},��������ʹ��{rank},սʤ��ʹ��{percent} 
		var html5FinishTrips = html5FinishTrip.replace('{name}',gamename).replace('{score}',note);
		openWin("show",html5FinishTrips);
		//WXshare(title,WXurl,html5FinishTrips,WXimg);
		WXshare(html5FinishTrips,WXurl,title,WXimg);//ֱ���޸ı���
	}
}

function openWin(flag,note) {
	var pop = document.getElementById('pop');
	var shadow = document.getElementById('shadow');
	if (flag == 'show') {
		pop.style.left = parseInt((viewable_width - 280)/2)+"px";
		pop.style.top = parseInt((viewable_height - 250)/2)+"px";
		pop.style.display = 'block';
		shadow.style.display = 'block';
	}else{
		pop.style.display = 'none';
		shadow.style.display = 'none';
	}
	if(note){
		note = '<center><img width="171" height="44" src="/images/word.png"></center>' + note;
		document.getElementById("html5FinishTrip").innerHTML = note;
	}
}

function openWin2(flag,note) {
	var pop = document.getElementById('pop2');
	var shadow = document.getElementById('shadow');
	if (flag == 'show') {
		pop.style.left = parseInt((viewable_width - 280)/2)+"px";
		pop.style.top = parseInt((viewable_height - 156)/2)+"px";
		pop.style.display = 'block';
		shadow.style.display = 'block';
	}else{
		pop.style.display = 'none';
		shadow.style.display = 'none';
	}
	if(note){
		note = '<center><img width="171" height="44" src="/images/word.png" style="margin-bottom:7px;"><br>'+note+'</center>';
		document.getElementById("message").innerHTML = note;
	}
}

function showshare(){
	document.getElementById('share').style.display = 'block';
	document.getElementById('pop').style.display = 'none';
}

function closeshare(){
	document.getElementById('share').style.display = 'none';
	document.getElementById('shadow').style.display = 'none';
}

function resumeGame(){
	document.getElementById('pop').style.display = 'none';
	document.getElementById('shadow').style.display = 'none';
}

function closetrip(){
	document.getElementById('pop2').style.display = 'none';
	document.getElementById('shadow').style.display = 'none';
}