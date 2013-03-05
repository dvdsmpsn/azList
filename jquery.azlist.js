/**
 * azList - Easy list sorting with indexed jump-to anchors
 * @version 1.0
 *
 * Copyright (c) 2010 David Simpson 
 * http://davidimpson.me/labs/jquery/azlist/
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html 
 *
 * Usage: $('ul#myList').azList();
 * 
 * <ul id="myList">
 *   <li><a href="http://google.com/">Google</a></li>
 *   <li><a href="http://yahoo.com/">Yahoo</a></li>
 *   <li><a href="http://hotbot.com/">Hotbot</a></li>
 *   <li><a href="http://altavista.com">Alta Vista</a></li>
 *   <li><a href="http://bing.com">Bing</a></li>
 *   <li><a href="http://search.com/">Search</a></li>
 *   <li><a href="http://alltheweb.com/">All The Web</a></li>
 *   <li><a href="http://www.blackle.com/">Blackle</a></li>
 *   <li><a href="http://goosh.org/">Goosh</a></li>
 *   <li><a href="http://123-reg.co.uk/">123-reg</a></li>
 * </ul>
 */
(function($) {
	$.fn.azList = function ()
	{
		me = this; // remember the top level object
		
		if ($(me).prev().is('ul.azIndex')) { return; } 
				
		// Sort the list items
		var listItems = $(me).children('li').get();
		listItems.sort(function(x,y) {
			var compareX = $(x).text().toUpperCase();
			var compareY = $(y).text().toUpperCase();
			return (compareX < compareY) ? -1 : (compareX > compareY) ? 1 : 0;
		});
		
		// Write the list items back to the DOM
		$.each(listItems, function(index, item) { $(me).append(item); });
	
	  	var indexList = '';
	  	var previousInitial = '';
	  	
		$.each(listItems, function(){
	  		var thisInitial = $(this).text().substring(0,1).toUpperCase();
	  		
	  		if (thisInitial != previousInitial)
	  		{
	  			var listId = 'azList-'+thisInitial;
	  			
	  			// Build the azIndex list
	  			indexList = indexList + '<li><a href="#'+listId+'">'+thisInitial+'</a></li>';	
	  			
	  			// Add the azInitial target
	  			$(this).before('<li id="'+listId+'" class="azListInitial">'+thisInitial+'</li>');
	  		}
	  		previousInitial = thisInitial;
		});

		// Write the azIndex list back to the DOM
		$(me).before('<ul class="azListIndex">'+indexList+'</ul>');
		
		// Get the list items again after inserting various new ones
		listItems = $(me).children('li').get();
	
		// Write the list items back to the DOM
		$.each(listItems, function(index, item) { $(me).append(item); });
	}
})(jQuery);

