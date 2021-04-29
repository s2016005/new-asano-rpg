(function(_WIN,_DOC){
//Pluginize :　Iyokan https://twitter.com/iyokan_nico
//License: MIT License
//Original : http://jsdo.it/piayo/8U9b


	

	//▼設定
	var NAMESPACE = 'bookmark_bubble';//localStrage保存用key名
	var SAVE_DAY = 90;//保存日数
	var DIV_ID = 'SHORTCUT_AREA';//生成するDIVのID
	var AREA_HTML = "ゲームを快適に楽しむには、アプリ化が必要です。<br>このページを「ホーム画面に追加」してください</p>";
	//var AREA_HTML = "<img src='http://dummyimage.com/72x72/000/fff' alt=''><p>You can add this page to Home Screen by tapping the icon.</p>";
	//▲設定
	var isSave = ('localStorage' in window) || false;
	var isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	var isPAD = navigator.userAgent.match(/iPad/) ? true : false;
	//▼test------------
	//isIOS = true;//後で消す
	//isPAD = true;//後で消す
	//▲test------------
	var _makeCSS = function(){
		var css = [''];
		css.push('#'+ DIV_ID +'{cursor:pointer;',
		'position:fixed;z-index:100;width:600px;',
		'min-height:144px;padding:30px;background:#b0c8ec;line-height:1;font-size:36px;color:#000;text-align:left;',
		'border:6px solid #fff;-webkit-border-radius:24px;border-radius:24px;',
		'-webkit-box-shadow:0 0 18px rgba(0,0,0,0.6);box-shadow:0 0 18px rgba(0,0,0,0.6);',
		'-webkit-transition:all 0.6s linear;transition:all 1s ease-in-out;opacity:0;',
		'}');
		css.push('#'+ DIV_ID +'._phn{left:50%;margin-left:-330px;bottom:42px;margin-bottom:30px}');
		css.push('#'+ DIV_ID +'._pad{left:18px;top:42px;margin-top:30px}');
		css.push('#'+ DIV_ID +'._on{opacity:1;}');
		css.push('#'+ DIV_ID +'._phn._on{margin-bottom:0;}');
		css.push('#'+ DIV_ID +'._pad._on{margin-top:0;}');
        css.push('#'+ DIV_ID +'>img{position:absolute;left:0;top:0;margin:30px;width:144px;height:144px;}');
		css.push('#'+ DIV_ID +'>p{margin:0;padding-left:168px;line-height:1.4;}');
		//CLOSE丸
		css.push('#'+ DIV_ID +':before{',
		'display:block;position:absolute;right:-30px;top:-30px;width:60px;height:60px;border:6px solid #fff;background:#fff;',
		'line-height:60px;font-size:60px;color:#b0c8ec;text-align:center;border:6px solid #fff;',
		'-webkit-box-shadow:0 0 6px rgba(0,0,0,0.6);box-shadow:0 0 6px rgba(0,0,0,0.6);',
		'-webkit-border-radius:100%;border-radius:100%;content:"×"}');//×の文字:\2716,\2715
		//三角
		css.push('#'+ DIV_ID +':after{',
		'display:block;position:absolute;width:42px;height:42px;margin-left:-21px;left:50%;background:#b0c8ec;content:"";',
		'border-right:6px solid #fff;border-bottom:6px solid #fff;',
		'clip:rect(0,66px,66px,0);',
		'-webkit-box-shadow:6px 6px 9px rgba(0,0,0,0.3);box-shadow:6px 6px 9px rgba(0,0,0,0.3);',
		'}');
		
		css.push('#'+ DIV_ID +'._phn:after{bottom:-18px;-webkit-transform: rotate(45deg);transform: rotate(45deg);}');
		css.push('#'+ DIV_ID +'._pad:after{top:-18px;-webkit-transform: rotate(-135deg);transform: rotate(-135deg);}');
		css = css.join('');
		var head = document.querySelectorAll('head')[0];
		var style = document.createElement("style");
		style.type = "text/css";
		style.rel = "stylesheet";
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	};
	var initPopIcon = function(){
		var old = document.querySelector('#'+ DIV_ID);
		if(old){ old.parentNode.removeChild(old); }
		if(isSave && isIOS && !window.navigator.standalone){
			var _now = new Date().getTime();
			if(!localStorage.hasOwnProperty(NAMESPACE) || !localStorage.getItem(NAMESPACE) || (parseInt(localStorage.getItem(NAMESPACE))+(SAVE_DAY*86400000)) < _now ){
				_makeCSS();
				var SHORTCUT_AREA = _DOC.createElement("div");
				SHORTCUT_AREA.id = DIV_ID;
				SHORTCUT_AREA.innerHTML = AREA_HTML;
				if(isPAD){
					SHORTCUT_AREA.classList.add("_pad");
				}else{
					SHORTCUT_AREA.classList.add("_phn");
				}
				SHORTCUT_AREA.addEventListener('click',function(e){
					localStorage.setItem(NAMESPACE, _now);
					e.currentTarget.removeEventListener('click', arguments.callee, false);
					SHORTCUT_AREA.parentNode.removeChild(SHORTCUT_AREA);
				}, false);
				_DOC.body.appendChild(SHORTCUT_AREA);
				var t = setTimeout(function(){ SHORTCUT_AREA.classList.add("_on"); },500);
			}
		}
	}
	if(_WIN.addEventListener){
		_WIN.addEventListener('load', initPopIcon, false);
	}
    
    //localStrage削除用
    clearLS = function(){
        localStorage.removeItem(NAMESPACE);
        console.log("NAMESPACE("+NAMESPACE+")は消えました...");
    };
    

    
})(window, document);