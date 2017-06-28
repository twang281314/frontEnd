$(function(){

	var $table = $('table#grid_columnchooser');
	var pagerId = '#grid_columnchooser_pager';

	$table.jqGrid(
			{
				recordtext: '',
				pgbuttons: false,
				pgtext: null,
				url:'js/jqgrid/data.json',
				datatype: "json",
				width: 1000,
				height: 250,
				pager: pagerId,
				gridComplete: function(){
					
					$.post('load-columns-position', null, function($response){
						
						if( $response ){
							
							var colModels = $table.jqGrid('getGridParam', 'colModel');
							var $responseCols = $response.columns_position;
							var columns = [];
							
							if( $responseCols.length > 0 ){
								
								columns[0] = 0;
								
								$.each($responseCols, function(icol, columnIndex){
									
									if( icol > 0 ){
										
										var pos = columnIndex.index;
										var field = columnIndex.field;
										
										$.each(colModels, function(i, colModel){
											
											var colModelIndex = colModel.index;
											
											if( field == colModelIndex ){
												
												columns[icol] = i;
												
												if( $.parseJSON( columnIndex.isHidden ) ){
													$grid.jqGrid('hideCol', [field]);
												}
											}
										});
									}
								});
								
								$table.jqGrid("remapColumns", columns, true);
								
							}else{
						    								    	
								$.each(colModels, function(i, colModel){
						    		
						    		columns.push({
					    				field: colModel.index,
					    				isHidden: colModel.hidden,
					    				pos: i
					    			});
						    	});
								
								$.post('save-columns-position',
						    			{
						    				cols: columns,
						    				field: 'columns_position' // the field name in the table
						    			}, null);
							}
						}
					});
				},
				colNames: ['State', 'Name', 'Country', 'City', 'E-mail', 'Phone', 'Zip-Code'],
				colModel:
					[
					 {
						 name : 'state',
						 index : 'state',
						 width : 40,
						 align : 'center'
					 },
					 { 
						 name:  'name',
						 index: 'name',
						 width: 40,
						 align: 'center'
					 },
					 {
						 name : 'country',
						 index : 'country',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'city',
						 index : 'city',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'email',
						 index : 'email',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'phone',
						 index : 'phone',
						 width : 40,
						 align : 'center'
					 }, {
						 name : 'zipcode',
						 index : 'zipcode',
						 width : 40,
						 align : 'center'
					 }
					 ]
			}).navGrid(pagerId,{ search: false, edit: false, add: false, del: false, view:false });

	$table.jqGrid('navButtonAdd',pagerId,{
		caption: "Select Columns",
		buttonicon: 'ui-icon-carat-2-n-s',
		title: "Reorder Columns",
		onClickButton : function (){
	    	$table.columnChooser(
	    			{
	    				done: function(perm){
	    					
	    					if( (typeof (perm) !== "undefined") ){
	    						
	    						$table.jqGrid("remapColumns", perm, true);
		    					
						    	var colModels = $table.jqGrid('getGridParam', 'colModel');									    	
						    	var columns = new Array();

						    	$.each(perm, function(i, columnIndex){
						    		
						    		columns.push({
					    				field: colModels[i].index,
					    				isHidden: colModels[i].hidden,
					    				pos: columnIndex
					    			});
								});
						    	
						    	$.post('save-columns-position',
						    			{
						    				cols: columns,
						    				field: 'columns_position' // the field name in the table
						    			}, null);
	    					}
	    				}
	    			});
	    }
	}); 

});