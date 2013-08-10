modules = {

	'console' {

		resource url: [dir: 'js/codemirror-3.15/lib', file: 'codemirror.css', plugin: 'console']
		resource url: [dir: 'css', file: 'jquery.layout.css', plugin: 'console']
		resource url: [dir: 'css', file: 'grails-console.css', plugin: 'console']

		for (name in [
            'jquery-1.7.1.min',
            'jquery-ui-1.8.17.custom.min',
		    'jquery.layout',
            'jquery.Storage',
            'jquery.hotkeys',
		    'codemirror-3.15/lib/codemirror',
            'codemirror-3.15/mode/groovy/groovy',
		    'grails-console/console'
        ]) {
			resource url: [dir: 'js', file: name + '.js', plugin: 'console']
		}
	}
}
