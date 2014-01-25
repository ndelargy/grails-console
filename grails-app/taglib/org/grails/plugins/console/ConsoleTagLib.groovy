package org.grails.plugins.console

import grails.converters.JSON
import grails.util.Holders
import grails.util.Metadata
import org.codehaus.groovy.grails.plugins.GrailsPluginUtils
import org.springframework.web.context.request.RequestContextHolder

/**
 * @author <a href='mailto:burt@burtbeckwith.com'>Burt Beckwith</a>
 */
class ConsoleTagLib {

    static namespace = 'con'

    Map resourceMap

    def css = { attrs ->
        config.css.each {
            out << "<link rel='stylesheet' media='screen' href='${resource(file: it - 'web-app/', plugin: 'console')}' />\n"
        }
    }

    def js = { attrs ->
        config.js.each {
            out << "<script type='text/javascript' src='${resource(file: it - 'web-app/', plugin: 'console')}' ></script>\n"
        }
    }

    Map getConfig() {
        if (!resourceMap) {
            resourceMap = getConfAsResource()
        }
        if (reload && !Metadata.getCurrent().isWarDeployed()) {
            resourceMap = getConfAsFile()
        }
        debug ? resourceMap.debug : resourceMap.release
    }

    boolean getReload() {
        RequestContextHolder.currentRequestAttributes()?.params?.reload == 'true'
    }

    boolean getDebug() {
        RequestContextHolder.currentRequestAttributes()?.params?.debug == 'true'
    }

    Map getConfAsFile() {
        File consolePluginDir = GrailsPluginUtils.getPluginDirForName('console').file
        String jsonText = new File(consolePluginDir, 'grails-app/conf/resources.json').text
        JSON.parse jsonText
    }

    Map getConfAsResource() {
        String jsonText = Holders.applicationContext.parent.getResource('classpath:resources.json').file.text
        JSON.parse jsonText
    }
}
