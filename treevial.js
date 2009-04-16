/* SVN FILE: $Id
/*
* jQuery.treevial : treeview from JSON data plugin
*
*  $Author
*  $Copyright
*  $Revision
*  $Date
*  $LastChangedBy
*  $LastChangedDate
*/

(function($) {

	$.fn.jqtreevial = function(data) {
		// options = $.extend({}, $.fn.jqtreevial.defaults, options);
		$(this).html( $.fn.jqtreevial.create.call(this, data) );
	};

	$.extend($.fn.jqtreevial, {
		create: function(data) {
			
			if (!data || !data.elem)
				return;
			
			var uid = 'treevial'+Math.floor( Math.random()*1000000 );
			var root = $('<ul/>').attr('id', uid).addClass('treevial').appendTo(this);
			$(this).data('treevial',{uid:uid, root:root[0]});
			
			//insert each node
			$.fn.jqtreevial.insert.call(this, data.elem);
			
			// set behaviours
			root.click(function(e){
				if ( $(e.target).is('li:has(ul)') )
					$(e.target)
						.toggleClass('treevial-open').toggleClass('treevial-closed')
						.children('ul').stop(true,true).animate({ height: 'toggle', opacity: 'toggle' });
			});
			
		},
		insert: function( obj ){
			
			// aceitar objeto único
			if (obj.id_parent) obj = [obj];
			
			var data = $(this).data('treevial'),
			uid = data.uid,
			root = $(data.root);
		
			$.each(obj, function(){
				var node = $('<li/>').attr('id', uid+this.id).addClass($.fn.jqtreevial.defaults.itemClass).text(this.string),
					  parent = this.id_parent;
				
				if (parent == 0) {
					node.appendTo( root );
				} else {
					var parentLI = root.find('#'+uid+parent),
						  parentUL = parentLI.children('ul')[0] || $('<ul/>').appendTo( parentLI )[0];
					node.appendTo( parentUL );
				};
			});
			
			root.find('li:has(ul)').addClass('treevial-open').css('cursor', 'pointer');
			
		},
		reInsert: function( obj ){
			
			// aceitar objeto único
			if (obj.id_parent) obj = [obj];
			
			console.log(this);
			//var data = $(this).data('treevial');
			//uid = data.uid,
			//root = $(data.root);
		
			$.each(obj, function(){
				var node = $('<li/>').attr('id', uid+this.id).addClass($.fn.jqtreevial.defaults.itemClass).text(this.string),
					  parent = this.id_parent;
				
				if (parent == 0) {
					node.appendTo( root );
				} else {
					var parentLI = root.find('#'+uid+parent),
						  parentUL = parentLI.children('ul')[0] || $('<ul/>').appendTo( parentLI )[0];
					node.appendTo( parentUL );
				};
			});
			
			root.find('li:has(ul)').addClass('treevial-open').css('cursor', 'pointer');
			
		},
		remove: function( obj ){
			$('#'+this.id+ obj.id).remove();
		},
		defaults: {
			itemClass: ''
		}
	});

})(jQuery);