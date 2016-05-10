/**
 * INSPINIA - Responsive Admin Theme
 *
 */
function config($translateProvider) {

    $translateProvider
    .translations('en', {
	  
	  // Define all menu elements
	  Dashboard: 'Dashboard',
	  Mailbox: 'Mailbox',
	  Tickets: 'Tickets',
	  Employees: 'Employees',
	  Clients: 'Clients',
	  Teams: 'Teams',
	  Projects: 'Projects',
	  Calendar: 'Calendar',
	  Files: 'Files',
	  Settings: 'Settings',
	  Delegates: 'Delegates',
           

            // Define some custom text
            WELCOME: 'Welcome Amelia',
            MESSAGEINFO: 'You have 42 messages and 6 notifications.',
            SEARCH: 'Search for something...',
            DEMO: 'Internationalization (sometimes shortened to \"I18N , meaning \"I - eighteen letters -N\") is the process of planning and implementing products and services so that they can easily be adapted to specific local languages and cultures, a process called localization . The internationalization process is sometimes called translation or localization enablement .'

        })
        .translations('no', {

            // Define all menu elements
            DASHBOARD: 'Instrumentpanel',
            MAILBOX: 'E-Post',
            TICKETS: 'Billetter',
            EMPLOYEES: 'Ansattes',
            CLIENTS: 'Skjemaer',
            TEAMS: 'Lag',
            PROJECTS: 'Prosjekter',
            CALENDAR: 'Kalender',
            DOCS: 'Dokumenter',
			SETTINGS: 'Innstillinger',
			DELEGATES: 'Delegates',

            // Define some custom text
            WELCOME: 'Welcome Amelia',
            MESSAGEINFO: 'You have 42 messages and 6 notifications.',
            SEARCH: 'Search for something...',
            DEMO: 'Internationalization (sometimes shortened to \"I18N , meaning \"I - eighteen letters -N\") is the process of planning and implementing products and services so that they can easily be adapted to specific local languages and cultures, a process called localization . The internationalization process is sometimes called translation or localization enablement .'

        })

    $translateProvider.preferredLanguage('en');

}

angular
    .module('inspinia')
    .config(config)
