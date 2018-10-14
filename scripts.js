const hiddenClass = "is-hidden";

if ($(window).width() < 800) {
   $('table').addClass('responsive-table');
   initColumns();
   nextColumn();
   prevColumn();
}

function initColumns() {
  $('tr').each((i, row) => {
			let $row = $(row);
			//Add .fixed-column to first child in row
			$row.children().first().addClass('fixed-column');

			//Hide all cells except for fixed column and second column
			$row.children().not('.fixed-column').not(':nth-child(2)').addClass(hiddenClass);

			//Add class with col + number to every cell in row
			$row.children().slice(1).each((num, cell) => {
				$(cell).addClass('col' + num);
			});
		});

    //Add prev and next arrows to head of all columns except fixed column
    $('th').not('.fixed-column').append('<span class="prev-col"></span><span class="next-col"></span>');

    //Hide prev arrow if first column
    $('.col0').children('.prev-col').hide();

    //Hide next arrow if last column
    $('tr th:last-child').children('.next-col').hide();
}

function nextColumn() {
    $('.next-col').on('click', function(){
      let $currentColumn = $(this).parent();
  		let $table = $currentColumn.parents('table').eq(0);
  		let $currentColClass = $currentColumn.attr('class');

  		//Hide this column and all with the same class
  		$currentColumn.addClass(hiddenClass);
  		$table.find('.' + $currentColClass).addClass(hiddenClass);

  		//Show next column and all with the same class
  		$currentColumn.next().removeClass(hiddenClass);
  		$table.find('.' + $currentColClass).next().removeClass(hiddenClass);
    });
}

function prevColumn() {
  $('.prev-col').on('click', function(){
    let $currentColumn = $(this).parent();
		let $table = $currentColumn.parents('table').eq(0);
		let $currentColClass = $currentColumn.attr('class');

		//Hide this column and all with the same class
		$currentColumn.addClass(this.hiddenClass);
		$table.find('.' + $currentColClass).addClass(hiddenClass);

		//Show next column and all with the same class
		$currentColumn.prev().removeClass(hiddenClass);
		$table.find('.' + $currentColClass).prev().removeClass(hiddenClass);
  });
}
