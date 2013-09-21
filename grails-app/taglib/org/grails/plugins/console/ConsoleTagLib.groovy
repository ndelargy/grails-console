package org.grails.plugins.console

import org.codehaus.groovy.grails.plugins.PluginManagerHolder

/**
 * @author <a href='mailto:burt@burtbeckwith.com'>Burt Beckwith</a>
 */
class ConsoleTagLib {

	static namespace = 'con'

    static List CSS = [
        ['vendor/bootstrap/css', 'bootstrap.min.css'],
        ['vendor/bootstrap/css', 'bootstrap-theme.min.css'],
        ['vendor/font-awesome/css', 'font-awesome.min.css'],
        ['vendor/codemirror-3.15/lib', 'codemirror.css'],
        ['vendor/jquery-layout/css', 'jquery.layout.css'],
        ['src/styles', 'grails-console.css']
    ]

    static List JS = [
        ['vendor/js/libs', 'jquery-1.7.1.min.js'],
        ['vendor/js/libs', 'jquery-ui-1.8.17.custom.min.js'],
        ['vendor/bootstrap/js', 'bootstrap.min.js'],
        ['vendor/js/libs', 'underscore-min.js'],
        ['vendor/js/libs', 'backbone-min.js'],
        ['vendor/js/libs', 'handlebars.runtime.js'],
        ['vendor/jquery-layout/js', 'jquery.layout-latest.min.js'],
        ['vendor/js/plugins', 'jquery.hotkeys.js'],
        ['vendor/codemirror-3.15/lib', 'codemirror.js'],
        ['vendor/codemirror-3.15/mode/groovy', 'groovy.js'],
        ['dist/debug', 'jst.js'],
        ['src/app', 'app.js'],
        ['src/app', 'router.js'],
        ['src/app', 'settings-model.js'],
        ['src/app', 'settings-view.js'],
        ['src/app', 'result-model.js'],
        ['src/app', 'result-collection.js'],
        ['src/app', 'result-view.js'],
        ['src/app', 'result-collection-view.js'],
        ['src/app', 'editor-view.js'],
        ['src/app', 'file-model.js'],
        ['src/app', 'file-collection.js'],
        ['src/app', 'file-collection-view.js'],
        ['src/app', 'local-file-store.js']
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
