package org.grails.plugins.console

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.PluginManagerHolder

/**
 * @author <a href='mailto:burt@burtbeckwith.com'>Burt Beckwith</a>
 */
class ConsoleTagLib {

	static namespace = 'con'

	def resources = { attrs ->
		boolean hasResourcesPlugin = PluginManagerHolder.pluginManager.hasGrailsPlugin('resources')

		if (hasResourcesPlugin) {
			r.require(module: 'console')
			out << r.layoutResources()
		}
		else {
            String json = getClass().getResourceAsStream('resources.json').text
            Map config = JSON.parse(json)
// TODO test this
            config.cssSrc.each {
                out << """<link rel='stylesheet' media="screen" href='${resource(file: it, plugin: 'console')}' />"""
            }
		}
	}

	def layoutResources = { attrs ->
		boolean hasResourcesPlugin = PluginManagerHolder.pluginManager.hasGrailsPlugin('resources')

		if (hasResourcesPlugin) {
			out << r.layoutResources()
		}
		else {
            String json = getClass().getResourceAsStream('resources.json').text
            Map config = JSON.parse(json)
// TODO test this
            config.jsSrc.each {
                out << g.javascript(src: it[0] + '/' + it[1], plugin: 'console')
            }
		}
	}
}
