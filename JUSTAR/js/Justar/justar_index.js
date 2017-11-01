window.onload = function(){
	var slide_box = document.getElementById('slide_box');
	var slide_items = slide_box.children;
	var dots_box = document.getElementById('dots_box');
	var dots_items = dots_box.children;
	// 获取时间
	function createToday(){
		var date = new Date();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var year = date.getFullYear();
		var time = [];
		time.push(month);
		time.push(day);
		time.push(year);
		var today_date = time.join('.');
		return today_date;
	}
	var today = document.getElementById('today');
	today.innerHTML = createToday();
	// 控制顶部背景图位置和导航条的固定
	var search = document.getElementById('search');
	var search_h = search.offsetHeight;
	var top = document.getElementById('top');
	var top_h = top.offsetHeight;
	var scroll_y = search_h + top_h;
	var menu = document.getElementById('menu');	
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	var wemet = document.getElementById('wemet');
	var go_top = document.getElementById('go_top');
	if(t<350){
		for(var i=0;i<slide_items.length;i++){
			slide_items[i].style.backgroundPosition = 'center -' + (t) + 'px';
		}		
	}else {
		for(var i=0;i<slide_items.length;i++){
			slide_items[i].style.backgroundPosition = 'center -350px';
		}
	}	
	if(t < scroll_y) {
		wemet.style.marginTop = 0;
		menu.style.position = 'static';
		go_top.style.display = 'none';
	}else{
		menu.style.position = 'fixed';
		menu.style.left = '0';
		menu.style.top = '0';
		menu.style.zIndex = '9999';
		wemet.style.marginTop = '92px';
		go_top.style.display = 'block';
	}
	window.onscroll = function(){
		search_h = search.offsetHeight;
		top_h = top.offsetHeight;
		scroll_y = search_h + top_h;
		t = document.documentElement.scrollTop || document.body.scrollTop;
		if(t < 350){
			for(var i=0;i<slide_items.length;i++){
				slide_items[i].style.backgroundPosition = 'center -' + (t) + 'px';
			}
		}
		if(t < scroll_y) {
			wemet.style.marginTop = 0;
			menu.style.position = 'static';
			go_top.style.display = 'none';
		}else{
			menu.style.position = 'fixed';
			menu.style.left = '0';
			menu.style.top = '0';
			menu.style.zIndex = '9999';
			wemet.style.marginTop = '92px';
			go_top.style.display = 'block';
		}
	}
	// 动态创建焦点
	function createDots(){
		var dots_box = document.getElementById('dots_box');
		for(var i=0;i<slide_items.length;i++){
			var li = document.createElement('li');
			li.className = 'dots-items dots-item' + (i+1);
			dots_box.appendChild(li);
		}
		dots_items[0].classList.add('dots-current');
	}
	createDots();
	// 点击焦点切换轮播图
	for(var i=0;i<dots_items.length;i++){
		dots_items[i].index = i;
		dots_items[i].onclick = function(){
			clearInterval(img_timer);
			for(var j=0;j<dots_items.length;j++){
				dots_items[j].className = 'dots-items dots-item' + (j+1);
				slide_items[j].classList.remove('slide-current');
			}
			this.classList.add('dots-current');
			slide_items[this.index].classList.add('slide-current');
			var timer = setTimeout(function(){
				clearInterval(img_timer);
				img_timer = setInterval(slideShow,4000);
				clearTimeout(timer);
			},4000);
		}
	}
	// 改变焦点函数
	function changeCurrent(name){
		var obj = document.getElementsByClassName(name);
		for(var i=0;i<obj.length;i++){
			// obj[i].index = i;
			obj[i].onclick = function(){
				for(var j=0;j<obj.length;j++){
					obj[j].classList.remove(name + '-current');
				}
				this.classList.add(name + '-current');
			}
		}
	}
	changeCurrent('nav-item');
	// 图片轮播
	function slideShow(){
		for(var i=0;i<slide_items.length;i++){
			if(slide_items[i].classList.contains('slide-current')){
				if(i+1<slide_items.length){
					slide_items[i].classList.remove('slide-current');
					slide_items[i+1].classList.add('slide-current');
					break;
				}else{
					slide_items[i].classList.remove('slide-current');
					slide_items[0].classList.add('slide-current');
					break;
				}
			}
		}
		for(var i=0;i<dots_items.length;i++){
			if(dots_items[i].classList.contains('dots-current')){
				if(i+1<dots_items.length){
					dots_items[i].classList.remove('dots-current');
					dots_items[i+1].classList.add('dots-current');
					break;
				}else{
					dots_items[i].classList.remove('dots-current');
					dots_items[0].classList.add('dots-current');
					break;
				}
			}
		}
	}
	// 鼠标移入关闭轮播图定时器，移出开启该定时器
	var img_timer = setInterval(slideShow,4000);
	top.onmouseenter = function(){
        clearInterval(img_timer);
        top.style.cursor = 'pointer';
    }
    top.onmouseleave = function(){
        clearInterval(img_timer);
        img_timer = setInterval(slideShow,4000);
    }
    // 切换导航栏显示或隐藏（当浏览窗口较小时，导航栏隐藏）
    var nav_toggle = document.getElementById('nav_toggle');
    var nav_show = document.getElementById('nav_show');
    nav_toggle.onclick = function(){
    	if(nav_show.style.display=='block'){
    		nav_show.style.display = 'none';
    	}else{
    		nav_show.style.display = 'block';    		
    	}
    }
    
}