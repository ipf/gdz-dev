var startUrl = 'http://localhost:8009/typo3/sysext/install/Start/Install.php';

var page = require('webpage').create();
var system = require('system');

page.open(startUrl);

page.onLoadFinished = function(status) {
	var jqueryIsLoaded = page.evaluate(function() {
		return ( typeof $ !== 'undefined' );
	});
	if ( ! jqueryIsLoaded ) {
		console.log('jQuery not loaded, exiting.');
		phantom.exit();
	}

	var title = page.evaluate(function() {
		return $('h3:first').text();
	});
	console.log(title);

	switch ( title ) {
		case 'System environment check':
			page.evaluate(function() {
				$('form').submit();
			});
			break;
		case 'Database connection':
			page.evaluate(function() {
				$('#t3-install-step-username').val('dev');
				$('#t3-install-step-password').val('dev');
				$('#t3-install-step-host').val('mysql');
				$('form').submit();
			});
			break;
		case 'Select database':
			var databaseIsEmpty = page.evaluate(function() {
				return ( ! $('#t3-install-step-database-existing').find('option[value=database]').prop('disabled') );
			});
			if ( ! databaseIsEmpty ) {
				console.log('Database is not empty, exiting.');
				phantom.exit();
			}
			page.evaluate(function() {
				$('#t3-install-step-database-existing').val('database');
				$('form').submit();
			});
			break;
		case 'Create user and import base data':
			var adminPassword;
			while ( ! adminPassword || adminPassword.length < 8 ) {
				system.stdout.write('Admin password (8 characters minimum): ');
				adminPassword = system.stdin.readLine();
			}
			page.evaluate(function(adminPassword) {
				$('#username').val('dev');
				$('#password').val(adminPassword);
				$('#sitename').val('GDZ Dev');
				$('form:first').submit();
			}, adminPassword);
			break;
		case 'Installation done!':
			page.evaluate(function() {
				$('form').submit();
			});
			phantom.exit();
			break;
		default:
			console.log('Encountered an unknown page, exiting.');
			phantom.exit();
	}
};
