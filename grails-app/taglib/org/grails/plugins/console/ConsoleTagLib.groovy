package org.grails.plugins.console

import grails.converters.JSON
import grails.util.Holders
import org.codehaus.groovy.grails.plugins.GrailsPluginUtils

/**
 * @author <a href='mailto:burt@burtbeckwith.com'>Burt Beckwith</a>
 */
class ConsoleTagLib {

    static namespace = 'con'

    boolean debugEnabled = true // TODO

    def css = { attrs ->
        config.css.each {
            out << "<link rel='stylesheet' media='screen' href='${resource(file: it - 'web-app/', plugin: 'console')}' />"
        }
    }

    def js = { attrs ->
        config.js.each {
            out << "<script type='text/javascript' src='${resource(file: it - 'web-app/', plugin: 'console')}' ></script>"
        }
    }

    Map getConfig() {
        String jsonText
        if (debugEnabled) {
            File consolePluginDir = GrailsPluginUtils.getPluginDirForName('console').file
            jsonText = new File(consolePluginDir, 'grails-app/conf/resources.json').text
        } else {
            jsonText = Holders.applicationContext.parent.getResource('classpath:resources.json').file.text
        }
        Map json = JSON.parse(jsonText) as Map
        debugEnabled ? json.debug : json.release
    }
}
