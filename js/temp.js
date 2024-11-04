'use strict';
/*  */
/*
이하 전체 테스트 스크립트입니다.
개발에 맞게 새로 작성해서 적용 부탁드립니다.
*/

var pos;
window.addEventListener('scroll', function(){
    pos = window.scrollY;
	goTop.check(pos); //  위로가기
    header.header_set(pos); // 그림자 넣기
});

var $window = $(window);

function mainPage(){
	var fullPage_layout;
	fullPage_layout = {
		action : function(){
			$('.guide_fullpage').fullpage({
				// menu: '#menu',
				lockAnchors: false,
				// anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
				// navigation: true,
				sectionsColor: ['#5f8fc0', '#fff', '#1a1f23', '#fff', '#242424'],
				controlArrows:true,
				css3: true,
				slidesNavigation: false,
				slidesNavPosition: 'bottom',
				loopHorizontal : false,
				scrollingSpeed: 500,
				autoScrolling: true,
				dragAndMove: true,
				cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},
				verticalCentered: true,

				// 이동 시작시
				onLeave: function(origin, destination, direction){
					console.log("destination : " + destination)
					if(destination > 0 || destination == 3 || destination >= 5) {
						$("body > header").addClass("active")
					} else {
						$("body > header").removeClass("active")
					}

					if(destination == 1 || destination == 4) {
						$("#fp-nav").addClass("active");
					} else {
						$("#fp-nav").removeClass("active");
					}
					
				}
			});	
		},
		reset : function(){

		}
	}

	$window.on('load', function(){
		if($($window).width() >= 768){
			$("header").removeClass("mobile")
			fullPage_layout.action();
		} else {
			$("header").addClass("mobile")
		}
	})

	$window.on('resize', function(){
		if($($window).width() >= 768){
			fullPage_layout.action();
		} else {
			$.fn.fullpage.destroy('all');
		}
	})
}



/* 헤더 그림자 넣기 */
var header;
header = {
	item : document.querySelector('header'),
	header_set : function(pos){
		if(header.item == null) {
			return;
		}
		if(pos > header.item.offsetHeight) {
			header.item.classList.add('active')
		} else {
			header.item.classList.remove('active')
		}
		// (pos > header.item.offsetHeight * 1.5) ? header.item.classList.add('active') : header.item.classList.remove('active');
	}
}



/* 공지사항 보기 */
$(".item .board_tit").on("click", function(){
	$(this).parent(".item").toggleClass("active")
})




/* 위로가기 버튼 보이기 (버튼 없을때 오류남.) */
var goTop;
goTop = {
	btn : document.querySelector(".toTop"),
	header_wrap : document.querySelector('header'),
	check : function(pos){
		if(goTop.btn == null) {
			return;
		}
		if(pos > goTop.header_wrap.offsetHeight) {
			goTop.btn.classList.add("active")
		} else {
			goTop.btn.classList.remove("active")
		}
		// (pos > window.innerHeight) ? goTop.btn.classList.add("active") : goTop.btn.classList.remove("active");
	},
	action : function(pos){
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}
if(goTop.btn != null) {
	goTop.btn.addEventListener("click", function(){
		goTop.action();
	})
}


/* 모바일에서 메뉴 보기 */
$(".btn_menu_toggle button").on("click", function(){
	$(".nav").toggleClass("active");
})