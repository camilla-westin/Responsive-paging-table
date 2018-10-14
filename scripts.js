const hiddenClass = 'is-hidden';

if ($(window).width() < 800) {
   $('table').addClass('responsive-table');
   initColumns();
   nextColumn();
   prevColumn();
   indicator();
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

      let $activeElement = $table.find(".is-active");

  		$activeElement.next().addClass("is-active");
  		$activeElement.removeClass("is-active");
  		$table.find(".is-active").prevAll().addClass('white-bg');
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

    var $activeElement = $table.find(".is-active");

		$activeElement.prev().addClass("is-active");
		$activeElement.removeClass("is-active");
		$table.find(".is-active").prevAll().addClass('white-bg');
		$table.find(".is-active").nextAll().removeClass('white-bg');
  });
}

function indicator() {
  //Add container for indicator
		$('th').not('.fixed-column').append('<div class="indicator"></div>');
		//Count no. of columns
		var tableCols = 0;
		$('.responsive-table tbody tr').each(function () {
			var currCount = 0;
			$(this).children('td').each(function () {
				currCount++;
				var colSpan = $(this).attr('colspan');
				tableCols = currCount;

			});
		});

		//Remove 1 column since first should not count
		var numOfCols = tableCols - 1;

		//Add dots according to no. of columns
		for (var i = 0; i < numOfCols; i++) {

			$('.indicator').append('<span class="dot"></span>');
		}

		//Show first dot as active
		$('.dot:first-child').addClass('is-active');
}
