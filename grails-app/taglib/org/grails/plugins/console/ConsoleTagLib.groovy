package org.grails.plugins.console

import org.codehaus.groovy.grails.plugins.PluginManagerHolder

/**
 * @author <a href='mailto:burt@burtbeckwith.com'>Burt Beckwith</a>
 */
class ConsoleTagLib {

	static namespace = 'con'

    static List CSS = [
        ['lib/bootstrap/css', 'bootstrap.min.css'],
        ['lib/bootstrap/css', 'bootstrap-theme.min.css'],
        ['lib/font-awesome/css', 'font-awesome.min.css'],
        ['lib/codemirror-3.15/lib', 'codemirror.css'],
        ['css', 'jquery.layout.css'],
        ['css', 'grails-console.css']
    ]

    static List JS = [
        ['js', 'jquery-1.7.1.min.js'],
        ['js', 'jquery-ui-1.8.17.custom.min.js'],
        ['lib/bootstrap/js', 'bootstrap.min.js'],
        ['js', 'underscore-min.js'],
        ['js', 'backbone-min.js'],
        ['js', 'backbone-localstorage.js'],
        ['js', 'jquery.layout-latest.min.js'],
        ['js', 'jquery.hotkeys.js'],
        ['lib/codemirror-3.15/lib', 'codemirror.js'],
        ['lib/codemirror-3.15/mode/groovy', 'groovy.js'],
        ['js/gconsole', 'console.js'],
        ['js/gconsole', 'router.js'],
        ['js/gconsole', 'settings-model.js'],
        ['js/gconsole', 'settings-view.js']
    ]

	def resources = { attrs ->
		boolean hasResourcesPlugin = PluginManagerHolder.pluginManager.hasGrailsPlugin('resources')

		if (hasResourcesPlugin) {
			r.require(module: 'console')
			out << r.layoutResources()
		}
		else {
            CSS.each {
                out << """<link rel='stylesheet' media="screen" href='${resource(dir: it[0], file: it[1], plugin: 'console')}' />"""
            }
		}
	}

	def layoutResources = { attrs ->
		boolean hasResourcesPlugin = PluginManagerHolder.pluginManager.hasGrailsPlugin('resources')

		if (hasResourcesPlugin) {
			out << r.layoutResources()
		}
		else {
            JS.each {
                out << g.javascript(src: it[0] + '/' + it[1], plugin: 'console')
            }
		}
	}
}
