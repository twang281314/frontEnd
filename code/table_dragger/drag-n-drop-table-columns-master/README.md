Drag & Drop Table Columns
=========================

Demo page http://alexshnur.github.io/drag-n-drop-table-columns/

Work in IE9+, Google Chrome, Mozzila Firefox

	<div class="table-responsive container">
		<table class="table table-bordered">
			<thead>
				<tr class="dnd-moved">
					<th>Column #1</th>
					<th>Column #2</th>
					<th>Column #3</th>
					<th>Column #4</th>
					<th>Column #5</th>
				</tr>
			</thead>
			<tbody>
				<tr class="dnd-moved">
					<td>Row #1-1</td>
					<td>Row #1-2</td>
					<td>Row #1-3</td>
					<td>Row #1-4</td>
					<td>Row #1-5</td>
				</tr>
				<tr class="dnd-moved">
					<td>Row #2-1</td>
					<td>Row #2-2</td>
					<td>Row #2-3</td>
					<td>Row #2-4</td>
					<td>Row #2-5</td>
				</tr>
				<tr class="dnd-moved">
					<td>Row #3-1</td>
					<td>Row #3-2</td>
					<td>Row #3-3</td>
					<td>Row #3-4</td>
					<td>Row #3-5</td>
				</tr>
			</tbody>
		</table>
	</div>
	<script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>
	<script src="js/dragndrop.table.columns.js" type="text/javascript"></script>
	<script>
		$('.table').dragableColumns();
	</script>
