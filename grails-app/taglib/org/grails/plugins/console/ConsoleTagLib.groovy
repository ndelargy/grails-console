package org.grails.plugins.console

import grails.converters.JSON
import grails.util.Holders
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
        } else {
            config.cssSrc.each {
                out << """<link rel='stylesheet' media="screen" href='${resource(file: it - 'web-app/', plugin: 'console')}' />"""
            }
        }
    }

    def layoutResources = { attrs ->
        boolean hasResourcesPlugin = PluginManagerHolder.pluginManager.hasGrailsPlugin('resources')

        if (hasResourcesPlugin) {
            out << r.layoutResources()
        } else {
            config.jsSrc.each {
                out << """<script type="text/javascript" src='${resource(file: it - 'web-app/', plugin: 'console')}' ></script>"""
            }
        }
    }

    Map getConfig() {
//        String json = Thread.currentThread().contextClassLoader.getResource('resources.json').openStream().text

        String json = Holders.applicationContext.parent.getResource('classpath:resources.json').file.text
//        URL res = Thread.currentThread().contextClassLoader.getResource('resources.json')
//        URLConnection resConn = res.openConnection()
//        resConn.useCaches = false
//        String json = resConn.inputStream.text
        JSON.parse(json) as Map
    }
}
