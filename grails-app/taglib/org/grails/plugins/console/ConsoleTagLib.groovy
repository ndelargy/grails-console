package org.grails.plugins.console

import org.codehaus.groovy.grails.plugins.PluginManagerHolder

/**
 * @author <a href='mailto:burt@burtbeckwith.com'>Burt Beckwith</a>
 */
class ConsoleTagLib {

	static namespace = 'con'

    static List<List> CSS = [
        ['css', 'bootstrap.min.css'],
        ['font-awesome/css', 'font-awesome.min.css'],
        ['js/codemirror-3.15/lib', 'codemirror.css'],
        ['css', 'jquery.layout.css'],
        ['css', 'grails-console.css']
    ]

    static List<List> JS = [
        ['js', 'jquery-1.7.1.min.js'],
        ['js', 'jquery-ui-1.8.17.custom.min.js'],
        ['js', 'bootstrap.min.js'],
        ['js', 'underscore-min.js'],
        ['js', 'backbone-min.js'],
        ['js', 'jquery.layout.js'],
        ['js', 'jquery.Storage.js'],
        ['js', 'jquery.hotkeys.js'],
        ['js', 'codemirror-3.15/lib/codemirror.js'],
        ['js', 'codemirror-3.15/mode/groovy/groovy.js'],
        ['js', 'grails-console/console.js']
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
