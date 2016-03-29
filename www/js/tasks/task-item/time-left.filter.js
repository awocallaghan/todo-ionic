'use strict';

/**
  * TimeLeftFilter - convert a deadline date into a user friendly message
  * - Uses moment package
**/

angular.module('todo-app.tasks.task-item')
  .filter('timeLeft', TimeLeftFilter);

TimeLeftFilter.$inject = ['moment'];
function TimeLeftFilter (moment) {
  return function (deadline) {
    var deadline = moment(deadline);
    var now = moment();

    var diffSeconds = deadline.diff(now, 'seconds');
    if (diffSeconds <= 0) {
      return 'Deadline passed';
    }
    if (diffSeconds < 60) {
      return 'due in about ' + moment.duration(diffSeconds, 'seconds').humanize();
    }

    var diffMinutes = deadline.diff(now, 'minutes');
    if (diffMinutes < 60) {
      return 'due in about ' + moment.duration(diffMinutes, 'minutes').humanize();
    }

    var diffHours = deadline.diff(now, 'hours');
    if (diffHours < 24) {
      return 'due in about ' + moment.duration(diffHours, 'hours').humanize();
    }

    var diffDays = deadline.diff(now, 'days');
    if (diffDays < 31) {
      return 'due in about ' + moment.duration(diffDays, 'days').humanize();
    }

    var diffMonths = deadline.diff(now, 'months');
    return 'due in about ' + moment.duration(diffMonths, 'months').humanize();
  }
}
