$(document).ready(function() {
  createAnchors();
  $(document).on('click', '.filter-item', function(event) {
    setTimeout(createAnchors, 300);
  });
});

function createAnchors() {
	var notifcationsBoxes = $('.js-notifications-browser:not([marked])');
	var anchorList = ['All', 'PRs', 'Issues', 'Commits'];
	var typeList = [null, 'pull-request', 'issue', 'commit'];

	anchorList.forEach(function(item, index) {
		var anchor = document.createElement('a');

		anchor.textContent = item;
		anchor.className = (index === 0) ? 'nav-item nav-selected': 'nav-item';
		anchor.type = typeList.shift();
		$(anchor).click(function() {
      filterNotifications($(this));
    });

    anchorList[index] = anchor;
	});

  notifcationsBoxes.each(function() {
    $(this).attr('marked', 'marked');
    $(this).find('h3').append($(anchorList).clone(true));
  });
}

function filterNotifications($anchor) {
	var notifcations = $anchor.parent().next('ul.notifications');
	var type = $anchor.prop('type');

	if (type === 'null') {
		notifcations.find('li.list-group-item').show();
	} else {
    notifcations
      .find('li.js-notification:not(.' + type + '-notification)')
      .hide();
    notifcations
      .find('li.js-notification.' + type + '-notification')
      .show();
	}

  $anchor.parent().find('.nav-selected').removeClass('nav-selected');
  $anchor.addClass('nav-selected');
}
