/**
 * apt FullPageJS
 * 
 * This plugin works with Siteorigin pagbuilder
 * To setup pagebuilder in wordpress follow this step
 * 1. Add new page template and wrap the_content() with div#fullpage
 * 2. Save the page template named "page_fullpage.php" in root template folder
 * 3. Create rows and insert widgets to the rows
 * 4. Add Background Collor or Background Image to each rows. Background applied to each rows will be moved to each Sections(.panel-grid)
 * 
 * Animation.CSS
 * By default, we have nothing to do with oridinary elements, all elements will animate automatically, but if you want to override some
 * please take a look at "addAnimationCssToElements" function for more details
 * 
 */
(function($) {
	
	$(document).ready(function(){
		
		if($("body").hasClass("page-template-page_fullpage")) {
			console.log("fullpage");
			buildFullPage();
		}

		// Rebuild on window resize
		var resizeTimeout;
		$(window).resize(function(){
			$("#ajax-loading-screen").fadeIn();
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function() {
				$.fn.fullpage.destroy('all');
				buildFullPage();
			}, 500);
		});

		// Build FullPage
		function buildFullPage() {
			// Show loading
			$("#ajax-loading-screen").fadeIn();
			// Add Animate.css to siteorigin elements
			addAnimationCssToElements();
			// Add Trigger to allow other codes inject to this line
			$("body").trigger("apt-before-buildFullPage");
			// Add class "section" to Rows
			var $sections = $("#fullpage").find(".panel-grid");
			$sections.addClass("section").css({"margin-left":"0px", "margin-right":"0px", "background-position":"center", "background-size":"cover", "background-color":"#fff"});
			// section ids
			var sectionIds = [];
			$sections.each(function(index){ sectionIds.push("section-" + index) });
			// Set backgorund color or background image for sections
			$sections.each(function(index, element){
				var $panelRowStyle = $(element).find(".panel-row-style");
				// Section background color or Image defined by siteorigin
				if($panelRowStyle.css("background-color") && $panelRowStyle.css("background-color") !== "none"){
					$(element).css({"background-color": $panelRowStyle.css("background-color")});
					$panelRowStyle.css({"background-color":"none"});
				}
				if($panelRowStyle.css("background-image") && $panelRowStyle.css("background-image") !== "none"){
					$(element).css({"background-image": $panelRowStyle.css("background-image")});
					$panelRowStyle.css({"background-image":"none"});
				}
			});
			// check if user load section at the first time
			var firstLoad = true;
			// Initialize FullPageJS
			console.log(sectionIds);
			$("#fullpage").css({"background-color":"#000"}).fullpage({
				anchors: sectionIds,
				navigation: true,
				navigationPosition: 'right',
				scrollOverflow: true,
				scrollingSpeed: 1000,
				easingCss3: "ease-out",
				afterLoad: function(anchorLink, index) {
					// Fix unscrollable error
					console.log("afterLoad : ", index, window.location.hash);
					if((index === 1) && (window.location.hash == "#section-0" || window.location.hash == "") && firstLoad) {
						console.log("first load on first section");
						$.fn.fullpage.moveTo(0, 0);
						$.fn.fullpage.moveTo(1, 0);
					}
					firstLoad = false;
				},
				onLeave: function(index, nextIndex, direction) {
					// add animation after leave a section
					console.log("onLeave : ", index, window.location.hash);
					if(!((index === 1) && (window.location.hash == "#section-0" || window.location.hash == "") && firstLoad)) {
						var jQueryIndex = index - 1;
						var translateY = (direction === "down") ? "130%" : "-130%";
						$sections.eq(jQueryIndex).css({ "z-index": -1 }).transition({
							scale: 0.7,
							y: translateY,
							opacity: 0,
						}, 1000, "ease");
						setTimeout(function(){
							$sections.eq(jQueryIndex).css({ transform: "none", "z-index": 0, opacity: 1 });
						}, 1000);
					}
					// Trigger intended to be used to hide Loading
					$("body").trigger("apt-after-buildFullPage-load");
					// Hide Loading
					$("#ajax-loading-screen").fadeOut();
					//  animation.css afterLoad
					var $nextSection = $sections.eq(nextIndex - 1);
					$nextSection.find(".effect").each(function(i, element){
						$(element).removeClass($(element).data("animationClass")).addClass($(element).data("animationClass"));
					});
					// Remove animation.css onLeave
					var $currentSection = $(".panel-grid.section").eq(index - 1);
					$currentSection.find(".effect").each(function(i, element){
						$(element).removeClass($(element).data("animationClass"));
					});
				}
			});
		}
		function addAnimationCssToElements() {
			$("#fullpage").find(".panel-grid").each(function(index, section){
				var delay4ThMS = 0, delay3RdMS = 0;
				function addDelay(element) {
					var cssClass = "animated";
					if($(element).is("img") || $(element).is(".sow-icon-container")) {
						cssClass += " zoomIn";
					} else {
						cssClass += " fadeInUp";
					}
					$(element).data("animationClass", cssClass + " delay-" + delay4ThMS.toString() + delay3RdMS.toString() + "00");
					delay3RdMS += 3;
					if(delay3RdMS > 9) { delay3RdMS = 0; delay4ThMS += 1; }
				}
				$(section).find("h1").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find(".sow-icon-container").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find("h2").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find("h3").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find("h4").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find("h5").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find("p").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find("img").addClass("effect").each(function(index, element){
					addDelay(element);
				});
				$(section).find(".so-widget-sow-button").addClass("effect").each(function(index, element){
					addDelay(element);
				});
			});
		}
	});
})(jQuery);